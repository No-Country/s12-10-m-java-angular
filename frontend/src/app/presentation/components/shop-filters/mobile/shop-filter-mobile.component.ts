import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Genre, Language } from 'app/data/models/book';
import { FilterService } from 'app/data/services/shop/filter.service';

@Component({
  selector: 'shop-filter-mobile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './shop-filter-mobile.component.html',
  styleUrl: './shop-filter-mobile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopFilterMobileComponent implements OnInit {
  public filterService: FilterService = inject(FilterService);
  protected filterForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      minPrice: ['', Validators.min(1)],
      maxPrice: ['', Validators.min(1)],
      minPage: ['', Validators.min(1)],
    });
  }

  ngOnInit(): void {}

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

  clean(){
    this.filterForm.reset();
    this.filterService.cleanFilters();
  }

  test(){
    alert("Probar test");
  }
}
