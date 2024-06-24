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
  places: IObject[];
  route: [number, number][]
  date: string | null;
  totalDistance: number;
  totalTime: number;
}

export interface IFilters {
  searchQuery: string;
  criteria: Categories[];
}