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
}

export interface ITripDay {
  id: number;
  places: IObject[];
  route: [number, number][]
  date: string;
  totalDistance: number;
  totalTime: number;
}

export interface IFilters {
  searchQuery: string;
  criteria: Categories[];
}