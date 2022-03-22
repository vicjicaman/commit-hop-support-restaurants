import { gql } from "@apollo/client";
import { RestaurantFragment, RestaurantFullFragment } from "../../fragments";

export const RESTAURANT_CREATE = gql`
  mutation CreateRestaurant($input: RestaurantInput!) {
    viewer {
      account {
        restaurants {
          create(input: $input) {
            id
            list {
              ...RestaurantFragment
            }
          }
        }
      }
    }
  }
  ${RestaurantFragment}
`;

export const RESTAURANT_EDIT = gql`
  mutation EditRestaurant($id: ID!, $input: RestaurantInput!) {
    viewer {
      account {
        restaurants {
          get(id: $id) {
            update(input: $input) {
              id
              get(id: $id) {
                ...RestaurantFullFragment
              }
            }
          }
        }
      }
    }
  }
  ${RestaurantFullFragment}
`;

export const RESTAURANT_REMOVE = gql`
  mutation RemoveRestaurant($id: ID!) {
    viewer {
      account {
        restaurants {
          get(id: $id) {
            remove {
              id
              list {
                ...RestaurantFragment
              }
            }
          }
        }
      }
    }
  }
  ${RestaurantFragment}
`;
