import { Categories } from '../ts/enums';
import { IObject } from '../ts/interfaces';

export const Objects: IObject[] = [
  {
    id: 1,
    title: 'Stadion Odry Opole',
    description: 'Najlepsze miejsce do zwiedzania',
    phone: '57 222 72 12',
    email: 'fajnemiejsce@gmail.com',
    category: Categories.ROZRYWKA,
    coordinates: [50.67705830189504, 17.932003400937973],
    imgUrl:
      'https://odraopole.pl/wp-content/uploads/2019/01/odra_siarka_stadion-e1521573323355-1-300x225.jpg',
  },
  {
    id: 2,
    title: 'ZOO Opole',
    description: 'ZOO Opole',
    phone: '22 221 33 21',
    email: 'zooopole@gmail.com',
    category: Categories.PARKI,
    coordinates: [50.65968668224407, 17.92377490933834],
    imgUrl:
      'https://atrakcje.info.pl/web/files/travel/e20f3a4e4102d2beffb7ea4524ae93ccopole-zoo.JPG',
  },
  {
    id: 3,
    title: 'Park Nadodrzański',
    description: 'Park w Opolu',
    phone: '12 321 32 12',
    email: 'parkopo@gmail.com',
    category: Categories.PARKI,
    coordinates: [50.66131918348528, 17.918126239701888],
    imgUrl: 'https://radio.opole.pl//public/121/2017/121_149604728914.jpg',
  },
  {
    id: 4,
    title: 'Hotel Mercury',
    description: 'Jakiś hotel',
    phone: '12 321 32 12',
    email: 'parkopo@gmail.com',
    category: Categories.NOCLEGI,
    coordinates: [50.66721431123094, 17.927206368137547],
    imgUrl: 'https://meteor-turystyka.pl/images/base/2/1578/12187_40.jpg',
  },
  {
    id: 5,
    title: 'Galeria Solaris',
    description: 'Galeria handlowa',
    phone: '12 321 32 12',
    email: 'parkopo@gmail.com',
    category: Categories.HANDEL,
    coordinates: [50.673329439288906, 17.926613371482905],
    imgUrl:
      'https://opolska360.pl/wp-content/uploads/2023/01/Ozimska-Park-w-Opolu-1120x570.jpg',
  },
  {
    id: 6,
    title: 'Restauracja na wzgórzu',
    description: 'Restauracja',
    phone: '12 321 32 12',
    email: 'parkopo@gmail.com',
    category: Categories.GASTRONOMIA,
    coordinates: [50.668546493233805, 17.92210716456905],
    imgUrl:
      'https://opole-news.pl/wp-content/uploads/2021/11/czeska_gospoda.jpg',
  },
  {
    id: 7,
    title: 'Teatr Kochanowskiego',
    description: 'Placehold',
    phone: '12 321 32 12',
    email: 'parkopo@gmail.com',
    category: Categories.ROZRYWKA,
    coordinates: [50.66655956910213, 17.922351760468285],
    imgUrl:
      'https://www.opole.pl/sites/default/files/styles/vphoto_gallery_large/public/galerie/Atrakcje/Teatr%20Kochanowskiego%20-%20scena.jpg?itok=7ayseLz5',
  },
];
