type Coordinates = {
  Coordinates: {
    lat: string;
    lng: string;
  };
};

type Flight = {
  Flight: { id: string };
};

export type LocationResponse = {
  user_name: string;
  location: Coordinates | Flight;
};
