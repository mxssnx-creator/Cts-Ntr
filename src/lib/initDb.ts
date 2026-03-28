import { dbService } from './database';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';

/**
 * Initialize the database with tables and run migrations
 * This should be called at application startup
 */
export async function initializeDatabase() {
  try {
    await dbService.initialize();
    // Check if we have any users, if not create a default one
    const userCount = dbService.rawDB().prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
    if (userCount.count === 0) {
      const passwordHash = await hash('password', 10);
      dbService.rawDB().prepare(
        `INSERT INTO users (id, email, name, password_hash) VALUES (?, ?, ?, ?)`
      ).run(
        randomUUID(),
        'admin@example.com',
        'Admin',
        passwordHash
      );
      console.log('Default user created: admin@example.com / password');
    }
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

// Initialize database when this module is imported
initializeDatabase().catch(console.error);