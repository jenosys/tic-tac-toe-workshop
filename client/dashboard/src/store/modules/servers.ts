


// export const addServer = (addr: ServerStore['addr'], definition: ServerStore['image']): ServerAction =>
// ({
//   type: "server/ADD",
//   addr,
//   definition,
//   state: "ready"
// });

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

    default:
      return state;
  }
}