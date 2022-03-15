import { gql } from "@apollo/client";

export const RestaurantFragment = gql`
  fragment RestaurantFragment on Restaurant {
    id
    name

    images

    createdAt
    updatedAt
  }
`;

export const RestaurantFullFragment = gql`
  fragment RestaurantFullFragment on Restaurant {
    id
    siteid
    name

    description

    supportedEmployees
    preparedMeals
    receivedDonations

    images

    owner {
      name
      image
    }

    longitude
    latitude

    createdAt
    updatedAt
  }
`;
