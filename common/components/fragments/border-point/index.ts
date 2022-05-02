import { gql } from "@apollo/client";

export const BorderPointFragment = gql`
  fragment BorderPointFragment on BorderPoint {
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


export const BorderPointFullFragment = gql`
  fragment BorderPointFullFragment on BorderPoint {
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
