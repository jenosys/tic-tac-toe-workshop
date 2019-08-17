export const setUsername = (username: VarStore['username']): VarAction =>
  ({
    type: "var/USERNAME",
    username
  });

export const setIdleServerNumber = (number: VarStore['idleServerNumber']): VarAction =>
  ({
    type: "var/IDLE_SERVER_NUMBER",
    idleServerNumber: number
  });

const initialState: VarStore = {
  username: 'jaeseok',
  idleServerNumber: 10
};

export default function auth(state = initialState, action: VarAction): VarStore {
  switch (action.type) {
    case 'var/USERNAME':
      return {
        username: action.username,
        idleServerNumber: state.idleServerNumber
      };

    case 'var/IDLE_SERVER_NUMBER':
      return {
        username: state.username,
        idleServerNumber: action.idleServerNumber!
      };

    default:
      return state;
  }
}