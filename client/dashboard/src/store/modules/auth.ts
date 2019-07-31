export const setAuth = (username: AuthStore['username']): AuthAction =>
  ({
    type: "auth/SET",
    username
  });


const initialState: AuthStore = {
  username: 'jaeseok'
};

export default function auth(state = initialState, action: AuthAction): AuthStore {
  switch (action.type) {
    case "auth/SET":
      return {
        username: action.username
      }

    default:
      return state;
  }
}