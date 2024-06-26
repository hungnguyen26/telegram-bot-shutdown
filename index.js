const { Telegraf } = require('telegraf')
const { exec } = require('child_process');

const BOT_TOKEN = 'EDIT_ME'

const bot = new Telegraf(BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))
bot.command('tatmay', (ctx) => {
    const time = 60

    const cmd = `shutdown -s -f -t ${time}`

    exec(cmd, (error) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
    });

    if (time > 0) {
        ctx.reply(`Máy tính sẽ tắt sau ${time} giây.`)
    } else {
        ctx.reply('Máy tính sẽ tắt ngay lập tức.')
    }
})
bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

console.log('Bot started')
