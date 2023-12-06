import { Signal, WritableSignal, computed, signal } from "@angular/core";
import { AbstractStoreService } from "./AbstractStore.service";


export class SignalsStoreService<T> extends AbstractStoreService< T, Signal<T[any]> >{

    public state: WritableSignal<T>;
    
    constructor(initialValue: T) {
      super();
      this.state = signal(initialValue);
    }
    
    public select<K extends keyof T>(key: K): Signal<T[K]> {
      return computed(() => this.state()[key]);
    }
    
    public set<K extends keyof T>(key: K, data: T[K]): void {
      this.state.update((currentValue) => ({ ...currentValue, [key]: data }));
    }
    
 
    public setState(partialState: Partial<T> | null): void {
      this.state.update((currentValue) => ({ ...currentValue, ...partialState }));
    }
  }