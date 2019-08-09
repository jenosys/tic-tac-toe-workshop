const HOST = process.env.HOST_IP || '127.0.0.1';
const PORT = process.env.PORT || "3553";
const HOST_PORT = process.env.PORT_TCP_3553 || "3553";
const NODE_ENV = process.env.NODE_ENV || 'development';
const REGION = process.env.REGION || 'ap-northeast-2';

export default {
  HOST,
  PORT,
  HOST_PORT,
  NODE_ENV,
  REGION
};