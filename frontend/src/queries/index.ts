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
  query GetRestaurantFind($latitude: Float!, $longitude: Float!) {
    viewer {
      id
      account {
        id
        restaurants {
          id
          find(longitude: $longitude, latitude: $latitude) {
            ...RestaurantFragment
          }
        }
      }
    }
  }
  ${RestaurantFragment}
`;
