import { AppState } from "../../state/state";

export function saveToLocal(state: AppState) {
  // set list to local storage
  if (state.favourites.length > 0) {
    localStorage.setItem("favourites", JSON.stringify(state.favourites));
  }
}
