# Ping

[![Build Status](https://travis-ci.com/echoprotocol/echojs-ping.svg?branch=master)](https://travis-ci.com/echoprotocol/echojs-ping)
[![David](https://img.shields.io/david/echoprotocol/echojs-ping)](https://github.com/echoprotocol/echojs-ping)
[![npm](https://img.shields.io/npm/dw/echojs-ping)](https://www.npmjs.com/package/echojs-ping)
[![npm](https://img.shields.io/npm/v/echojs-ping)](https://www.npmjs.com/package/echojs-ping)

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

### Use on server side

The SVG rendering requires DOM. If you want to use this library on the server, you should use the
[svgdom](https://www.npmjs.com/package/svgdom) library

```javascript
const window = require('svgdom');
const { svgAvatar } = require('echojs-ping');

const accountSvg = svgAvatar('pixelplex', 100, window);
```

## License

The MIT License (MIT)

Copyright (c) 2019 Echo Technological Solutions LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
