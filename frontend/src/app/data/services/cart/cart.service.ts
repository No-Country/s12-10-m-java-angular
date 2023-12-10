import { Injectable, OnInit } from '@angular/core';
import { BookDetail } from 'app/data/models/book';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public booksOnCart: { book: BookDetail, quantity: number }[]=[];

  //como no hay componentes que requieran la lista de booksOnCart y vivan simultaneamente por ahora no serian necesarios los signals

  constructor() {
    // window.addEventListener('beforeunload', (event) => {
    //   localStorage.setItem('booksOnCart', JSON.stringify(this.booksOnCart));
    // }); probar para economizar las veces que se guarda en localstorage
    this.bringCartOfBack()
    localStorage.setItem('booksOnCart', JSON.stringify(this.booksOnCart));//se ejecuta cuando se crea una instancia del servicio
   }


  private bringCartOfBack(){
    let booksOnCartOnString = localStorage.getItem('booksOnCart');//simulado hasta tener el back
    this.booksOnCart = booksOnCartOnString? JSON.parse(booksOnCartOnString) :[];
  }

  bringCartOfServiceWithQuantity(): { book: BookDetail, quantity: number }[]{
    return this.booksOnCart
  }

  bringCartOfService(): BookDetail[]{
    return this.booksOnCart.map(item => item.book);
  }

  addBookToCart(book: BookDetail):void{
    this.booksOnCart.push({book: book, quantity: 1})
    console.log(book, "se agrego este libro")
    this.updateLocalStorage(this.booksOnCart)
  }

  deleteBookToCart(bookToDelete: BookDetail):void{
    this.booksOnCart = this.booksOnCart.filter(bookAndQuantity => bookAndQuantity.book.id !== bookToDelete.id);
    this.updateLocalStorage(this.booksOnCart)
  }

  increaseBook(bookToIncrease: BookDetail):void{
    const foundBook = this.booksOnCart.find(item => item.book.id === bookToIncrease.id);
    if (foundBook) {
      foundBook.quantity += 1;
    }
    this.updateLocalStorage(this.booksOnCart)
  }

  decreaseBook(bookToDecrease: BookDetail):void{
    const foundBook = this.booksOnCart.find(item => item.book.id === bookToDecrease.id);
    if (foundBook) {
      foundBook.quantity -= 1;
    }
    this.updateLocalStorage(this.booksOnCart)
  }

  changeQuantityTo(bookTochangeQuantity: { book: BookDetail, quantity: number }):void{
    const foundBook = this.booksOnCart.find(item => item.book.id === bookTochangeQuantity.book.id);
    if (foundBook) {
      foundBook.quantity = bookTochangeQuantity.quantity;
      console.log(foundBook.quantity,'cambio de numero a ')
    }
    this.updateLocalStorage(this.booksOnCart)

  }

  updateLocalStorage(booksOnCart: { book: BookDetail, quantity: number }[]){
    localStorage.setItem('booksOnCart', JSON.stringify(booksOnCart));
  }

}
