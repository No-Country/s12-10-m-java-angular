import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  BookFilterProps,
  GENRES,
  Genre,
  LANGUAGES,
  Language,
} from 'app/data/models/book';
import { DefaultButtonComponent } from '../default-button/default-button.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, DefaultButtonComponent, ReactiveFormsModule],
  selector: 'shop-filters',
  templateUrl: './shop-filters.component.html',
  styleUrls: ['./shop-filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopFiltersComponent implements OnInit {
  @Output() public filterProps: EventEmitter<BookFilterProps>;

  @Input() public initialGenreFilter: Genre = Genre.DEFAULT;

  protected readonly GENRES: Genre[] = GENRES;
  protected readonly LANGUAGES: Language[] = LANGUAGES;
  protected genresApplied: Genre[] = [] as Genre[];
  protected languageApplied: Language[] = [] as Language[];
  protected filterForm: FormGroup;
  protected props: BookFilterProps;

  constructor(private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      minPrice: ['', Validators.min(1)],
      maxPrice: ['', Validators.min(1)],
      minPage: ['', Validators.min(1)],
    });
    this.filterProps = new EventEmitter();
    this.props = {} as BookFilterProps;
  }

  ngOnInit(): void {
      this.props = JSON.parse(
          sessionStorage.getItem('props') as string
        ) as BookFilterProps;
    console.log('props in cons', this.props);


    if (
      this.initialGenreFilter &&
      this.initialGenreFilter.valueOf() !== Genre.DEFAULT.valueOf()
    ) {
      this.genresApplied.push(this.initialGenreFilter);
    }
  }

  applyGenre(genre: Genre) {
    console.log("genre:",genre);
    if (
      this.genresApplied.length === 0 ||
      !this.genresApplied.includes(genre)
    ) {
      this.genresApplied.push(genre);
    } else {
      let deleteIndex = this.genresApplied.indexOf(genre);
      this.genresApplied.splice(deleteIndex, 1);
    }

    this.props.genre =
      this.genresApplied.length > 0 ? this.genresApplied : ([] as Genre[]);

    this.sendProps();
  }
  applyLanguage(language: Language): void {
    if (!this.languageApplied.includes(language)) {
      this.languageApplied.push(language);
    } else {
      let deleteIndex = this.languageApplied.indexOf(language);
      this.languageApplied.splice(deleteIndex, 1);
    }

    this.props.language =
      this.languageApplied.length > 0
        ? this.languageApplied
        : ([] as Language[]);

    this.sendProps();
  }

  applyPageNumber(): void {
    let pageNumber = this.filterForm.get('minPage')?.value;
    this.props.minPage = pageNumber;
    this.filterForm.get('minPage')?.setValue('');
    this.sendProps();
  }

  applyPrice(): void {
    let minPrice = this.filterForm.get('minPrice')?.value;
    let maxPrice = this.filterForm.get('maxPrice')?.value;

    maxPrice !== undefined &&
      maxPrice !== null &&
      (this.props.maxPrice = maxPrice);
    minPrice !== undefined &&
      minPrice !== null &&
      (this.props.minPrice = minPrice);

    this.filterForm.get('minPrice')?.setValue('');

    this.filterForm.get('maxPrice')?.setValue('');

    this.sendProps();
  }

  applyOutOfStock() {
    this.props.searchEvenNotAvailable =
      this.props.searchEvenNotAvailable === 1 ? 0 : 1;

    this.sendProps();
  }

  sendProps() {
    sessionStorage.setItem('props', JSON.stringify(this.props));
    this.filterProps.emit(this.props);
  }
}