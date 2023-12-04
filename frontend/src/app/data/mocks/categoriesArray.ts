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
         "/assets/Icons-category/autoayuda.png"),
      new Categories( 2 ,
         "Comedy" ,
         "",
         "/assets/Icons-category/comedy.png"),
      new Categories( 3 ,
         "Fantasy" ,
         "",
         "/assets/Icons-category/fantasia.png"),
      new Categories( 4 ,
         "Fiction" ,
         "",
         "/assets/Icons-category/ficcion.png"),
      new Categories(5,
         "History" ,
         "",
         "/assets/Icons-category/historia.png"),
      new Categories( 6 ,
         "Horror" ,
         "",
         "/assets/Icons-category/horror.png"),
      new Categories( 7 ,
         "Poetry" ,
         "",
         "/assets/Icons-category/poesia.png"),
      new Categories( 8 ,
         "Police" ,
         "",
         "/assets/Icons-category/policial.png"),
      new Categories( 9 ,
         "Romance" ,
         "",
         "/assets/Icons-category/romance.png"),
      new Categories( 9 ,
         "Drama" ,
         "",
         "/assets/Icons-category/drama.png"),
      
    ];
    return category;
  }

  detailCategory():any{
    
  }
}