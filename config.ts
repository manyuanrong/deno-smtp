export interface ConnectConfig {
  host: string;
  port?: number;
  secure?: boolean
  username: string;
  password: string;
}

export interface SendConfig {
  to: string;
  from: string;
  subject: string;
  content: string;
}
