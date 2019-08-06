
export const addUser = (username: UserStore['username'], score: UserStore['score']): UserAction =>
  ({
    type: "user/ADD",
    username,
    score
  });

  export const removeUser = (username: UserStore['username']): UserAction =>
  ({
    type: "user/REMOVE",
    username
  });

  export const replaceUsers = (users: UserStore[]): UserAction => 
  ({
    type: 'users/REPLACE',
    users
  });

  const initialState: UserStore[] = [];

  export default function users(state = initialState, action: UserAction) {
    switch (action.type) {
      case 'users/REPLACE':
        return action.users;

      case "user/ADD":
        return state.find(u => u.username === action.username)
          ? state
          : [...state, {
            username: action.username!,
            score: action.score!
          }];
  
      case "user/REMOVE":
        return state.filter(u => u.username !== action.username);
  
      default:
        return state;
    }
  }
  