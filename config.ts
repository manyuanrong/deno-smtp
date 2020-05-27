export interface ConnectConfig {
  hostname: string;
  port?: number;
}

export interface ConnectConfigWithAuthentication extends ConnectConfig {
  username: string;
  password: string;
}

export interface SendConfig {
  to: string;
  from: string;
  subject: string;
  content: string;
}
