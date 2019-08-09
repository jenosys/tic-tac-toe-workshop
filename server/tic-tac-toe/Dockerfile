# Tic-tac-toe 데디케이티드 서버를 컨테이너로 묶는 설정 파일

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

CMD ["node", "build/index.js"]
ENTRYPOINT [ "/app/entrypoint.sh" ]
