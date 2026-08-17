# syntax=docker/dockerfile:1

# static-web-server binary, taken from the official image (same convention
# as luanti and crazy-wall — see VPS_STATE.md in the dokku-migration notes).
FROM docker.io/joseluisq/static-web-server:2.44.0 AS sws

FROM alpine:3.22

# Dedicated non-root user, uid 10004 (fleet convention, see VPS_STATE.md).
# -D: no password. -S: system user/group. -H: no home dir.
# /sbin/nologin does not exist in this image but stores fine in /etc/passwd,
# since nothing ever logs in as this user.
RUN addgroup -g 10004 -S homepage \
    && adduser -D -S -H -s /sbin/nologin -G homepage -u 10004 homepage

WORKDIR /www
COPY --from=sws /static-web-server /usr/local/bin/static-web-server
COPY --chown=homepage:homepage . .

USER homepage
EXPOSE 8080

# --host 0.0.0.0: static-web-server defaults to "::" (IPv6 wildcard), but
# dokku's nginx proxies over IPv4.
# --port 8080: a non-root user cannot bind ports below 1024.
CMD ["/usr/local/bin/static-web-server", "--host", "0.0.0.0", "--port", "8080", "--root", "/www"]
