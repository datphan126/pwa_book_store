import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private BACKEND_SERVER_PROTOCOL = this.configService.getConfig().cfg.backendProtocol;
  private BACKEND_SERVER_IP = this.configService.getConfig().cfg.backendHost;
  private BACKEND_SERVER_PORT = this.configService.getConfig().cfg.backendPort; // 8080 for HTTP and 8443 for HTTPS
  private BOOKS_API = this.BACKEND_SERVER_PROTOCOL + this.BACKEND_SERVER_IP + ':' + this.BACKEND_SERVER_PORT + '/books';
  private BIRTHDAY_CARDS_API = this.BACKEND_SERVER_PROTOCOL + this.BACKEND_SERVER_IP + ':' + this.BACKEND_SERVER_PORT + '/birthdayCards';

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) { }

  // Book API
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

  // Birthday Card API
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
