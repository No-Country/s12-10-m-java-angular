import { Injectable } from '@angular/core';
import { ToastModel, ToastPosition, ToastProps, ToastType } from 'app/data/models/toast.model';
import { SignalsStoreService } from '../store/StoreSignals.service';

@Injectable()
export class ToastService extends SignalsStoreService<ToastProps>{

  constructor() { 
    super({} as ToastProps);
  }

  /**
   * Remueve un toast de la lista de toasts
   * 
   * @param ID - ID del toast
   */
  public remove(ID: string | number): void{
    this.state.update((currentValue)=> {
      const index = currentValue.toasts.findIndex((val: any) => val.ID === ID);
      if(index !== -1) currentValue.toasts.splice(index, 1);
      return currentValue;
    });
  }

  /**
   * Remueve el primer Toast en cola en la cola de toast
   * 
   */
  private removeFirst(): void{
    this.state.update((currentValue)=> {
      currentValue.toasts.shift();
      return currentValue;
    });
  }

  private show(title: string, message: string, seconds: number, type: ToastType, position: ToastPosition): void{
    if(!seconds || seconds <= 0) seconds = 5;

    const toastModel: ToastModel ={
      ID: 'a'+crypto.randomUUID(),
      title: title,
      message: message, 
      visible: true, 
      type: type , 
      seconds: seconds
    }; 
    let toasts = this.select("toasts")();
    if (!toasts) toasts = [];
    if(toasts.length >= 6) this.removeFirst();
    
    toasts.push(toastModel);
    this.set("position", position);
    this.set("toasts", toasts);

    const autoClose = seconds * 1000;
    setTimeout(() => {
      const index = toasts.findIndex((val: any) => val.ID === toastModel.ID);
      if(index !== -1) toasts.splice(index, 1);
      this.set("toasts", toasts);
    }, autoClose);
  }

  public info(title: string, message: string, seconds: number = 100, position: ToastPosition = ToastPosition.TOP_RIGHT): void{
    this.show(title, message, seconds, ToastType.INFO, position);
  }

  public success(title: string, message: string, seconds: number = 100, position: ToastPosition = ToastPosition.TOP_RIGHT): void{

    this.show(title, message, seconds, ToastType.SUCCESS, position);

  }

  public waring(title: string, message: string, seconds: number = 100, position: ToastPosition = ToastPosition.TOP_RIGHT): void{

    this.show(title, message, seconds, ToastType.WARNING, position);
  }

  public error(title: string, message: string, seconds: number = 100, position: ToastPosition = ToastPosition.TOP_RIGHT): void{

    this.show(title, message, seconds, ToastType.ERROR, position);
  }

}
