import { gql } from "@apollo/client";
import {
  InfoLocationFragment,
  InfoLocationFullFragment
} from "common/fragments/info-location";

export const INFOLOCATION_LIST = gql`
  query GetInfoLocationList {
    viewer {
      id 
      account {
        id
        infoLocations {
          id
          list {
            ...InfoLocationFragment
          }
        }
      }
    }
  }
  ${InfoLocationFragment}
`;

export const INFOLOCATION_GET = gql`
  query GetInfoLocationGet($id: ID!) {
    viewer {
      id
      account {
        id
        infoLocations {
          id
          get(id: $id) {
            ...InfoLocationFullFragment
          }
        }
      }
    }
  }
  ${InfoLocationFullFragment}
`;
