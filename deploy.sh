#!/bin/bash
#
# deploy.sh - Deploy static site files to a remote destination via rsync.
#
# Usage:
#   ./deploy.sh [OPTIONS] <destination>
#
#   <destination>  Path to the destination directory (e.g. /var/www/html
#                  or user@host:/var/www/html for remote rsync).
#
# Options:
#   --dry-run      Show what would be transferred without making changes.
#   --help, -h     Show this help message and exit.
#
#   To add/remove files from the deployment set, edit the `sources` array below.
#
# Examples:
#   ./deploy.sh /var/www/html             # deploy to local dir
#   ./deploy.sh user@server:/var/www/     # deploy to remote server
#   ./deploy.sh --dry-run /var/www/html   # preview what would change

set -euo pipefail

srcdir="$PWD"
name="deploy"
cmd=("rsync" "-rv")

sources=(
    "index.html"
    "style.css"
    "services/index.html"
    "services/services.css"
    "blog/index.html"
    "contact/index.html"
    "contact/donate.html"
    "portfolio/index.html"
    "blog/blog.css"
    "blog/feed.rss"
    "blog/imperfect.html"
    "blog/better.html"
    "blog/template.html"
    "blog/bullet.html"
    "blog/twoslowdancers.html"
    "portfolio/res/"
    "portfolio/sites/"
    "icon.css"
    "pfp.jpg"
    "assets/fonts/typewriter.css"
    # "assets/fonts/cmunit.eot"
    # "assets/fonts/cmunit.svg"
    # "assets/fonts/cmunit.ttf"
    # "assets/fonts/cmunit.woff"
    # "assets/fonts/cmuntb.eot"
    # "assets/fonts/cmuntb.svg"
    # "assets/fonts/cmuntb.ttf"
    # "assets/fonts/cmuntb.woff"
    # "assets/fonts/cmuntt.eot"
    # "assets/fonts/cmuntt.svg"
    # "assets/fonts/cmuntt.ttf"
    # "assets/fonts/cmuntt.woff"
    # "assets/fonts/cmuntx.eot"
    # "assets/fonts/cmuntx.svg"
    # "assets/fonts/cmuntx.ttf"
    # "assets/fonts/cmuntx.woff"
    # "assets/fonts/OFL.txt"
)

usage() {
    head -n 21 "$0" | tail -n 17 | sed 's/^# \?//'
    exit 0
}

dry_run=false
destdir=""

for arg in "$@"; do
    case "$arg" in
        --help|-h) usage ;;
        --dry-run) dry_run=true ;;
        *)
            if [[ -z "$destdir" ]]; then
                destdir="$arg"
            else
                echo "ERROR: unexpected extra argument: $arg"
                usage
            fi
            ;;
    esac
done

if [[ -z "$destdir" ]]; then
    echo "ERROR: destination directory is required."
    usage
fi

if [[ ! -d "$destdir" && ! "$destdir" =~ ":" ]]; then
    echo "ERROR: destination directory not found: $destdir"
    usage
fi

echo "Checking sources..."

for src in "${sources[@]}"; do
    if [[ ! -f "$src" && ! -d "$src" ]]; then
        echo "ERROR: file not found: $src"
        exit 1
    fi
done

if $dry_run; then
    cmd=("echo" "[dry-run] rsync")
    echo "Dry run: no files will be changed."
    echo "---"
fi

any_changed=false
for src in "${sources[@]}"; do
    if ! diff -q "$srcdir/$src" "$destdir/$src" > /dev/null 2>&1; then
        echo "Updating $src..."
        "${cmd[@]}" "$srcdir/$src" "$destdir/$(dirname "$src")/"
        any_changed=true
    else
        echo "$src not modified, skipping..."
    fi
done

if ! $any_changed; then
    echo "Everything up to date."
fi
