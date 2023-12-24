export type Node = {
  user_id: string;
  nearest_airport: string;
  user_name: string;
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
