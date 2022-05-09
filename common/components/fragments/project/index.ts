import { gql } from "@apollo/client";

export const ProjectFragment = gql`
  fragment ProjectFragment on Project {
    id
    name
    
    description
    logo

    webpage
  }
`;


export const ProjectFullFragment = gql`
  fragment ProjectFullFragment on Project {
    id
    name
    
    description
    logo

    webpage
  }
`;
