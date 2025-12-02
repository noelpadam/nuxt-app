import Elysia from "elysia";
import { cron } from '@elysiajs/cron'
// import { StoreDatabase } from './db.js';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';



// 1. Initialize the SQLite database (Singleton pattern is best)
// const db = new Database(":memory:");
// db.prepare("CREATE TABLE store (id INTEGER PRIMARY KEY, name TEXT NOT NULL,author TEXT UNIQUE NOT NULL)").run();
// db.prepare("INSERT INTO store VALUES (?, ?, ?)").run([1, "jacob", "author1"]);
// db.prepare("INSERT INTO store VALUES (?, ?, ?)").run([2, "antony", "author2"]);
// console.log(db.prepare("SELECT * FROM store").all());

// Function to get an open, promise-based database handle
async function getDB() {
  return open({
    filename: 'my_data.sqlite',
    driver: sqlite3.Database
  });
}

export default () => new Elysia()
  .get('/hello', () => ({ message: 'Hello from me..' }))
  .get("/store", async () => {
	const db = await getDB();
    // Note: Database operations are now awaited
    const allItems = await db.all("SELECT * FROM store");
    // db is now type-safe and accessible in the handler
    //const allItems = db.prepare('SELECT * FROM store').all();
    return { 
      data: allItems 
    };
  })
  .use(
		cron({
			name: 'TWOFHE',
			pattern: '0 18 * * *',
			run() {
				console.log('2FHE...')
			}
		})
	)
	.get(
		'/stop',
		({
			store: {
				cron: { TWOFHE }
			}
		}) => {
			TWOFHE.stop()

			return 'Stop heartbeat'
		}
	);
