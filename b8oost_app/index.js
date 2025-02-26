const express = require('express');
const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Инициализация Telegram-бота
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome! Use /tasks to view your tasks.');
});

// Запуск сервера
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

