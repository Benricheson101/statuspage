## Statuspage
Check a https://statuspage.io statuspage for updates

### Installation
```bash
$ yarn add statuspage-updates
# or
$ npm i statuspage-updates
```

### Usage
```js
const { Statuspage } = require('statuspage-updates')

const status = new Statuspage({
  url: 'https://status.discord.com/index.json' // note: must end in `/index.json`
})

status.on('start', (startedAt) => {
  console.log('Started checking for updates at:', startedAt)
})

status.on('update', (data) => {
  console.log('New Statuspage update:', data.incidents[0].incident_updates[0].body)
})

status.on('run', (time) => {
  console.log('Checked for new updates at:', time)
})

status.run()
```
