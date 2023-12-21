export enum Order{
    ASC = "asc", DESC = "desc"
};

export interface Sorting {
    field: string;
    code: string;
    order: Order;
};

export const SORTING_VALUES: Sorting[] = [
    { field: 'Alphabetically A-z', code: 'alphabetically-1', order: Order.ASC},
    { field: 'Alphabetically Z-a', code: 'alphabetically-2', order: Order.DESC},
    { field: 'Publication Date', code: 'publicationDate', order: Order.ASC},
    { field: 'Trending Books', code: 'price', order: Order.ASC},
];
