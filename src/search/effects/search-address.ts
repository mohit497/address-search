import axios from "axios";
import _ from "lodash";
import { useEffect } from "react";
import {  API_KEY, LOCATION_BIAS, SEARCH_DEBOUNCE } from "../../config";
import { appState, AppState } from "../../state/state";

export const searchAddress = _.debounce((state: AppState, isSubscribed: boolean) => {
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURI(
        state.searchString
      )}&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating,geometry&${LOCATION_BIAS}&key=${API_KEY}`
    )
    .then((res) => {
      // format returned address
      if(isSubscribed){
      const items: any[] = [];
      res.data.candidates.map((a: any) => {
        const address = {
          location: a.geometry.location,
          id: a.name,
          name: a.formatted_address,
          isFav: false
        };
        if (_.find(state.favourites, { id: address.id })) {
          address.isFav = true;
        }

        items.push(address);
        return a;
      });
      appState({ ...appState(), results: items });
    }
    })
    .catch((e) => {
      console.log(e, " error occured while searching results");
    });
}, SEARCH_DEBOUNCE);
