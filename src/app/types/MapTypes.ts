export type Pin = {
  location: {
    lat: number;
    lng: number;
  };
  user_name: string;
  type: "flight" | "coordinates";
};
