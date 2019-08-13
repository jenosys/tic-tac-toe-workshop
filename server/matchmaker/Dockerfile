# Tic-tac-toe MatchMaker

FROM node:12.7

# File Author / Maintainer
MAINTAINER Jaeseok Yoo

RUN apt-get update && apt-get install -y jq && \
    apt-get install -y python-pip && \
    pip install awscli --upgrade --user

RUN echo "export PATH=~/.local/bin:$PATH" >> /root/.bashrc
WORKDIR /app

COPY entrypoint.sh .
RUN chmod +x /app/entrypoint.sh
EXPOSE 8888

COPY package*.json ./
RUN npm install
COPY . .

CMD ["node", "build/index.js"]
ENTRYPOINT [ "/app/entrypoint.sh" ]