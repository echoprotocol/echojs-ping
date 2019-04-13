# Ping

Ping is the avatar generator for Echo Blockchain accounts by him username.

Each Echo Blockchain account has its own unique avatar. Ping will help you get it.

## Install Ping

```bash
npm i echojs-ping
```

## Use Ping in your code

```javascript
const { svgAvatar } = require('echojs-ping');

const accountSvg = svgAvatar('pixelplex', 100);
```

where `pixelplex` - an Echo account name, and `100` - an avatar size. 

And as result, you will receive the source of SVG. 

As example:

![PixelPlex avata](.assets/pixelplex-avatar.png)
