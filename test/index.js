const Statuspage = require('../build')

const status = new Statuspage.Statuspage({
  url: 'https://status.discord.com/index.json'
})

status.on('start', console.log)

status.on('run', console.log)

status.on('update', console.log)

status.run()
