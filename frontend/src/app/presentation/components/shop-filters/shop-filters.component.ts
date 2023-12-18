import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { Genre, Language } from 'app/data/models/book';
import { DefaultButtonComponent } from '../default-button/default-button.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FilterService } from 'app/data/services/shop/filter.service';

@Component({
  standalone: true,
  imports: [CommonModule, DefaultButtonComponent, ReactiveFormsModule],
  selector: 'shop-filters',
  templateUrl: './shop-filters.component.html',
  styleUrls: ['./shop-filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopFiltersComponent implements OnInit {
  public filterService: FilterService = inject(FilterService);

  protected filterForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      minPrice: ['', Validators.min(1)],
      maxPrice: ['', Validators.min(1)],
      minPage: ['', Validators.min(1)],
    });
  }

  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe((values) => {
      if (
        values.minPrice === null &&
        this.filterService.props.minPrice !== undefined &&
        this.filterService.props.minPrice !== null &&
        this.filterService.props.minPrice !== 0
      ) {
        this.filterService.updatePrices(undefined, values.maxPrice);
      }

      if (
        values.maxPrice === null &&
        (this.filterService.props.maxPrice !== undefined &&
          this.filterService.props.maxPrice !== null &&
          this.filterService.props.minPrice !== 0 )
      ) {
        this.filterService.updatePrices(values.minPrice, undefined);
      }

      if (
        values.minPage === null &&
        this.filterService.props.minPage !== undefined &&
        this.filterService.props.minPage !== null &&
        this.filterService.props.minPage !== 0
      ) {
        this.filterService.updateMinPageNumber(0);
      }
    });
  }

  applyGenre(genre: Genre) {
    this.filterService.updateGenre(genre);
  }

  applyLanguage(language: Language): void {
    this.filterService.updateLanguages(language);
  }

  applyPageNumber(): void {
    let pageNumber = this.filterForm.get('minPage')?.value;
    this.filterService.updateMinPageNumber(pageNumber);
  }

  applyPrice(): void {
    let minPrice = this.filterForm.get('minPrice')?.value;
    let maxPrice = this.filterForm.get('maxPrice')?.value;

    this.filterService.updatePrices(minPrice, maxPrice);
  }

  applyOutOfStock() {
    this.filterService.updateOutOfStock();
  }
}
