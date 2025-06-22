const mineflayer = require('mineflayer');
let bots = [];

function startBots({ host, port, username, version, count, usernames }) {
  bots.forEach(bot => bot.quit());
  bots = [];

  const botNames = usernames ?? Array.from({ length: count }, (_, i) => `${username}_${i}`);

  for (const name of botNames) {
    const bot = mineflayer.createBot({
      host,
      port: parseInt(port),
      username: name,
      version
    });

    bot.on('spawn', () => console.log(`[${bot.username}] Spawned`));
    bot.on('chat', (user, message) => console.log(`[${user}] ${message}`));
    bot.on('error', err => console.log(`[${bot.username}] ERROR: ${err.message}`));
    bot.on('end', () => console.log(`[${bot.username}] Disconnected`));

    bots.push(bot);
  }
}

function sendChat(message, target = 'all') {
  bots.forEach(bot => {
    if (target === 'all' || bot.username === target) {
      bot.chat(message);
    }
  });
}

function listBots() {
  return bots.map(b => b.username);
}

module.exports = { startBots, sendChat, listBots };