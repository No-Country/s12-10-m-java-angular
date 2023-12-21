import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryArray } from 'app/data/mocks/categoriesArray';
import { Categories } from 'app/data/models/categories';
import { ResizeService } from 'app/data/services/pagination/pagination.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, RouterLink],
  selector: 'bowser-categories-layout',
  templateUrl: './bowser-categories.component.html',
  styleUrls: ['./bowser-categories.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BowserCategoriesComponent implements OnInit {
  public categories!: Array<Categories>;
  public page!:number;
  public pageSize: number;
  @Input() id!: string;
  @Input() maxSize!: number;
  @Output() pageChange!: EventEmitter<number>;
  @Output() pageBoundsCorrection!: EventEmitter<number>;

  constructor(
    private _service: CategoryArray,
    private resizeService: ResizeService
  ) {
    this.pageSize = this.calculatePageSize(window.innerWidth);
  }


  ngOnInit(): void {
    this.categories = this._service.getCategory();

    this.resizeService.onResize().subscribe((screenWidth) => {
      this.pageSize = this.calculatePageSize(screenWidth);
      console.log(this.pageSize)
    });
  }
  private calculatePageSize(screenWidth: number): number {
    if (screenWidth <= 570) {
      return 2;
    } else if (screenWidth <= 1300) {
      return 3;
    } else {
      return 5;
    }
  }

  data = [];
  selectedItem = null;

  setSelectedItem(item: null) {
    this.selectedItem = item;
  }

}
