export interface Book {
    idBook: number;
    title: string;
    price: number;
    pages: number;
    publicationDate:string;
    quantityAvaiable: number;
    salesAmount:number;
    rating:number;
    description: string;
    collection:string;
    genre: string;
    lenguage:string;
    author:string;
    nameEditorial:string;
    urlImages:string;
    isbn:number;
}

export interface BookDetail {
    ID: string | number;
    author: string;
    name: string;
    price: number;
    img: string;
    description: string;
}