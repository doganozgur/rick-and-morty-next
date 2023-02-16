export type Resident = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

export type Location = {
  id: number;
  name: string;
  dimension: string;
  type: string;
  residents: string[];
  url: string;
};

export type LocationData = {
  info: object;
  results: Location[];
};

export type Character = {
  id: number;
  name: string;
  species: string;
  gender: string;
  status: string;
  image: string;
  location: string;
  type: string;
};
