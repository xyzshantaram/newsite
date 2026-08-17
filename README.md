# homepage

This repo holds the source for shantaram.xyz, my personal site.

## Stack

The site is plain static HTML and CSS. It has no build step and no
JavaScript framework. A `Dockerfile` serves the files with
[static-web-server](https://static-web-server.net/), a small Rust binary
taken from the official static-web-server image. The container runs as a
dedicated non-root user (uid 10004) on port 8080.

The site deploys to [dokku](https://dokku.com/) running on shantaram.xyz. 
dokku's own nginx proxy terminates TLS and forwards traffic to the container.

## Local development

Open `index.html` directly in a browser, or serve the repo root with any
static file server. No build step runs before a page loads.

To test the production container locally:

```sh
podman build -t homepage .
podman run --rm -p 8080:8080 homepage
```

Then open `http://localhost:8080`.

## Deployment

Push to the `dokku` remote to deploy:

```sh
git push dokku main
```

dokku rebuilds the image from the `Dockerfile` and redeploys the container.
No manual steps run after the push, other than the one-time app setup on
the dokku host (`apps:create`, domain, and cert).
