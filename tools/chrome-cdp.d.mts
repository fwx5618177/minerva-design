export interface ChromePage {
  call(
    method: string,
    params?: Record<string, unknown>,
  ): Promise<Record<string, unknown>>;
  evaluate<T = unknown>(expression: string): Promise<T>;
  wait(expression: string, options?: { timeout?: number }): Promise<void>;
  navigate(url: string): Promise<void>;
  click(elementExpression: string): Promise<void>;
  screenshot(path: string): Promise<void>;
  errors: string[];
  close(): Promise<void>;
}
export function launchChrome(options?: {
  width?: number;
  height?: number;
  mobile?: boolean;
  hasTouch?: boolean;
}): Promise<ChromePage>;
export function connectCdp(url: string): Promise<{
  send(
    method: string,
    params?: Record<string, unknown>,
    sessionId?: string,
  ): Promise<Record<string, unknown>>;
  on(listener: (message: Record<string, unknown>) => void): () => void;
  close(): void;
}>;
