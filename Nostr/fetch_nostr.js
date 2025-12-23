const { SimplePool } = require('nostr-tools');
const fs = require('fs');
const ws = require('ws');

// Node.js polyfill
global.WebSocket = ws;

const RELAYS = ['wss://yabu.me', 'wss://x.kojira.io'];
const PUBKEYS = [
  '84b0c46ab699ac35eb2ca286470b85e081db2087cdef63932236c397417782f5', // npub1sjcvg...
  '5650178597525e90ea16a4d7a9e33700ac238a1be9dbf3f5093862929d9a1e60'  // npub12egp0...
];

const START_YEAR = 2025;
const CURRENT_DATE = new Date();

async function fetchNostrActivity() {
  const pool = new SimplePool();
  let allEvents = [];

  console.log('Fetching Nostr text notes (kind 1) for 2025 with monthly pagination...');

  for (let month = 0; month < 12; month++) {
    const since = Math.floor(new Date(START_YEAR, month, 1).getTime() / 1000);
    const until = Math.floor(new Date(START_YEAR, month + 1, 1).getTime() / 1000);
    
    // Stop if we reach the future
    if (since > CURRENT_DATE.getTime() / 1000) break;

    console.log(`- Fetching ${START_YEAR}-${(month + 1).toString().padStart(2, '0')}...`);
    
    try {
      // Fetch specifically for these two authors
      const events = await pool.querySync(RELAYS, {
        kinds: [1],
        authors: PUBKEYS,
        since: since,
        until: until,
        limit: 1000 // Safely fetch many events per month
      });

      console.log(`  Found ${events.length} events.`);
      allEvents = allEvents.concat(events);
    } catch (err) {
      console.error(`  Error in month ${month + 1}:`, err.message);
    }
  }

  // Deduplicate by ID
  const uniqueEvents = Array.from(new Map(allEvents.map(ev => [ev.id, ev])).values());
  
  console.log(`Total unique events fetched: ${uniqueEvents.length}`);
  fs.writeFileSync('nostr_activity.json', JSON.stringify(uniqueEvents, null, 2), 'utf-8');
  console.log('Saved to nostr_activity.json');

  pool.close(RELAYS);
}

fetchNostrActivity();
