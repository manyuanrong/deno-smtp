interface ConnectConfig {
  hostname: string;
  port?: number;
}

interface ConnectConfigWithAuthentication extends ConnectConfig {
  username: string;
  password: string;
}

interface SendConfig {
  to: string;
  from: string;
  subject: string;
  content: string;
}

export type { ConnectConfigWithAuthentication, ConnectConfig, SendConfig }