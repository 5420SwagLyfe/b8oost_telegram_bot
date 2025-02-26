const TelegramApi = require ('node-telegram-bot-api')

const token = "7675890590:AAEvAKRTq99O0EGZWLcr-cJZKx_s4PyEGaE"

const bot = new TelegramApi(token, {polling: true })

//bot.on('message', msg=> { 
//    console.log(msg)
//})

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
  
    // Создаем клавиатуру с кнопкой, открывающей веб-приложение
    bot.sendMessage(chatId, 'Нажмите кнопку, чтобы открыть веб-приложение:', {
      reply_markup: {
        inline_keyboard: [
          [{
            text: 'Открыть веб-приложение',
            web_app: { url: 'https://ya.ru' }, // Укажите URL вашего фронтенда
          }],
        ],
      },
    });
  });