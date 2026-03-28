const Database = require('better-sqlite3');
const { drizzle } = require('drizzle-orm/better-sqlite3');
const { migrate } = require('drizzle-orm/better-sqlite3/migrator');
const path = require('path');
const { fileURLToPath } = require('url');

// Schema definitions
const schema = {
  users: `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      password_hash TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
  
  exchanges: `
    CREATE TABLE IF NOT EXISTS exchanges (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      api_key TEXT,
      api_secret TEXT,
      passphrase TEXT,
      testnet BOOLEAN DEFAULT 0,
      enabled BOOLEAN DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `
};

class DatabaseService {
  constructor() {
    this.db = new Database(':memory:');
    this.drizzleDb = drizzle(this.db);
    this.db.pragma('foreign_keys = ON');
  }

  async initialize() {
    try {
      // Create all tables
      for (const [tableName, createTableSQL] of Object.entries(schema)) {
        this.db.exec(createTableSQL);
        console.log(`Table ${tableName} created successfully`);
      }
      
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }
  
  test() {
    const result = this.db.prepare('SELECT COUNT(*) as count FROM users').get();
    console.log('User count:', result.count);
    return result.count;
  }
}

const dbService = new DatabaseService();

async function test() {
  await dbService.initialize();
  const count = dbService.test();
  console.log('Test completed. User count:', count);
}

test().catch(console.error);