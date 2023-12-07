import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sorting } from 'app/data/models/Sort';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'sort-box',
  templateUrl: './sort-box.component.html',
  styleUrls: ['./sort-box.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortBoxComponent implements OnInit {
  @Output() public sort: EventEmitter<Sorting> = new EventEmitter<Sorting>();
  @Input() public options: Sorting[] = [];
  @Input() public selectedOption: Sorting = {} as Sorting;
  protected viewSortOptions = false;
  constructor() { }

  ngOnInit(): void {
  }

  updateOption(sort: Sorting){
    this.selectedOption = sort;
    this.viewSortOptions = false;
    this.sort.emit(this.selectedOption);
  }
}
