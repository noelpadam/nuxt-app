import Elysia from "elysia";
import { cron } from '@elysiajs/cron'
// import { StoreDatabase } from './db.js';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url'; // 👈 Import required for ESM



// 1. Initialize the SQLite database (Singleton pattern is best)
// const db = new Database(":memory:");
// db.prepare("CREATE TABLE store (id INTEGER PRIMARY KEY, name TEXT NOT NULL,author TEXT UNIQUE NOT NULL)").run();
// db.prepare("INSERT INTO store VALUES (?, ?, ?)").run([1, "jacob", "author1"]);
// db.prepare("INSERT INTO store VALUES (?, ?, ?)").run([2, "antony", "author2"]);
// console.log(db.prepare("SELECT * FROM store").all());

// Define the ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const ESM_DIRNAME = path.dirname(__filename); // 👈 The new directory path
const DB_PATH = path.join(ESM_DIRNAME, 'my_data.sqlite');

// Function to get an open, promise-based database handle
async function getDB() {
  return open({
    filename: DB_PATH, // Use the resolved absolute path
    driver: sqlite3.Database
  });
}

export default () => new Elysia()
  .get('/hello', () => ({ message: 'Hello from me..' }))
  .get("/store", async () => {
	const db = await getDB();
	// 1. Ensures table exists without error
	await db.run(`
	CREATE TABLE IF NOT EXISTS store (
		id INTEGER PRIMARY KEY, 
		name TEXT NOT NULL,
		author TEXT UNIQUE NOT NULL -- CRITICAL: UNIQUE constraint here
	)
	`);

	// 2. Skips insertion if the 'author' (the UNIQUE column) already exists.
	await db.run("INSERT OR IGNORE INTO store VALUES (?, ?, ?)", [1, 'jacob', 'author1']);
	await db.run("INSERT OR IGNORE INTO store VALUES (?, ?, ?)", [2, 'antony', 'author2']);
    // db is now type-safe and accessible in the handler
    //const allItems = db.prepare('SELECT * FROM store').all();
	 // Note: Database operations are now awaited
    const allItems = await db.all("SELECT * FROM store");
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
