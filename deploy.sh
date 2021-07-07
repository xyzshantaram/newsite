#!/bin/bash

srcdir="$PWD"
name="deploy"
cmd="cp -v"

# relative paths wheee
sources=( 
    "index.html"
    "style.css"
    "services/index.html"
    "blog/index.html"
    "contact/index.html"
    "portfolio/index.html"
    "projects/index.html"
    "blog/blog.css"
    "main.js"
)

if [[ -z "$1" ]]; then
    echo "$name: No destination provided."
    exit 1
else
    if ! [[ -d "$1" ]]; then
        echo "$name: No such directory: $1"
        exit 1
    fi
fi

destdir="$1"

if [[ $2 == "--dry-run" ]]; then
    cmd="echo"
    echo "Dry run: won't change files"
fi

for src in "${sources[@]}"; do
    if ! cmp -s "$srcdir/$src" "$1/$src"; then
        $cmd "$srcdir/$src" "$1/$src"
    fi
done