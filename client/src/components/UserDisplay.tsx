import React, { useCallback, useContext, useEffect, useState } from "react";
import Axios from "axios";
import { AppContext } from "../AppContext";

export interface IUser {
  id: number;
  name: string;
  dateCreated: Date;
}

export function UserDisplay() {
  const [user, setUser] = useState<IUser>();
  const { session } = useContext(AppContext);

  const loadUser = useCallback(async () => {
    if (!session?.userId) {
      setUser(undefined);
      return;
    }
    const data = await Axios.request({
      url: `/api/user/${session.userId}`,
    }).then((resp) => resp.data.data);

    data.isSelf && console.log(`You are ${data.user.name}!`);

    setUser(data.user as IUser);
  }, [session?.userId]);

  useEffect(() => {
    loadUser();
  }, [session?.userId, loadUser]);

  if (!user) {
    return null;
  }

  return <div>Welcome, {user.name}!</div>;
}
