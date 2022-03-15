import { gql } from "@apollo/client";
import { RestaurantFragment } from "../fragments";

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

export const RESTAURANT_FIND = gql`
  query GetRestaurantFind {
    viewer {
      id
      account {
        id
        restaurants {
          id
          find(longitude: Float, latitude: Float) {
            ...RestaurantFragment
          }
        }
      }
    }
  }
  ${RestaurantFragment}
`;
