const { combineReducers } = require("redux");
const { categoryReducer } = require("./category.reducer.jsx");

export const rootReducer = combineReducers({
  category: categoryReducer,
});
