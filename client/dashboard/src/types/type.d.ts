interface ActionBase {
  type: string;
}

interface VarActionType extends ActionBase {
  type: "var/USERNAME" | 'var/IDLE_SERVER_NUMBER'
}

interface UserActionType extends ActionBase {
  type: 'user/ADD' | 'user/REMOVE' | 'users/REPLACE'
}

interface ServerActionType extends ActionBase {
  type: 'server/ADD' | 'server/UPDATE' | 'server/REMOVE' | 'servers/REPLACE'
}

interface StoreBase {}


interface UserStore extends StoreBase {
  username: string;
  score: number;
}

interface ServerStore extends StoreBase {
  addr: string;
  state: "ready" | "busy" | 'bind';
  image: string;
  launchType: 'EC2' | 'FARGATE';
  status: 'healthy' | 'unhealthy';
}

interface VarStore {
  username?: string;
  idleServerNumber: number;
}

interface RootStore {
  vars: VarStore;
  users: UserStore[];
  servers: ServerStore[];
};


type SingleAction<Type extends ActionBase, Store extends StoreBase> = Type & Partial<Store>;
type GroupAction<Type extends ActionBase, Store extends StoreBase> = Type & Store[];


type VarAction = SingleAction<VarActionType, VarStore>;
type UserAction = Action<UserActionType, UserStore> | GroupAction<UserActionType, UserStore>;
type ServerAction = Action<ServerActionType, ServerStore>;