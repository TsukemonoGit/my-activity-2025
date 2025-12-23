const fs = require('fs');
const { nip19 } = require('nostr-tools');

const filesToFix = [
  'f:/Users/htm43/Documents/GitHub/yearly-activity/Nostr/nostr_summary_2025.md',
  'f:/Users/htm43/Documents/GitHub/yearly-activity/TsukemonoGit_2025_Executive_Summary_JP.md',
  'f:/Users/htm43/Documents/GitHub/yearly-activity/TsukemonoGit_2025_Master_Chronicle_JP.md'
];

filesToFix.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace links like https://njump.me/62243c5bce...
  content = content.replace(/https:\/\/njump\.me\/([a-f0-9]{10,})/g, (match, hex) => {
    try {
      const encoded = nip19.noteEncode(hex);
      return `https://lumilumi.app/${encoded}`;
    } catch (e) {
       return match;
    }
  });

  // Replace links like https://lumilumi.app/4461bb8e... (hex version)
  content = content.replace(/https:\/\/lumilumi\.app\/([a-f0-9]{32,})/g, (match, hex) => {
    try {
        if (hex.length === 64) {
            return `https://lumilumi.app/${nip19.noteEncode(hex)}`;
        }
        return match;
    } catch (e) {
        return match;
    }
  });

  // Fix "イベントID: 3c4f4b7..." text
  content = content.replace(/イベントID: ([a-f0-9]{32,})/g, (match, hex) => {
    try {
        return `イベントID: ${nip19.noteEncode(hex)}`;
    } catch (e) {
        return match;
    }
  });

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Patched ${filePath}`);
});
