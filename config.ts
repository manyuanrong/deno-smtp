interface ConnectConfig {
  hostname: string;
  port?: number;
}

interface ConnectConfigWithAuthentication extends ConnectConfig {
  username: string;
  password: string;
}

interface SendAbstract {
  to: string;
  from: string;
  date?: string;
  subject: string;
}

interface SendBoth extends SendAbstract {
  html: string;
  content: string;
}

interface SendHtml extends SendAbstract {
  html: string;
}

interface SendContent extends SendAbstract {
  content: string;
}

type SendConfig = SendBoth | SendHtml | SendContent;

export type { ConnectConfig, ConnectConfigWithAuthentication, SendConfig };
