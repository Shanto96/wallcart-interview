import GET_PRODUCT_BY_ID from "../queries/getProductById";
import { useQuery, useMutation } from "@apollo/client";

export const setCategories = (categories) => {
  return {
    type: "SET_CATEGORY",
    payload: categories,
  };
};
export const createCategory = (category) => {
  return {
    type: "CREATE_CATEGORY",
    payload: category,
  };
};
export const updateCategory = (category) => {
  return {
    type: "UPDATE_CATEGORY",
    payload: category,
  };
};
