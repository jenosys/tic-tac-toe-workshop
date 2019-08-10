


export const addServer = (addr: ServerStore['addr']): ServerAction =>
({
  type: "server/ADD",
  addr,
  state: "ready"
});

export const updateServer = (addr: ServerStore['addr'], state: ServerStore['state']): ServerAction =>
({
  type: "server/UPDATE",
  addr,
  state
});

export const removeServer = (addr: ServerStore['addr']): ServerAction =>
({
  type: "server/REMOVE",
  addr
});

export const replaceServers = (servers: ServerStore[]): ServerAction => 
({
  type: 'server/REPLACE',
  servers
});


const initialState: ServerStore[] = [];

export default function servers(state = initialState, action: ServerAction) {
  switch (action.type) {
    case 'server/REPLACE':
      return action.servers as ServerStore[];

    case "server/ADD":
      return state.find(s => s.addr === action.addr)
        ? state
        : [...state, {
          addr: action.addr!,
          state: action.state!
        }];

    case "server/UPDATE":
        return state.filter(s => s.addr !== action.addr).concat([{
          addr: action.addr,
          state: action.state
        }] as ServerStore[]);

    case "server/REMOVE":
        return state.filter(s => s.addr !== action.addr);

    default:
      return state;
  }
}