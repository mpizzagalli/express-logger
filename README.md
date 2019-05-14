# express-js-logger

## Migrate from winston to express-wolox-logger
If you are wondering how to migrate from wolox express-js boostrap configuration with winston to this package follow the following steps:

1. Remove your winston dependencies
2. Run `npm i express-wolox-logger`
3. Go to `app/logger/index.js` and replace the whole file for:
```
const { logger } = require('express-wolox-logger');

module.exports = logger;
```
### Optionals
If you want to use the new requestMiddleware provided by this package instead of morgan's middleware follow the following steps:

4. Remove your morgan dependencies
5. Go to `app.js` 
6. Add the following line at the very start of the file:
```
const { expressMiddleware, expressRequestIdMiddleware } = require('express-wolox-logger');
```
7. Find where you have the following code (or something very similar):
```
  if (!config.isTesting) {
    morgan.token('req-params', req => JSON.stringify(req.params));
    app.use(
      morgan(
        '[:date[clf]] :remote-addr - Request ":method :url" with params: :req-params. Response status: :status. Elapsed time: :response-time'
      )
    );
  }
```
and replace it with:
```
  app.use(expressRequestIdMiddleware);

  if (!config.isTesting) {
    app.use(expressMiddleware);
  }
```

## About

This project is maintained by [Wolox](https://github.com/wolox) and it was written by [Wolox](http://www.wolox.com.ar).

![Wolox](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)

## License

**express-wolox-logger** is available under the MIT [license](LICENSE.md).

    Copyright (c) 2019 Wolox

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