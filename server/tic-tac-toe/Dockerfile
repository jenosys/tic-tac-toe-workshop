# Tic-tac-toe 데디케이티드 서버를 컨테이너로 묶는 설정 파일

FROM node:12.7

# File Author / Maintainer
MAINTAINER Jaeseok Yoo

RUN apt-get update && \
    apt-get install -y python-pip &&  \
    apt-get install -y jq && \
    pip install awscli --upgrade --user

ENV PATH=/root/.local/bin:$PATH

WORKDIR /app

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
EXPOSE 3553

COPY package*.json ./
RUN npm install
COPY . .

CMD ["node", "build/index.js"]
ENTRYPOINT [ "/app/entrypoint.sh" ]
