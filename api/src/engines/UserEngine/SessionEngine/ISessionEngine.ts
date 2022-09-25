export const ISessionEngineProvider = 'ISessionEngine';
export interface ISessionEngine {
  login: (username: string, password: string) => Promise<number | null>;
}
