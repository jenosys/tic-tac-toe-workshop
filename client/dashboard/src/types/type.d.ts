interface ActionBase {
  type: string;
}

interface AuthActionType extends ActionBase {
  type: "auth/SET"
}

interface UserActionType extends ActionBase {
  type: 'user/ADD' | 'user/REMOVE' | 'users/REPLACE'
}

interface ServerActionType extends ActionBase {
  type: 'server/ADD' | 'server/UPDATE' | 'server/REMOVE' | 'servers/REPLACE'
}

interface StoreBase {}

interface AuthStore extends StoreBase {
  username?: string
}

interface UserStore extends StoreBase {
  username: string,
  score: number
}

interface ServerStore extends StoreBase {
  addr: string,
  state: "READY" | "BUSY"
}

interface RootStore {
  auth: AuthStore,
  users: UserStore[],
  servers: ServerStore[]
};

type SingleAction<Type extends ActionBase, Store extends StoreBase> = Type & Partial<Store>;
type GroupAction<Type extends ActionBase, Store extends StoreBase> = Type & Store[];


type AuthAction = SingleAction<AuthActionType, AuthStore>;
type UserAction = Action<UserActionType, UserStore> | GroupAction<UserActionType, UserStore>;
type ServerAction = Action<ServerActionType, ServerStore>;