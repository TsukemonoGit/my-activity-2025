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

async function fetchNostrEngagement() {
  const pool = new SimplePool();
  let allEngagementEvents = [];

  console.log('Fetching Nostr engagement (reactions, reposts, zaps) for 2025...');

  for (let month = 0; month < 12; month++) {
    const since = Math.floor(new Date(START_YEAR, month, 1).getTime() / 1000);
    const until = Math.floor(new Date(START_YEAR, month + 1, 1).getTime() / 1000);
    
    if (since > CURRENT_DATE.getTime() / 1000) break;

    console.log(`- Fetching engagement for ${START_YEAR}-${(month + 1).toString().padStart(2, '0')}...`);
    
    try {
      // Fetch events that mention our authors in "p" tags (reactions to them)
      const events = await pool.querySync(RELAYS, {
        kinds: [6, 7, 9735], // Repost, Reaction, Zap
        '#p': PUBKEYS,       // Mentions our authors as targets
        since: since,
        until: until,
        limit: 1000
      });

      console.log(`  Found ${events.length} engagement events.`);
      allEngagementEvents = allEngagementEvents.concat(events);
    } catch (err) {
      console.error(`  Error in month ${month + 1}:`, err.message);
    }
  }

  // Deduplicate
  const uniqueEngagement = Array.from(new Map(allEngagementEvents.map(ev => [ev.id, ev])).values());
  
  console.log(`Total unique engagement events fetched: ${uniqueEngagement.length}`);
  fs.writeFileSync('nostr_engagement.json', JSON.stringify(uniqueEngagement, null, 2), 'utf-8');
  console.log('Saved engagement to nostr_engagement.json');

  pool.close(RELAYS);
}

fetchNostrEngagement();
