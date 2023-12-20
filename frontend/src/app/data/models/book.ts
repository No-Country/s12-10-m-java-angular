import { AddModal, AddState } from "./Admin";

export interface Book {
    idBook: number | string;
    title: string;
    price: number;
    pages: number;
    publicationDate:string;
    quantityAvailable: number;
    salesAmount:number;
    rating:number;
    description: string;
    collection:string;
    genre: string;
    language:string;
    author:string;
    nameEditorial:string;
    urlImages:string[];
    isbn:number;
}

export interface BookDetail {
    id: string | number;
    author: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

export interface BookFilterProps {
  page: number;
  size: number;

  searchText?: string;
  minPrice?: number;
  maxPrice?: number;

  minPage?: number;
  genre?: string[];

  language?: string[];
  searchEvenNotAvailable: number;

  orderBy: string;
  ascOrDesc: string;
}

export interface BookPagination {
  content: BookDetail[];
  totalPages: number;
  totalElements: number;
  isLast: boolean;
}

export enum Genre {
  DEFAULT = '',
  HORROR = 'Horror',
  FANTASY = 'Fantasy',
  ROMANCE = 'Romance',
  POETRY = 'Poetry',
  COMEDY = 'Comedy',
  SCIENCE_FICTION = 'Science Fiction',
  SELF_HELP = 'Self Help',
  DRAMA = 'Drama',
  HISTORY = 'History',
  POLITICAL = 'Political',
  THRILLER = 'Thriller',
  BIOGRAPHY = 'Biography',
  MYSTERY = 'Mystery',
  NON_FICTION = 'Non Fiction',
  TRAVEL = 'Travel',
  POLICY = 'Policy',
};

export enum Language {
    SPANISH = "Spanish",
    ENGLISH = "English",
    PORTUGUESE = "Portuguese",
    GERMAN = "German",
    FRENCH = "French",
    ITALIAN = "Italian",
};

export interface BookCreation {
  book: Book;
  stateCreate: AddModal;
  stateComplete: AddModal;
  stateAddImg: AddModal;
  isUpdate?: boolean;
}

export interface BookImage {
  url: string;
  id: string;
};

export interface BookImages {
  frontPage: BookImage;
  galleryImages: BookImage[];
}

export const GENRES: Genre[] = [
  Genre.HORROR,
  Genre.SCIENCE_FICTION,
  Genre.FANTASY,
  Genre.POETRY,
  Genre.ROMANCE,
  Genre.SELF_HELP,
  Genre.POLICY,
  Genre.HISTORY,
  Genre.COMEDY,
  Genre.DRAMA,
];

export const LANGUAGES: Language[] = [
    Language.SPANISH, Language.ENGLISH, Language.PORTUGUESE, Language.FRENCH, Language.ITALIAN, Language.GERMAN
];
