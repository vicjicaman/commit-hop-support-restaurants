import { gql } from "@apollo/client";
import {
  OpensourceFragment,
  OpensourceFullFragment
} from "common/fragments/opensource";

export const OPENSOURCE_LIST = gql`
  query GetOpensourceList {
    viewer {
      id
      account {
        id
        opensources {
          id
          list {
            ...OpensourceFragment
          }
        }
      }
    }
  }
  ${OpensourceFragment}
`;

export const OPENSOURCE_GET = gql`
  query GetOpensourceGet($id: ID!) {
    viewer {
      id
      account {
        id
        opensources {
          id
          get(id: $id) {
            ...OpensourceFullFragment
          }
        }
      }
    }
  }
  ${OpensourceFullFragment}
`;
