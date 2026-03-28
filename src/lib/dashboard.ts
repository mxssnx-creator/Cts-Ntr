import { dbService } from './database';

export async function getDashboardData() {
  // Get the first user (in a real app, we would get the current user from the session)
  const user = dbService.rawDB().prepare('SELECT * FROM users LIMIT 1').get() as { id: string } | null;
  if (!user) {
    return null;
  }
  const userId = user.id;

  // Get exchanges count
  const exchangesCount = dbService.rawDB().prepare(
    'SELECT COUNT(*) as count FROM exchanges WHERE user_id = ?'
  ).get(userId) as { count: number };

  // Get open positions count (size > 0)
  const openPositionsCount = dbService.rawDB().prepare(
    'SELECT COUNT(*) as count FROM positions WHERE user_id = ? AND size > 0'
  ).get(userId) as { count: number };

  // Get today's trades count
  const today = new Date().toISOString().split('T')[0];
  const todaysTradesCount = dbService.rawDB().prepare(
    'SELECT COUNT(*) as count FROM trades WHERE user_id = ? AND DATE(opened_at) = ?'
  ).get(userId, today) as { count: number };

  // Calculate portfolio value (simplified: sum of position values at current price)
  // We don't have real current prices, so we'll use entry_price for now
  const positions = dbService.rawDB().prepare(
    'SELECT size, entry_price FROM positions WHERE user_id = ?'
  ).all(userId) as Array<{ size: number; entry_price: number }>;
  const portfolioValue = positions.reduce((sum, pos) => sum + (pos.size * pos.entry_price), 0);

  return {
    exchangesCount: exchangesCount.count,
    openPositionsCount: openPositionsCount.count,
    todaysTradesCount: todaysTradesCount.count,
    portfolioValue: Number(portfolioValue.toFixed(2)),
  };
}