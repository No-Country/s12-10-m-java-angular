import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { ErrorMessageComponent } from '@presentation/components/error-message/error-message.component';
import { AdminCardComponent } from '../admin-card/admin-card.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DefaultButtonComponent } from '@presentation/components/default-button/default-button.component';
import { SpinnerComponent } from '@presentation/components/app-spinner/spinner.component';
import { GENRES, Genre, LANGUAGES, Language } from 'app/data/models/book';

@Component({
  selector: 'comple-book-modal',
  standalone: true,
  imports: [
    CommonModule,
    AdminCardComponent,
    ErrorMessageComponent,
    SpinnerComponent,
    ReactiveFormsModule,
    DefaultButtonComponent,
  ],
  templateUrl: './comple-book-modal.component.html',
  styleUrls: [
    './comple-book-modal.component.css',
    '../../../shared/form.style.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompleBookModalComponent implements OnInit {
  protected completeForm: FormGroup;

  protected GENRES: Genre[] = GENRES;
  protected LANGUAGES: Language[] = LANGUAGES;

  protected genreApplied: string[] = [];
  protected languagesApplied: string[] = [];

  constructor(private builder: FormBuilder) {
    this.completeForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.builder.group({
      author: ['', Validators.required],
      editorial: ['', Validators.required],

      price: ['', Validators.required],
      quantity: ['', Validators.required],
      pages: ['', Validators.required],

      description: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  protected applyGenre(genre: Genre) {
    if (this.genreApplied.includes(genre)) {
      let deleteIndex = this.genreApplied.indexOf(genre);
      this.genreApplied.splice(deleteIndex, 1);
    } else {
      this.genreApplied.push(genre);
    }
  }

  protected applyLanguage(language: Language) {
    if (this.languagesApplied.includes(language)) {
      let deleteIndex = this.languagesApplied.indexOf(language);
      this.languagesApplied.splice(deleteIndex, 1);
    } else {
      this.languagesApplied.push(language);
    }
  }
}
