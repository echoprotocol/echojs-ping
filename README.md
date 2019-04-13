# Ping

Ping is the avatar generator for Echo Blockchain accounts by him username.

Each Echo Blockchain account has its own unique avatar. Ping will help you get it.

## Install Ping

```bash
npm i @echo/ping
```

## Use Ping in your code

```javascript
const ping = require('@echo/ping');

const accountSvg = ping.getSvg('pixelplex', 100);
```

where `pixelplex` - an Echo account name, and `100` - an avatar size. 
