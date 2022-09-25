import React from "react";

export interface ISession {
  visits: number | null;
  userId: number | null;
}

export const defaultSessionValues: ISession = {
  visits: null,
  userId: null,
};

interface IAppContext {
  session?: ISession;
  loadSession: () => Promise<void>;
  addVisit: () => Promise<void>;
  clearSession: () => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AppContext = React.createContext<IAppContext>({
  session: defaultSessionValues,
  loadSession: async () => {},
  addVisit: async () => {},
  clearSession: async () => {},
  login: async () => {},
  logout: async () => {},
});
