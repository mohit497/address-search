import { RefetchQueriesFunction } from "@apollo/client";
import { appState } from "../../state/state";

export const handleShowFav = (refetch: Function) => {
  refetch().then((res: any) => {
    if (res.data?.launchesPast[0].favourites?.length >= 0) {
      console.log(res.data?.launchesPast[0].favourites, "ery result");
      // TODO apollo cachine last read function result use reactive var for now
      appState({ ...appState(), results: appState().favourites});
    } else {
      appState({ ...appState(), results: [] });
    }
  });
};
