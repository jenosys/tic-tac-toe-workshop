############################################
# Dockerfile to build hello microservice
# Based on python dockerhub image
############################################

# Set base image to python
FROM python:3.7

# File Author / Maintainer
MAINTAINER Jaeseok Yoo

# Copy source file and python req's
COPY requirements.txt /

# Install requirements
RUN pip install -r /requirements.txt

RUN mkdir -p /work
WORKDIR /work

COPY hello.py .
COPY ecs_get_port.py .
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 80

ENTRYPOINT [ "/work/entrypoint.sh" ]
