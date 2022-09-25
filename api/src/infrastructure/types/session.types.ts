import { SessionData } from 'express-session';
export interface ISessionData extends SessionData {
  visits?: number;
  isLoggedIn?: boolean;
}
