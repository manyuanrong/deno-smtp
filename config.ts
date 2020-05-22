export interface ConnectConfig {
  hostname: string;
  port?: number;
}

export type ConnectConfigWithAuthentication = ConnectConfig & {
  username: string;
  password: string;
};

export interface SendConfig {
  to: string;
  from: string;
  subject: string;
  content: string;
}
