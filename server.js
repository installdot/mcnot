const express = require('express');
const fs = require('fs');
const path = require('path');
const { startBots, sendChat, listBots } = require('./botManager');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const configPath = './data/config.json';

app.post('/api/start', (req, res) => {
  fs.writeFileSync(configPath, JSON.stringify(req.body));
  startBots(req.body);
  res.json({ status: 'started' });
});

app.post('/api/chat', (req, res) => {
  sendChat(req.body.message, req.body.target);
  res.json({ status: 'sent' });
});

app.get('/api/bots', (req, res) => {
  res.json(listBots());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Web panel running at http://localhost:${PORT}`));

if (fs.existsSync(configPath)) {
  startBots(JSON.parse(fs.readFileSync(configPath)));
}