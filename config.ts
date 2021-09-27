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
  date?: string;
  subject: string;
  content: string;
  html?: string;
}

export type { ConnectConfig, ConnectConfigWithAuthentication, SendConfig };
