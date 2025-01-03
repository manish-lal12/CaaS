#  docker file to build image provided as base image to the. image name is aaraz/caas:1.2
FROM ubuntu:25.04
RUN apt update && apt install -y supervisor git nodejs npm ssh && rm -f /etc/ssh/sshd_config
COPY sshd_config /etc/ssh/sshd_config
COPY example_app.conf /etc/supervisor/conf.d/
COPY docker-entrypoint.sh /
WORKDIR /app
COPY ./example_node_app/server.js .
ENTRYPOINT [ "/bin/sh","/docker-entrypoint.sh" ]