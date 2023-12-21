import { Injectable } from "@angular/core";
import { Categories } from "../models/categories";

@Injectable({
  providedIn: 'root'
})
export class CategoryArray {

  constructor() { }

  getCategory(): any {

    var category = new Array<Categories>();

    category = [
      new Categories( 1 ,
         "Self Help" ,
         "/shop",
         "/assets/Icons-category/autoayuda.webp"),
      new Categories( 2 ,
         "Comedy" ,
         "/shop",
         "/assets/Icons-category/comedy.webp"),
      new Categories( 3 ,
         "Fantasy" ,
         "/shop",
         "/assets/Icons-category/fantasia.webp"),
      new Categories( 4 ,
         "Fiction" ,
         "/shop",
         "/assets/Icons-category/ficcion.webp"),
      new Categories(5,
         "History" ,
         "/shop",
         "/assets/Icons-category/historia.webp"),
      new Categories( 6 ,
         "Horror" ,
         "/shop",
         "/assets/Icons-category/horror.webp"),
      new Categories( 7 ,
         "Poetry" ,
         "/shop",
         "/assets/Icons-category/poesia.webp"),
      new Categories( 8 ,
         "Police" ,
         "/shop",
         "/assets/Icons-category/policial.webp"),
      new Categories( 9 ,
         "Romance" ,
         "/shop",
         "/assets/Icons-category/romance.webp"),
      new Categories( 9 ,
         "Drama" ,
         "/shop",
         "/assets/Icons-category/drama.webp"),

    ];
    return category;
  }

  detailCategory():any{

  }
}
