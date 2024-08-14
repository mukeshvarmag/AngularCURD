import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  selectedBook?: Book;
  totalPrice: number = 0;
  newBook: Book = new Book(); // For adding a new book
  bookToUpdate: Book = new Book(); // For updating a book

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getAllBooks();
    this.getTotalPrice();
  }

  getAllBooks(): void {
    this.bookService.getAllBooks().subscribe((data: Book[]) => {
      this.books = data;
    });
  }

  getBookById(bookid: number): void {
    this.bookService.getBookById(bookid).subscribe((book: Book) => {
      this.selectedBook = book;
    });
  }

  getTotalPrice(): void {
    this.bookService.getTotalPrice().subscribe((price: number) => {
      this.totalPrice = price;
    });
  }

  deleteBook(bookid: number): void {
    this.bookService.deleteBook(bookid).subscribe(() => {
      this.getAllBooks(); // Refresh the list after deletion
    });
  }

  saveBook(): void {
    console.log('Saving Book:', this.newBook);  // Debugging line
    this.bookService.saveBook(this.newBook).subscribe(() => {
      this.getAllBooks(); // Refresh the list after adding a new book
      this.newBook = new Book(); // Reset the form
    });
  }
  
  updateBook(): void {
    if (this.selectedBook) {
      console.log('Updating Book:', this.selectedBook);  // Debugging line
      this.bookService.updateBook(this.selectedBook).subscribe(() => {
        this.getAllBooks(); // Refresh the list after updating a book
        this.selectedBook = undefined; // Reset the form
      });
    }
  }
  
  
}
