import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendService } from '../services/backend.service';
import { BookOfflineService } from '../services/book-offline.service';
import { OnlineOfflineService } from '../services/online-offline.service';
import { Book } from '../books/books.component';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  public bookId: string;
  public title: string = '';
  public isbn: string = '';
  public author: string = '';
  public picture: string = '';
  public price: number = 0;
  static URL_REGEXP = /^http(s*):\/\/.+/;
  static BOOKS_PAGE = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private backendService: BackendService,
    private bookOfflineService: BookOfflineService,
    private onlineOfflineService: OnlineOfflineService,
  ) { }

  ngOnInit() {
    // Get the url pramater
    this.bookId = this.route.snapshot.paramMap.get('id');
    // Load the book data from the local database if a book id is passed
    if (this.bookId) this.bookOfflineService.fecthSingleItemFromRDb(this.bookId).then((book) => {
      if (book) {
        this.title = book.title;
        this.isbn = book.isbn;
        this.author = book.author;
        this.price = book.price;
        this.picture = book.picture;
      } else {
        this.bookId = null;
        // Show an error message and navigate back to the main page
        this.snackBar.open("The book does not exist", 'Close', { duration: 2000 });
        this.router.navigate([BookFormComponent.BOOKS_PAGE]);
      }
    },
      (error) => console.error(error));
  }

  handleSave() {
    let message: string;
    // Validate the form data before saving the data
    if (this.title.trim() === '' || this.isbn.trim() === '' || this.author.trim() === '')
      message = 'Please finish the form.';
    else if (!BookFormComponent.URL_REGEXP.test(this.picture))
      message = 'The picture should be start with http:// or https://';
    else if (this.price <= 0)
      message = 'Price should be greater than 0.'
    else {
      message = 'Operation sccuessful';
      // Save data locally
      this.saveOffline();
    }
    this.snackBar.open(message, 'Close', { duration: 2000 });
  }

  async saveOffline() {
    await this.bookOfflineService.saveOffline(
      this.title, this.isbn, this.author, this.picture, this.price, this.bookId, false);
    this.clearForm();
  }

  clearForm() {
    this.title = '';
    this.isbn = '';
    this.author = '';
    this.picture = '';
    this.price = 0;
    this.bookId = null;
    this.router.navigate([BookFormComponent.BOOKS_PAGE]);
  }
}