import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Book } from '../books/books.component';
import { OnlineOfflineService } from './online-offline.service';

@Injectable({ providedIn: 'root' })
export class BookOfflineService {
    private db: any;

    constructor(private readonly onlineOfflineService: OnlineOfflineService) {
        this.registerToEvents(onlineOfflineService);

        this.createDatabase();
    }

    private registerToEvents(onlineOfflineService: OnlineOfflineService) {
        onlineOfflineService.connectionChanged.subscribe(online => {
            if (online) {
                console.log('went online');
                console.log('sending all stored items');
                // this.sendItemsFromIndexedDb();
            } else {
                console.log('went offline, storing in indexdb');
            }
        });
    }

    private createDatabase() {
        this.db = new Dexie('Books');
        this.db.version(1).stores({
            books: '_id,title,isbn,author,price,picture'
        });
    }

    public addToIndexedDb(book: Book) {
        this.db.books
            .add(book)
            .then(async () => {
                const allItems: Book[] = await this.db.books.toArray();
                console.log('saved in DB, DB is now', allItems);
            })
            .catch(e => {
                alert('Error: ' + (e.stack || e));
            });
    }

    public bulkAddToIndexedDb(books: Array<Book>) {
        this.db.books
            .bulkAdd(books)
            .catch(e => {
                alert('Error: ' + (e.stack || e));
            });
    }

    public clearIndexedDb(){
        this.db.books.clear();
    }

    public async fecthAllBooksFromIDb(){
        const books: Book[] = await this.db.books.toArray();
        return books;
    }

    //   private async sendItemsFromIndexedDb() {
    //     const allItems: Todo[] = await this.db.todos.toArray();
    //     allItems.forEach((item: Todo) => {
    //       this.db.todos.delete(item.id).then(() => {
    //         console.log(`item ${item.id} sent and deleted locally`);
    //       });
    //     });
    //   }
}