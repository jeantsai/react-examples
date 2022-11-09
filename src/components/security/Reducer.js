export const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      return {
        ...state,
        user: action.payload.user
      };
    }
    case "LOGOUT": {
      localStorage.clear()
      return {
        ...state,
        user: null
      };
    }
    default:
      return state;
  }
};
