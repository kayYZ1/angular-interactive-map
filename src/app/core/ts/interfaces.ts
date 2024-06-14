import { Categories } from "./enums";

export interface IObject {
  id: number;
  title: string;
  description: string;
  phone: string;
  email: string;
  category: Categories;
  coordinates: [number, number]
  imgUrl: string;
}

export interface ITrip {
  places: IObject[];
  route: [number, number][]
  date: string;
}