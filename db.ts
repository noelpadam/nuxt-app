
import { Database } from "bun:sqlite";

export interface Store {
    id?: number;
    name: string;
    author: string;
}

export class StoreDatabase {
    private db: Database;

    constructor() {
        this.db = new Database(':memory:');

        // Optionally, run migrations or initial setup
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS store (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                author TEXT UNIQUE NOT NULL
            );
        `);

        console.log("Database 'app.sqlite' connected and ready.");

        // Initialize the database
        this.init()
            .then(() => console.log('Database initialized'))
            .catch(console.error);

        // 3. Insert some data
            this.db.run("INSERT INTO store (name, author) VALUES ('Alice', 'Author James');");
            this.db.run("INSERT INTO store (name, author) VALUES ('Bob', 'Author James');");
            console.log("Data inserted.");
    }

    // Get all store
    async getStore() {
        return this.db.query('SELECT * FROM store').all();
    }

    // Add a store
    async addStore(store: Store) {
        // q: Get id type safely 
        return this.db.query(`INSERT INTO store (name, author) VALUES (?, ?) RETURNING id`).get(store.name, store.author) as Store;
    }

    // Update a store
    async updateStore(id: number, store: Store) {
        return this.db.run(`UPDATE store SET name = '${store.name}', author = '${store.author}' WHERE id = ${id}`)
    }

    // Delete a store
    async deleteStore(id: number) {
        return this.db.run(`DELETE FROM store WHERE id = ${id}`)
    }

    // Initialize the database
    async init() {
        return this.db.run('CREATE TABLE IF NOT EXISTS store (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, author TEXT)');
    }
}