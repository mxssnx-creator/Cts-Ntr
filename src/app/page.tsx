export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-900 flex flex-col">
      <header className="bg-neutral-800/50 backdrop-blur-sm border-b border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-neutral-100">CTS - Crypto Trading Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-neutral-400">Status: <span className="text-green-400">Online</span></span>
              <span className="text-neutral-400">Portfolio: $0.00</span>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Active Positions Card */}
            <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-lg">
              <div className="p-4">
                <h2 className="text-lg font-semibold text-neutral-100 mb-4">Active Positions</h2>
                <div className="space-y-3">
                  <div className="text-neutral-400 text-sm">
                    No active positions
                  </div>
                </div>
              </div>
            </div>
            
            {/* Performance Metrics Card */}
            <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-lg">
              <div className="p-4">
                <h2 className="text-lg font-semibold text-neutral-100 mb-4">Performance</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-neutral-400">
                    <span>Total P&L:</span>
                    <span className="text-neutral-100">$0.00 (0.00%)</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Win Rate:</span>
                    <span className="text-neutral-100">0%</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Trades Today:</span>
                    <span className="text-neutral-100">0</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Market Overview Card */}
            <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-lg">
              <div className="p-4">
                <h2 className="text-lg font-semibold text-neutral-100 mb-4">Market Overview</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-neutral-400">
                    <span>BTC/USDT:</span>
                    <span className="text-neutral-100">$0.00</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>ETH/USDT:</span>
                    <span className="text-neutral-100">$0.00</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Market Cap:</span>
                    <span className="text-neutral-100">$0B</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-neutral-100 mb-4">Quick Actions</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <button className="bg-neutral-700 hover:bg-neutral-600 text-neutral-100 px-4 py-2 rounded transition-colors">
                New Trade
              </button>
              <button className="bg-neutral-700 hover:bg-neutral-600 text-neutral-100 px-4 py-2 rounded transition-colors">
                Manage Strategies
              </button>
              <button className="bg-neutral-700 hover:bg-neutral-600 text-neutral-100 px-4 py-2 rounded transition-colors">
                Exchange Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
