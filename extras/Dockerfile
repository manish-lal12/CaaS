#  docker file to build image provided as base image to the. image name is aaraz/caas:1.1
FROM ubuntu:25.04
RUN apt update && apt install -y supervisor git nodejs npm ssh
COPY example_app.conf /etc/supervisor/conf.d/
WORKDIR /app
COPY ./example_node_app/server.js .
ENTRYPOINT [ "/usr/bin/supervisord","-n" ]