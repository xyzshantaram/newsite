"use strict";
const MOUSE_RADIUS = 60;
document.addEventListener("DOMContentLoaded", init);

function randInt(start, stop) {
    if (start > stop) {
        [start, stop] = [stop, start];
    }
    return start + Math.floor(Math.random() * (stop - start));
}

function distance(one, two) {
    return Math.sqrt(
        Math.pow(two.x - one.x, 2) +
        Math.pow(two.y - one.y, 2)
    );
}

function clamp(min, num, max) {
    if (num < min) {
        return min;
    }

    if (num > max) {
        return max;
    }

    return num;
}

const pairs = (arr) => arr.map((v, i) => arr.slice(i + 1).map(w => [v, w])).flat();

function init() {
    if (getCSSCustomProp('--particles-off')) {
        return;
    }

    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    window.bubbles = new Bubbles(canvas, ctx);

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        window.bubbles.draw();
        window.requestAnimationFrame(draw);
    }

    window.requestAnimationFrame(draw);

    window.addEventListener('resize', function() {
        window.bubbles = new Bubbles(canvas, ctx, window.bubbles.entities);
    })
}

const getCSSCustomProp = (propKey, element = document.documentElement, castAs = 'string') => {
    let response = getComputedStyle(element).getPropertyValue(propKey);
    // Tidy up the string if there's something to work with
    if (response.length) {
        response = response.replace(/\'|"/g, '').trim();
    } else {
        return null;
    }
    // Convert the response into a whatever type we wanted
    switch (castAs) {
        case 'number':
        case 'int':
            return parseInt(response, 10);
        case 'float':
            return parseFloat(response, 10);
        case 'boolean':
        case 'bool':
            return response === 'true' || response === '1';
    }
    // Return the string response by default
    return response;
};

class Bubble {
    constructor(parent, color, alpha) {
        this.parent = parent;
        const radiusUpperBound = getCSSCustomProp('--particle-radius-max', document.documentElement, 'int');
        const radiusLowerBound = getCSSCustomProp('--particle-radius-min', document.documentElement, 'int');
        this.radius = randInt(radiusLowerBound, radiusUpperBound);

        this.pos = {
            x: randInt(0 + this.radius, window.innerWidth - this.radius),
            y: randInt(0 + this.radius, window.innerHeight - this.radius)
        }

        const randSign = () => Math.random() >= 50 ? 1 : -1;

        this.vel = {
            x: randSign() * Math.random() * 0.5,
            y: randSign() * Math.random() * 0.5,
        }

        this.color = color;
        this.alpha = alpha;
    }

    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        if (this.pos.x - this.radius * 2 > window.bubbles.width || this.pos.x - this.radius * 2 < 0) {
            this.vel.x *= -1;
        }

        if (this.pos.y - this.radius * 2 > window.bubbles.height || this.pos.y - this.radius < 0) {
            this.vel.y *= -1;
        }

        if (this.isColliding({
                pos: window.bubblesMouse.pos,
                radius: MOUSE_RADIUS
            })) {
            let dx = this.pos.x - window.bubblesMouse.pos.x;
            let dy = this.pos.y - window.bubblesMouse.pos.y;

            let dist = Math.sqrt(dx * dx + dy * dy) || 1;

            // unit vector
            let ux = dx / dist;
            let uy = dy / dist;

            let cr = this.radius + MOUSE_RADIUS;

            this.pos.x = window.bubblesMouse.pos.x + cr * ux;
            this.pos.y = window.bubblesMouse.pos.y + cr * uy;

            this.vel.x *= -1;
            this.vel.y *= -1;

            this.pos.x = clamp(this.radius, this.pos.x, parent.width - this.radius);
            this.pos.y = clamp(this.radius, this.pos.y, parent.height - this.radius);
        }
    }

    draw(ctx) {
        this.update();
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
        ctx.globalAlpha = this.alpha;
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    isColliding(that) {
        return (distance(this.pos, that.pos) < this.radius + that.radius);
    }
}

class Bubbles {
    constructor(canvas, ctx, entities = []) {
        Object.assign(canvas.style, {
            position: "fixed",
            left: "0",
            top: "0",
            margin: "0",
            width: "100vw",
            height: "100vh",
            'background-color': getCSSCustomProp('--bubbles-bg') || 'transparent',
            overflow: 'hidden',
            zIndex: '-1'
        });

        this.ctx = ctx;
        this.canvas = canvas;

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.color = getCSSCustomProp('--particle-color') || 'orangered';

        this.entities = entities;
        if (entities.length === 0) {
            let particleCount = getCSSCustomProp('--particle-count', document.documentElement, 'int');
            for (let x = 0; x < particleCount; x++) {
                this.entities.push(
                    new Bubble(this, this.color, 0.1 + (randInt(0, 100) * 0.01))
                );
            }
        }
        this.entityPairs = pairs(this.entities);

        window.bubblesMouse = window.bubblesMouse || {
            pos: {
                x: 0,
                y: 0
            },
            right: false,
            left: false
        };

        window.addEventListener('mousemove', (e) => {
            let rect = this.canvas.getBoundingClientRect();
            window.bubblesMouse.pos.x = Math.round(e.clientX - rect.left);
            window.bubblesMouse.pos.y = Math.round(e.clientY - rect.top);
        });
    }

    update() {
        const resolved = []
        const collidingPairs = this.entityPairs.filter(pair => pair[0].isColliding(pair[1]));

        for (let pair of collidingPairs) {
            if (!resolved.includes(pair)) {
                resolved.push(pair);

                let dx = pair[0].pos.x - pair[1].pos.x;
                let dy = pair[0].pos.y - pair[1].pos.y;

                let dist = Math.sqrt(dx * dx + dy * dy) || 1;

                // unit vector
                let ux = dx / dist;
                let uy = dy / dist;

                let cr = pair[0].radius + pair[1].radius;

                pair[0].pos.x = pair[1].pos.x + cr * ux;
                pair[0].pos.y = pair[1].pos.y + cr * uy;

                pair[0].vel.x *= -1;
                pair[0].vel.y *= -1;
                pair[1].vel.x *= -1;
                pair[1].vel.y *= -1;
            }
        }
    }

    draw() {
        this.update();
        for (let bubble of this.entities) {
            bubble.draw(this.ctx);
        }
    }

    drawMouse() {
        this.ctx.beginPath();
        this.ctx.arc(window.bubblesMouse.pos.x, window.bubblesMouse.pos.y, MOUSE_RADIUS, 0, 2 * Math.PI, false);
        this.ctx.globalAlpha = 1;
        this.ctx.closePath();
        this.ctx.fillStyle = 'red';
        this.ctx.fill();
    }
}