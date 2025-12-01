import Elysia from "elysia";
import { cron } from '@elysiajs/cron'
// import { StoreDatabase } from './db.js';
import { Database } from "bun:sqlite";



// 1. Initialize the SQLite database (Singleton pattern is best)
const db = new Database(":memory:");
db.run("CREATE TABLE store (id INTEGER PRIMARY KEY, name TEXT NOT NULL,author TEXT UNIQUE NOT NULL)");
db.run("INSERT INTO store VALUES (?, ?, ?)", [1, "jacob", "author1"]);
db.run("INSERT INTO store VALUES (?, ?, ?)", [2, "antony", "author2"]);
console.log(db.query("SELECT * FROM store").all());

export default () => new Elysia()
  .get('/hello', () => ({ message: 'Hello from me..' }))
  .decorate('db', db)
  .get("/store", ({ db }) => {
    // db is now type-safe and accessible in the handler
    const allItems = db.query('SELECT * FROM store').all();
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
