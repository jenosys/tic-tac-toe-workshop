interface ActionBase {
  type: string;
}

interface AuthActionType extends ActionBase {
  type: 'data/AUTH' | 'data/DESIRE_IDLE_SRV_CNT'
}

interface UserActionType extends ActionBase {
  type: 'user/ADD' | 'user/REMOVE' | 'users/REPLACE'
}

interface ServerActionType extends ActionBase {
  type: 'server/ADD' | 'server/UPDATE' | 'server/REMOVE' | 'servers/REPLACE'
}

interface StoreBase {}

interface DataSture extends StoreBase {
  username?: string;
  desireIdleSrvCnt: number;
}

interface UserStore extends StoreBase {
  username: string;
  score: number;
}

interface ServerStore extends StoreBase {
  addr: string;
  state: "ready" | "busy" | 'bind';
  image: string;
  launchType: 'EC2' | 'FARGATE';
}

interface RootStore {
  data: DataSture;
  users: UserStore[];
  servers: ServerStore[];
};


interface VarStore {
  idleServerNumber: number;
}

type SingleAction<Type extends ActionBase, Store extends StoreBase> = Type & Partial<Store>;
type GroupAction<Type extends ActionBase, Store extends StoreBase> = Type & Store[];


type DataAction = SingleAction<AuthActionType, DataSture>;
type UserAction = Action<UserActionType, UserStore> | GroupAction<UserActionType, UserStore>;
type ServerAction = Action<ServerActionType, ServerStore>;