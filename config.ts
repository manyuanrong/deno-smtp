interface ConnectConfig {
  hostname: string;
  port?: number;
}

interface ConnectConfigWithAuthentication extends ConnectConfig {
  username: string;
  password: string;
}

interface Attachment {
  contentType: string;
  encoding: string;
  fileName: string;
  data: string;
  charset?: string;
  contentId?: string;
  contentDisposition?: string;
  xAttachmentId?: string;
}

interface SendConfig {
  to: string;
  from: string;
  date?: string;
  subject: string;
  content: string;
  html?: string;
  attachments?: Attachment[];
}

export type { ConnectConfig, ConnectConfigWithAuthentication, SendConfig };
