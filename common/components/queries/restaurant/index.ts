import { gql } from "@apollo/client";
import {
  RestaurantFragment,
  RestaurantFullFragment
} from "common/fragments/restaurant";

export const RESTAURANT_LIST = gql`
  query GetRestaurantList {
    viewer {
      id
      account {
        id
        restaurants {
          id
          list {
            ...RestaurantFragment
          }
        }
      }
    }
  }
  ${RestaurantFragment}
`;

export const RESTAURANT_GET = gql`
  query GetRestaurantGet($id: ID!) {
    viewer {
      id
      account {
        id
        restaurants {
          id
          get(id: $id) {
            ...RestaurantFullFragment
          }
        }
      }
    }
  }
  ${RestaurantFullFragment}
`;
