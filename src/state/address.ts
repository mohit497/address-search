interface Location {
  lat: number;
  lng: number;
}

export interface Address {
  id: string;
  location: Location;
  name: string;
  isFav: boolean;
  distFromMelbourne?: string;
}
