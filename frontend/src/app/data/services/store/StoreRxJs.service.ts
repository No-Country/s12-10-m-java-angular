import { BehaviorSubject, Observable, distinctUntilChanged, map } from "rxjs";
import { AbstractStoreService } from "./AbstractStore.service";


export class RxjsStoreService<T> extends AbstractStoreService< T, Observable<T[any]> > {
    private subject: BehaviorSubject<T>;
    public state$: Observable<T>;
    
    constructor(initialValue: T) {
        super();
        this.subject = new BehaviorSubject<T>(initialValue);
        this.state$ = this.subject.asObservable();
    }

    public select<K extends keyof T>(key: K): Observable<T[K]> {
        return this.state$.pipe(
          map(state => state[key]),
          distinctUntilChanged()
        );
    }
    
    public set<K extends keyof T>(key: K, data: T[K]): void {
        this.subject.next({ ...this.subject.value, [key]: data });
    }

    public setState(partialState: Partial<T>): void {
        this.subject.next({ ...this.subject.value, ...partialState });
    }
}