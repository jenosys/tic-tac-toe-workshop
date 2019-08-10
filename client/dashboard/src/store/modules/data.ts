export const setAuth = (username: DataSture['username']): DataAction =>
  ({
    type: "data/AUTH",
    username
  });

export const setDesireIdleSrvCnt = (number: DataSture['desireIdleSrvCnt']): DataAction =>
  ({
    type: "data/DESIRE_IDLE_SRV_CNT",
    desireIdleSrvCnt: number
  });


const initialState: DataSture = {
  username: 'jaeseok',
  desireIdleSrvCnt: 10
};

export default function auth(state = initialState, action: DataAction): DataSture {
  switch (action.type) {
    case 'data/AUTH':
      return {
        username: action.username,
        desireIdleSrvCnt: state.desireIdleSrvCnt
      };

    case 'data/DESIRE_IDLE_SRV_CNT':
      return {
        username: state.username,
        desireIdleSrvCnt: action.desireIdleSrvCnt!
      };

    default:
      return state;
  }
}