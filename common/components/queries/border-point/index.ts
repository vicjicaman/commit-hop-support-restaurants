import { gql } from "@apollo/client";
import {
  BorderPointFragment,
  BorderPointFullFragment
} from "common/fragments/border-point";

export const BORDERPOINT_LIST = gql`
  query GetBorderPointList {
    viewer {
      id 
      account {
        id
        borderPoints {
          id
          list {
            ...BorderPointFragment
          }
        }
      }
    }
  }
  ${BorderPointFragment}
`;

export const BORDERPOINT_GET = gql`
  query GetBorderPointGet($id: ID!) {
    viewer {
      id
      account {
        id
        borderPoints {
          id
          get(id: $id) {
            ...BorderPointFullFragment
          }
        }
      }
    }
  }
  ${BorderPointFullFragment}
`;
