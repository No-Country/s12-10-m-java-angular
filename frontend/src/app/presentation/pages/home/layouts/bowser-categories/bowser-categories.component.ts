import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CategoryArray } from 'app/data/mocks/categoriesArray';
import { Categories } from 'app/data/models/categories';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  selector: 'bowser-categories-layout',
  templateUrl: './bowser-categories.component.html',
  styleUrls: ['./bowser-categories.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BowserCategoriesComponent implements OnInit {
  public categories!: Array<Categories>;
  public page!:number;

  constructor(
    private _service: CategoryArray,
  ) { }

  ngOnInit(): void {
    this.categories = this._service.getCategory();
  }
  data = [];
  selectedItem = null;

  setSelectedItem(item: null) {
    this.selectedItem = item;
  }

}
