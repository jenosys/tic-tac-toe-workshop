FROM createat/leiningen:openjdk-8
LABEL maintainer="jneosys@gmail.com"

RUN mkdir -p /work/ \
 && cd /work/ \
 && wget https://github.com/qiuxiafei/zk-web/archive/master.zip \
 && unzip master.zip
WORKDIR /work/zk-web-master

RUN lein deps
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh

EXPOSE 9090

ENTRYPOINT ["/entrypoint.sh"]
CMD ["lein", "run"]
