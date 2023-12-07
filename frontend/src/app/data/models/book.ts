export interface Book {
    idBook: number;
    status: number;
    ISBN: number;
    title: string;
    genre: string;
    description: string;
    pages: number;
    autor: string;
    editorial: string;
    price: number;
    quantity: number;
}

export interface BookDetail {
    ID: string | number;
    author: string;
    name: string;
    price: number;
    img: string;
    description: string;
}

export interface BookFilterProps {
  page: number;
  size: number;

  minPrice?: number;
  maxPrice?: number;

  minPage?: number;
  genre?: string;

  language?: string;
  searchEvenNotAvailable: boolean;

  orderBy: string;
  ascOrDesc: string;
}

export enum Genre {
    HORROR = "Horror",
    FANTASY = "Fantasy",
    ROMANCE = "Romance",
    POETRY = "Poetry",
    COMEDY = "Comedy",
    SCIENCE_FICTION = "Science Fiction",
    SELF_HELP = "Self Help",
    DRAMA = "Drama",
    HISTORY = "History",
    POLITICAL = "Political",
    THRILLER = "Thriller",
    BIOGRAPHY = "Biography",
    MYSTERY = "Mystery",
    NON_FICTION = "Non Fiction",
    TRAVEL = "Travel",
    POLICY = "Policy"
};

export enum Language {
    SPANISH = "Spanish",
    ENGLISH = "English",
    PORTUGUESE = "Portuguese",
    GERMAN = "German",
    FRENCH = "French",
    ITALIAN = "Italian",
};

export const GENRES: Genre[] = [
    Genre.HORROR, Genre.SCIENCE_FICTION, Genre.FANTASY, Genre.POETRY, Genre.ROMANCE, Genre.SELF_HELP, Genre.POLICY, Genre.HISTORY, Genre.COMEDY,
];

export const LANGUAGES: Language[] = [
    Language.SPANISH, Language.ENGLISH, Language.PORTUGUESE, Language.FRENCH, Language.ITALIAN, Language.GERMAN
];
