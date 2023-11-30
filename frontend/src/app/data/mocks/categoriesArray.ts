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
         "autoAyuda" ,
         "",
         "/assets/Icons-category/autoayuda.png"),
      new Categories( 2 ,
         "comedia" ,
         "",
         "/assets/Icons-category/comedy.png"),
      new Categories( 3 ,
         "fantasia" ,
         "",
         "/assets/Icons-category/fantasia.png"),
      new Categories( 4 ,
         "ficcion" ,
         "",
         "/assets/Icons-category/ficcion.png"),
      new Categories(5,
         "historia" ,
         "",
         "/assets/Icons-category/historia.png"),
      new Categories( 6 ,
         "horror" ,
         "",
         "/assets/Icons-category/horror.png"),
      new Categories( 7 ,
         "poesia" ,
         "",
         "/assets/Icons-category/poesia.png"),
      new Categories( 8 ,
         "policial" ,
         "",
         "/assets/Icons-category/policial.png"),
      new Categories( 9 ,
         "romance" ,
         "",
         "/assets/Icons-category/romance.png"),
      
    ];
    return category;
  }

  detailCategory():any{
    
  }
}