import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Book } from '../books/books.component';
import { OnlineOfflineService } from './online-offline.service';

@Injectable({ providedIn: 'root' })
export class BookOfflineService {
    private rDb: any; // this database is for caching data from the MongoDB
    private cudDb: any; // this database is for storing new data, modified data, and deleted data

    constructor(private readonly onlineOfflineService: OnlineOfflineService) {
        this.registerToEvents(onlineOfflineService);

        this.createDatabases();
    }

    private registerToEvents(onlineOfflineService: OnlineOfflineService) {
        onlineOfflineService.connectionChanged.subscribe(online => {
            if (online) {
                console.log('went online');
                // this.sendItemsFromIndexedDb();
            } else {
                console.log('went offline, storing in indexdb');
            }
        });
    }

    private createDatabases() {
        this.rDb = new Dexie('Books');
        this.rDb.version(1).stores({
            books: '_id,title,isbn,author,price,picture'
        });
    }

    public addToIndexedDb(book: Book) {
        this.cudDb.books
            .add(book)
            .then(async () => {
                const allItems: Book[] = await this.cudDb.books.toArray();
                console.log('saved in DB, DB is now', allItems);
            })
            .catch(e => {
                alert('Error: ' + (e.stack || e));
            });
    }

    public bulkAddToRDb(books: Array<Book>) {
        this.rDb.books
            .bulkAdd(books)
            .catch(e => {
                alert('Error: ' + (e.stack || e));
            });
    }

    public clearRDb(){
        this.rDb.books.clear();
    }

    public async fecthAllItemsFromRDb(){
        const books: Book[] = await this.rDb.books.toArray();
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