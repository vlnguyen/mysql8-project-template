export const ISessionManagerProvider = 'ILoginManager';
export interface ISessionManager {
  login: (username: string, password: string) => Promise<number | null>;
}
