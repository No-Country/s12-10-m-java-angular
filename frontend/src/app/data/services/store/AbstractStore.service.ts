export abstract class AbstractStoreService<T, R> {
    constructor() { }

    /**
     * Devuelve un valor reactivo para una propiedad en el estado.
     * Esto se utiliza cuando el consumidor necesita la señal para
     * parte específica del estado.
     *
     * @param key - la clave de la propiedad a recuperar
     */
    public abstract select<K extends keyof T>(key: K): R;

    /**
     * Esto se utiliza para establecer un nuevo valor para una propiedad.
     * Esto se utiliza cuando se desea actualizar solo una clave del estado
     *
     * @param key  - la clave de la propiedad que se va a establecer
     * @param data - los nuevos datos a guardar
     */
    public abstract set<K extends keyof T>(key: K, data: T[K]): void;

   /**
     * Establece valores para múltiples propiedades en el "store".
     * Se utiliza cuando es necesario actualizar varias
     * propiedades o el estado completo en el "store".
     *
     * @param partialState - el estado parcial que incluye el nuevo valor a guardar
     */
    public abstract setState(partialState: Partial<T>): void;
  }
