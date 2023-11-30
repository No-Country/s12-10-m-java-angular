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
}