import { gql } from "@apollo/client";

export const GET_FAVOURITES = gql`
  query getrates {
    rates(currency: "USD") {
      currency
      favourites @client {
        id
        name
        location
        isFav
      }
    }
  }
`;

export const GET_REPO_NAME = gql`
query {
  launchesPast(limit: 1) {
    mission_name
    favourites @client
  }
}
`;
