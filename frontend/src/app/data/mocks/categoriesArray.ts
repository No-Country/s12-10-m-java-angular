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
         "",
         "/assets/Icons-category/autoayuda.webp"),
      new Categories( 2 ,
         "Comedy" ,
         "",
         "/assets/Icons-category/comedy.webp"),
      new Categories( 3 ,
         "Fantasy" ,
         "",
         "/assets/Icons-category/fantasia.webp"),
      new Categories( 4 ,
         "Fiction" ,
         "",
         "/assets/Icons-category/ficcion.webp"),
      new Categories(5,
         "History" ,
         "",
         "/assets/Icons-category/historia.webp"),
      new Categories( 6 ,
         "Horror" ,
         "",
         "/assets/Icons-category/horror.webp"),
      new Categories( 7 ,
         "Poetry" ,
         "",
         "/assets/Icons-category/poesia.webp"),
      new Categories( 8 ,
         "Police" ,
         "",
         "/assets/Icons-category/policial.webp"),
      new Categories( 9 ,
         "Romance" ,
         "",
         "/assets/Icons-category/romance.webp"),
      new Categories( 9 ,
         "Drama" ,
         "",
         "/assets/Icons-category/drama.webp"),
      
    ];
    return category;
  }

  detailCategory():any{
    
  }
}