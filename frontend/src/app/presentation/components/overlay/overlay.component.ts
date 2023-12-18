import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'overlay',
  standalone: true,
  imports: [],
  template: `<div class="overlay"></div>`,
  styles: `
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      min-width: 100dvw;
      width: 100%;
      min-height: 100dvw;
      height: 100%;
      background: rgba(0, 0, 0, 0.45);
      z-index: 100;
      overflow: hidden;
}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayComponent implements OnInit {
  ngOnInit(): void {}
}
