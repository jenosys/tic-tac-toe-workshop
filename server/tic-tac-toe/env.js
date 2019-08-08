const host = process.env.HOST_IP || '127.0.0.1';
const port = process.env.PORT || "3553";
const hostPort = process.env.PORT_TCP_3553 || "3553";

export {
  host,
  port,
  hostPort
}