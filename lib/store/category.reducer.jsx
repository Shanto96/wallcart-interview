import { setCategories } from "./actions";

const initialState = [];

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CATEGORY":
      state = action.payload;
    case "CREATE_CATEGORY":
      state = [action.payload, ...state];
    case "UPDATE_CATEGORY":
      let categories = state.filter((cat) => cat.uid != action.payload.uid);
      state = [action.payload, ...categories];
    default:
      return state;
  }
};
