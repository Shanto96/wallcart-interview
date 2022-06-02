import gql from "graphql-tag";

const GET_PRODUCT_BY_ID = gql`
  {
    getCategories(pagination: { limit: 100, skip: 0 }) {
      message
      statusCode
      result {
        count
        categories {
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
  }
`;

export default GET_PRODUCT_BY_ID;
