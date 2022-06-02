import gql from "graphql-tag";

const UPDATE_CATEGORY = gql`
  mutation createCat($uId: String!, $name: String) {
    updateCategory(categoryUid: $uId, category: { name: $name }) {
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

export default UPDATE_CATEGORY;
