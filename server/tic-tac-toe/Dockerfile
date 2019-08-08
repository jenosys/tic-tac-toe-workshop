############################################
# Dockerfile to build hello microservice
# Based on python dockerhub image
############################################

# Set base image to python
FROM node:12.7

# File Author / Maintainer
MAINTAINER Jaeseok Yoo

COPY requirements.txt .
RUN apt-get update && \
    apt-get install -y python-pip &&  \
    pip install -r requirements.txt

WORKDIR /app

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
EXPOSE 3553

COPY package*.json ./
RUN npm install
COPY . .

CMD [ "npm", "run", "start-production" ]
ENTRYPOINT [ "/app/entrypoint.sh" ]
