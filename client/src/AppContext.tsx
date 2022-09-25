import React from "react";

export interface ISession {
  visits: number | null;
}

export const defaultSessionValues: ISession = {
  visits: null,
};

interface IAppContext {
  session?: ISession;
  loadSession: () => Promise<void>;
  addVisit: () => Promise<void>;
  clearSession: () => Promise<void>;
}

export const AppContext = React.createContext<IAppContext>({
  session: defaultSessionValues,
  loadSession: async () => {},
  addVisit: async () => {},
  clearSession: async () => {},
});
