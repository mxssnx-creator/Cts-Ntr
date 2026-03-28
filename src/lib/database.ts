import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import path from 'path';
import { fileURLToPath } from 'url';

// Schema definitions
export const schema = {
  // Users table
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
  
  // Exchanges table
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
  `,
  
  // Positions table
  positions: `
    CREATE TABLE IF NOT EXISTS positions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      exchange_id TEXT,
      symbol TEXT NOT NULL,
      side TEXT NOT NULL, -- 'long' or 'short'
      size REAL NOT NULL,
      entry_price REAL NOT NULL,
      current_price REAL,
      unrealized_pnl REAL DEFAULT 0,
      realized_pnl REAL DEFAULT 0,
      leverage INTEGER DEFAULT 1,
      margin_type TEXT DEFAULT 'isolated',
      stop_loss REAL,
      take_profit REAL,
      opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (exchange_id) REFERENCES exchanges(id)
    )
  `,
  
  // Orders table
  orders: `
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      exchange_id TEXT,
      position_id TEXT,
      symbol TEXT NOT NULL,
      side TEXT NOT NULL, -- 'buy' or 'sell'
      type TEXT NOT NULL, -- 'market', 'limit', 'stop', etc.
      size REAL NOT NULL,
      price REAL,
      status TEXT NOT NULL, -- 'pending', 'filled', 'cancelled', 'rejected'
      filled_size REAL DEFAULT 0,
      average_price REAL,
      fee REAL DEFAULT 0,
      fee_currency TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (exchange_id) REFERENCES exchanges(id),
      FOREIGN KEY (position_id) REFERENCES positions(id)
    )
  `,
  
  // Strategies table
  strategies: `
    CREATE TABLE IF NOT EXISTS strategies (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      category TEXT NOT NULL, -- 'additional' or 'adjust'
      type TEXT NOT NULL, -- 'trailing', 'block', 'dca'
      config JSON, -- Strategy-specific configuration
      enabled BOOLEAN DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `,
  
  // Presets table
  presets: `
    CREATE TABLE IF NOT EXISTS presets (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      main_indicators JSON,
      common_indicators JSON,
      strategies JSON,
      base_settings JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `,
  
  // Settings table
  settings: `
    CREATE TABLE IF NOT EXISTS settings (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL UNIQUE,
      exchange JSON,
      indication JSON,
      strategy JSON,
      install JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `,
  
  // Trades table (for performance tracking)
  trades: `
    CREATE TABLE IF NOT EXISTS trades (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      position_id TEXT,
      exchange_id TEXT,
      symbol TEXT NOT NULL,
      side TEXT NOT NULL,
      size REAL NOT NULL,
      entry_price REAL NOT NULL,
      exit_price REAL,
      pnl REAL,
      pnl_percent REAL,
      fee REAL,
      fee_currency TEXT,
      opened_at TIMESTAMP,
      closed_at TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (position_id) REFERENCES positions(id),
      FOREIGN KEY (exchange_id) REFERENCES exchanges(id)
    )
  `
};

class DatabaseService {
  private static instance: DatabaseService;
  private db: ReturnType<typeof Database>;
  private drizzleDb: ReturnType<typeof drizzle>;
  private isInitialized: boolean = false;

  private constructor() {
    // Create an in-memory database
    this.db = new Database(':memory:');
    this.drizzleDb = drizzle(this.db);
    
    // Enable foreign key constraints
    this.db.pragma('foreign_keys = ON');
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Create all tables
      for (const [tableName, createTableSQL] of Object.entries(schema)) {
        this.db.exec(createTableSQL);
        console.log(`Table ${tableName} created successfully`);
      }

      // Run migrations
      await this.runMigrations();
      
      this.isInitialized = true;
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

    private async runMigrations(): Promise<void> {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const migrationsDir = path.join(__dirname, '..', '..', 'migrations');
        
        console.log('Looking for migrations in:', migrationsDir);
        
        // Ensure migrations directory exists
        // In a real implementation, we would check if directory exists
        // For now, we'll note that migrations would be run from ./migrations
        
        migrate(this.drizzleDb, { migrationsFolder: migrationsDir });
        console.log('Database migrations completed');
    } catch (error) {
       console.warn('Migration directory not found or migration failed:', (error as Error).message);
      // Continue without migrations for now since we're creating tables directly
    }
}

  public getDB() {
    return this.drizzleDb;
  }

  public rawDB() {
    return this.db;
  }

  public close() {
    this.db.close();
    this.isInitialized = false;
    console.log('Database connection closed');
  }
}

export const dbService = DatabaseService.getInstance();
export default dbService;