import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { appState} from './state/state'
const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Launch: {
        fields: {
          favourites: {
            read(_, { variables }) {
              const fav = localStorage?.getItem("favourites");
              return typeof fav !==(undefined || 'undefined') ? JSON.parse(fav) : [];
            }
          }
        }
      }
    }
  })
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
  rootElement
);
