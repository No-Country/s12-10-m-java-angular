import { Injectable } from '@angular/core';
import { SORTING_VALUES, Sorting } from 'app/data/models/Sort';
import {
  BookFilterProps,
  GENRES,
  Genre,
  LANGUAGES,
  Language,
} from 'app/data/models/book';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class FilterService {
  public props: BookFilterProps;
  public updateResultList!: BehaviorSubject<BookFilterProps>;
  public SORT: Sorting[];

  public readonly GENRES: Genre[] = GENRES;
  public readonly LANGUAGES: Language[] = LANGUAGES;

  public genreApplied: Genre[];
  public languageApplied: Language[];
  public sortApplied: Sorting;

  constructor() {
    this.props = {} as BookFilterProps;
    this.genreApplied = [];
    this.SORT = SORTING_VALUES;
    this.languageApplied = [];
    this.sortApplied = {} as Sorting;
  }

  public firstSearch() {
    this.updateResultList.next(this.props);
  }

  public initFilterProps(searchText: string): void {
    const initProps = {
      page: 0,
      size: 9,
      searchText: searchText,
      orderBy: this.SORT[0].code.startsWith('alpha')
        ? 'alphabetically'
        : this.SORT[0].code,
      ascOrDesc: this.SORT[0].order,
      searchEvenNotAvailable: 0,
      genre:
        this.genreApplied.length > 0 &&
        this.genreApplied[0].valueOf() !== Genre.DEFAULT.valueOf()
          ? this.genreApplied
          : [],
    } as BookFilterProps;

    if (this.genreApplied.includes(Genre.DEFAULT))
      this.updateGenre(this.genreApplied[0]);
    this.updateCacheProps(initProps);

    this.sortApplied = this.SORT[0];
    this.props = initProps;



    if(this.updateResultList !== undefined && this.updateResultList !== null){
      this.updateResultList.next(this.props);
    } else {
      this.updateResultList = new BehaviorSubject<BookFilterProps>(this.props);
    }
  }

  public deleteCacheProps() {
    sessionStorage.removeItem('props');
    this.props = {} as BookFilterProps;
  }

  public updateCacheProps(props: BookFilterProps) {
    sessionStorage.setItem('props', JSON.stringify(props));
  }

  public verifyGenre(genreParam: string | undefined) {
    if (genreParam !== '' && genreParam !== undefined && genreParam) {
      let { genre } = this.GENRES.reduce(
        (genreSearch, item, currentIndex) => {
          if (item.valueOf() === genreParam) genreSearch.genre = item;
          return genreSearch;
        },
        { genre: Genre.DEFAULT }
      );
      if (genre !== Genre.DEFAULT && genre) this.genreApplied.push(genre);
    }
  }

  public verifySorting(sortParam: string | undefined): void {
    if (sortParam !== '' && sortParam !== undefined && sortParam !== null) {
      let { index, element } = this.SORT.reduce(
        (acc, item, currentIndex) => {
          if (item.code === sortParam) {
            acc.index = currentIndex;
            acc.element = item;
          }
          return acc;
        },
        { index: -1, element: {} as Sorting }
      );

      if (index !== -1) {
        this.SORT = [
          element,
          ...this.SORT.slice(0, index),
          ...this.SORT.slice(index + 1),
        ];
      }
    }
  }

  public updateSort(sort: Sorting): void {
    this.props.ascOrDesc = sort.order.valueOf();

    if (sort.code.startsWith('alpha'))
      this.props.orderBy = sort.code.substring(0, sort.code.lastIndexOf('-'));
    else this.props.orderBy = sort.code;

    this.sortApplied = sort;
    this.props.page = 9;
    this.props.searchEvenNotAvailable = 0;
    this.updateCacheProps(this.props);
    this.updateResultList.next(this.props);
  }

  public updateGenre(genre: Genre): void {
    if (this.genreApplied.length === 0 || !this.genreApplied.includes(genre)) {
      this.genreApplied.push(genre);
    } else {
      let deleteIndex = this.genreApplied.indexOf(genre);
      this.genreApplied.splice(deleteIndex, 1);
    }

    this.props.genre =
      this.genreApplied.length > 0 ? this.genreApplied : ([] as Genre[]);

    this.props.page = 9;
    this.props.searchEvenNotAvailable = 0;
    this.updateCacheProps(this.props);
    this.updateResultList.next(this.props);
  }

  public updateLanguages(language: Language): void {
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

    this.props.page = 9;
    this.props.searchEvenNotAvailable = 0;
    this.updateResultList.next(this.props);
  }

  public updateMinPageNumber(pageNumber: number): void {
    this.props.minPage = pageNumber;
    this.props.page = 9;
    this.props.searchEvenNotAvailable = 0;
    this.updateCacheProps(this.props);
    this.updateResultList.next(this.props);
  }

  public updatePrices(minPrice: number, maxPrice: number): void {
    maxPrice !== undefined &&
      maxPrice !== null &&
      (this.props.maxPrice = maxPrice);

    minPrice !== undefined &&
      minPrice !== null &&
      (this.props.minPrice = minPrice);

    this.props.page = 9;
    this.props.searchEvenNotAvailable = 0;

    this.updateCacheProps(this.props);
    this.updateResultList.next(this.props);
  }

  public updateOutOfStock(): void {
    this.props.searchEvenNotAvailable =
      this.props.searchEvenNotAvailable === 1 ? 0 : 1;

    this.props.page = 9;
    this.props.searchEvenNotAvailable = 0;

    this.updateCacheProps(this.props);
    this.updateResultList.next(this.props);
  }

  public cleanFilters(): void {
    this.props.genre = undefined;
    this.props.language = undefined;

    this.props.ascOrDesc = 'asc';

    this.props.minPage = undefined;
    this.props.minPrice = undefined;
    this.props.maxPrice = undefined;

    this.props.page = 9;
    this.props.searchEvenNotAvailable = 0;
    this.props.orderBy = 'alphabetically';

    this.genreApplied = [];
    this.languageApplied = [];
    this.sortApplied = this.SORT[1];

    this.updateCacheProps(this.props);
    this.updateResultList.next(this.props);
  }

  public updatePagination(page: number) {
    this.props.page = page-1;

    this.updateCacheProps(this.props);
    this.updateResultList.next(this.props);
  }
}
