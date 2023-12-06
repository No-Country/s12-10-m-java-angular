import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {
  private resizeEvent = new EventEmitter<number>();

  constructor() {
    this.addResizeListener();
  }

  private addResizeListener(): void {
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  private handleResize(): void {
    const screenWidth = window.innerWidth;
    this.resizeEvent.emit(screenWidth);
  }

  onResize(): EventEmitter<number> {
    return this.resizeEvent;
  }
}
