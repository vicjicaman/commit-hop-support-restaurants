import { gql } from "@apollo/client";
import {
  RestaurantFragment,
  RestaurantFullFragment,
  RestaurantSearchFragment,
} from "../../fragments";

export const RESTAURANT_EDIT = gql`
  mutation EditRestaurantList($id: ID!, $input: RestaurantInput!) {
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
