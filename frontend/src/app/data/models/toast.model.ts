export class ToastModel{
    public visible: boolean;

    public type: ToastType;
    public message: string;
    public title: string;
    public position: ToastPosition;

    constructor(visible: boolean){
        this.visible = visible;

        this.type = ToastType.INFO;
        this.position = ToastPosition.TOP_RIGHT;
        this.message = "";
        this.title = ""; 
    }
}

export enum ToastPosition{
    TOP_RIGHT = 'top-right',
    TOP_LEFT = 'top-left',
    CENTER = 'center',
}
export enum ToastType {
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error'
}