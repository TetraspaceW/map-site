export type Node = {
  user_id: string;
  nearest_airport: string;
  user_name: string;
  location: NodeLocation;
};

export type Airport = {
  code: string;
  name: string;
  location: NodeLocation;
};

export type PlaneRoute = {
  start: string;
  end: string;
  length: number;
};

export type NodeLocation = {
  lat: number;
  lng: number;
};
