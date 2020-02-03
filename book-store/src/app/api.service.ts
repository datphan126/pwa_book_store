import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BACKEND_SERVER_PROTOCOL = 'http://';
  private BACKEND_SERVER_IP = 'localhost';
  private BACKEND_SERVER_PORT = '8080'; // 8080 for HTTP and 8443 for HTTPS
  private BOOKS_API = this.BACKEND_SERVER_PROTOCOL + this.BACKEND_SERVER_IP + ':' + this.BACKEND_SERVER_PORT + '/books';
  private BIRTHDAY_CARDS_API = this.BACKEND_SERVER_PROTOCOL + this.BACKEND_SERVER_IP + ':' + this.BACKEND_SERVER_PORT + '/birthdayCards';

  constructor(private httpClient: HttpClient) { }

  // Book APIS
  fetchBook(id: string) {
    return this.httpClient.get(`${this.BOOKS_API}/${id}`);
  }

  fetchBooks() {
    return this.httpClient.get(this.BOOKS_API);
  }

  addOrUpdateBook(
    book: { title: string, isbn: string, author: string; picture: string, price: number, _id: null | string }) {
    if (!book._id || book._id === '') return this.httpClient.post(this.BOOKS_API, book);
    return this.httpClient.put(this.BOOKS_API, book);
  }

  deleteBook(id: string) {
    return this.httpClient.delete(`${this.BOOKS_API}/${id}`);
  }

  // Birthday Card APIs
  fetchBirthdayCard(id: string) {
    return this.httpClient.get(`${this.BIRTHDAY_CARDS_API}/${id}`);
  }

  fetchBirthdayCards() {
    return this.httpClient.get(this.BIRTHDAY_CARDS_API);
  }

  addOrUpdateBirthdayCard(
    card: { title: string, material: string, picture: string, price: number, _id: null | string }) {
    if (!card._id || card._id === '') return this.httpClient.post(this.BIRTHDAY_CARDS_API, card);
    return this.httpClient.put(this.BIRTHDAY_CARDS_API, card);
  }

  deleteBirthdayCard(id: string) {
    return this.httpClient.delete(`${this.BIRTHDAY_CARDS_API}/${id}`);
  }
}
