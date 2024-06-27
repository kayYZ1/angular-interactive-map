import { Categories } from "./enums";

export interface IObject {
  id: number;
  title: string;
  description: string;
  phone: string;
  email: string;
  category: Categories;
  coordinates: [number, number];
  imgUrl: string;
}

export interface ITrip {
  name: string;
  days: ITripDay[];
  activeTripDay: ITripDay;
}

export interface ITripDay {
  id: number;
  objects: IObject[];
  route: [number, number][]
  date: string;
  distance: number;
  time: number;
}

export interface IFilters {
  searchQuery: string;
  criteria: Categories[];
}