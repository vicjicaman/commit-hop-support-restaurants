import { gql } from "@apollo/client";
import {
  ProjectFragment,
  ProjectFullFragment
} from "common/fragments/project";

export const PROJECT_LIST = gql`
  query GetProjectList {
    viewer {
      id
      account {
        id
        projects {
          id
          list {
            ...ProjectFragment
          }
        }
      }
    }
  }
  ${ProjectFragment}
`;

export const PROJECT_GET = gql`
  query GetProjectGet($id: ID!) {
    viewer {
      id
      account {
        id
        projects {
          id
          get(id: $id) {
            ...ProjectFullFragment
          }
        }
      }
    }
  }
  ${ProjectFullFragment}
`;
