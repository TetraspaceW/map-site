export type Node = {
  user_id: string;
  nearest_airport: string;
  user_name: string;
  location: NodeLocation;
};

type NodeLocation = {
  lat: number;
  lng: number;
};

export type Airport = {
  code: string;
  name: string;
};

export type Route = {
  start: string;
  end: string;
  length: number;
};
