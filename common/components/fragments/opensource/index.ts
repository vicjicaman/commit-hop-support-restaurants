import { gql } from "@apollo/client";

export const OpensourceFragment = gql`
  fragment OpensourceFragment on Opensource {
    id
    name
    
    description
    logo

    repository
  }
`;


export const OpensourceFullFragment = gql`
  fragment OpensourceFullFragment on Opensource {
    id
    name
    
    description
    logo

    repository
  }
`;
