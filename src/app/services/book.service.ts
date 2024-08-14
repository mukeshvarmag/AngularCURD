import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/book`);
  }

  getBookById(bookid: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/book/${bookid}`);
  }

  getTotalPrice(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/book/totalPrice`);
  }

  deleteBook(bookid: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/book/${bookid}`);
  }

  saveBook(book: Book): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/books`, book);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/books`, book);
  }
}
