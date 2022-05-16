import { gql } from "@apollo/client";

export const InfoLocationFragment = gql`
  fragment InfoLocationFragment on InfoLocation {
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


export const InfoLocationFullFragment = gql`
  fragment InfoLocationFullFragment on InfoLocation {
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
