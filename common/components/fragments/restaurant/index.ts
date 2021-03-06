import { gql } from "@apollo/client";

export const RestaurantFragment = gql`
  fragment RestaurantFragment on Restaurant {
    id
    name
    
    description
    images

    address
    country

    longitude
    latitude
  }
`;


export const RestaurantFullFragment = gql`
  fragment RestaurantFullFragment on Restaurant {
    id
    name

    description
    images

    address
    country

    longitude
    latitude
  }
`;
