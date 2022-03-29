import { gql } from "@apollo/client";

export const RestaurantFragment = gql`
  fragment RestaurantFragment on Restaurant {
    id
    name
    description

    images

    supportedEmployees
    preparedMeals
    receivedDonations

    longitude
    latitude

    createdAt
    updatedAt
  }
`;

export const RestaurantSearchFragment = gql`
  fragment RestaurantSearchFragment on Restaurant {
    id
    name
    description
    images

    supportedEmployees
    preparedMeals
    receivedDonations

    longitude
    latitude

    createdAt
    updatedAt
  }
`;

export const RestaurantFullFragment = gql`
  fragment RestaurantFullFragment on Restaurant {
    id
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
