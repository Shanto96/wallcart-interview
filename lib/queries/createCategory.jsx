import gql from "graphql-tag";

const CREATE_CATEGORY = gql`
  mutation createCat($Name: String!, $ParentCategoryUid: String) {
    createCategory(
      category: { name: $Name, parentCategoryUid: $ParentCategoryUid }
    ) {
      message
      statusCode
      result {
        uid
        name
        parent {
          uid
          name
        }
        parents {
          uid
          name
        }
        isActive
        inActiveNote
        createdAt
        updatedAt
      }
    }
  }
`;

export default CREATE_CATEGORY;
