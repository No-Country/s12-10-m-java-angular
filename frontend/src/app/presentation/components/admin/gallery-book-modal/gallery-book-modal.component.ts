import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  type OnInit,
  WritableSignal,
  signal,
} from '@angular/core';
import { DefaultButtonComponent } from '@presentation/components/default-button/default-button.component';
import { AdminCardComponent } from '../admin-card/admin-card.component';
import { BooksService } from 'app/data/services/books/books.service';
import { environment } from '../../../../../environments/environment';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Book, BookImage } from 'app/data/models/book';
import { AddState } from 'app/data/models/Admin';
import { SpinnerComponent } from '@presentation/components/app-spinner/spinner.component';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
@Component({
  selector: 'gallery-book-modal',
  standalone: true,
  imports: [
    CommonModule,
    DefaultButtonComponent,
    AdminCardComponent,
    SpinnerComponent,
  ],
  templateUrl: './gallery-book-modal.component.html',
  styleUrl: './gallery-book-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryBookModalComponent implements OnInit {
  @Output() public closeModal: EventEmitter<boolean> = new EventEmitter();

  public frontPageError: boolean = false;
  public galleryError: boolean = false;

  public sending: boolean = false;

  public frontPage: WritableSignal<BookImage> = signal({
    url: '../../../../../assets/imgs/book-placeholder.webp',
    id: 'front-nothig',
  });
  public images: WritableSignal<BookImage[]> = signal([]);

  public loadImgs: boolean[] = [];
  private fireApp: any;
  public download: any;
  constructor(public bookService: BooksService) {
    this.fireApp = initializeApp(environment.firebaseConfig);
  }

  ngOnInit(): void {
    setInterval(() => {
      console.log('front page', this.frontPage());
      console.log('front page err', this.frontPageError);
    }, 9000);
  }

  protected onFileSelected(image: any, isFrontPage: boolean) {
    const selectedFile = image.target.files[0];
    this.frontPageError = false;
    this.galleryError = false;

    if (selectedFile) {
      // Verificar el tipo de archivo
      if (!selectedFile.type.startsWith('image/')) {
        this.frontPageError = isFrontPage;
        this.galleryError = !isFrontPage;
        return;
      }

      // Verificar el tamaño del archivo (2MB máximo)
      const maxSize = 2 * 1024 * 1024; // 2MB en bytes
      if (selectedFile.size > maxSize) {
        this.frontPageError = isFrontPage;
        this.galleryError = !isFrontPage;
        return;
      }
      if (!isFrontPage) this.loadImgs.push(true);
      this.uploadFile(selectedFile, isFrontPage);

    }
  }

  private uploadFile(img: any, isFrontPage: boolean) {
    const storage = getStorage(this.fireApp);
    const ramdomRef = crypto.randomUUID();
    const imgRef = ref(storage, 'images/' + ramdomRef);

    const uploadTask = uploadBytesResumable(imgRef, img);

    let loadImgs = this.loadImgs;
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log('File upload error:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          if(isFrontPage){
            this.frontPage.update((current) => ({
            ...current,
            url: downloadURL,
            id: ramdomRef
          }));
          } else {
            loadImgs.pop();

            let actual = this.images();
            actual.push({ url: downloadURL, id: ramdomRef });
            this.images.update((current)=> (actual));
          }
        });
      }
    );
  }

  public deleteFiles(deletedImg: BookImage, isFrontPage: boolean) {
    const storage = getStorage(this.fireApp);
    const desertRef = ref(storage, 'images/' + deletedImg.id);

    deleteObject(desertRef)
      .then(() => {
        console.log('Delete ref imge in firebase');
      })
      .catch((error) => {
        console.log('An error has occurred');
      });

    if (!isFrontPage) {
      let actual = this.images();
      let deleteIndex = actual.indexOf(deletedImg);
      actual.splice(deleteIndex, 1);
      this.images.update((current) => actual);
    } else {
      this.frontPage.update((current) => ({
        url: '../../../../../assets/imgs/book-placeholder.webp',
        id: 'front-nothig',
      }));
    }
  }

  public submit() {
    let sending = this.sending;
    sending = !sending;

    this.bookService.createdBook.stateAddImg.state = AddState.SENDING;

    this.bookService.createdBook.book.urlImages[0] = this.frontPage()
      ?.url as string;
    this.images().forEach((img) => {
      this.bookService.createdBook.book.urlImages.push(img.url);
    });
    //Hay que conectar con el back la funcion updateImg
    this.bookService.updateImg().subscribe({
      next: (res: any) => {
        sending = !sending;
        this.bookService.createdBook.stateComplete.state = AddState.COMPLETE;

        this.closeModal.emit(true);
      },
      error: (err: any) => {
        this.bookService.createdBook.stateComplete.state = AddState.WAITING;
        sending = !sending;
      },
    });
  }
}
