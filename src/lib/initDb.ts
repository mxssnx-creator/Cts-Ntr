import { dbService } from './database';

/**
 * Initialize the database with tables and run migrations
 * This should be called at application startup
 */
export async function initializeDatabase() {
  try {
    await dbService.initialize();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

// Initialize database when this module is imported
initializeDatabase().catch(console.error);