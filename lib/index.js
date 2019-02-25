const clsHooked = require('cls-hooked'),
  createNamespace = require('cls-hooked').createNamespace,
  ns = createNamespace('application'),
  uuid = require('uuid/v4'),
  getNamespace = clsHooked.getNamespace,
  pino = require('pino'),
  // logger = pino(),
  logger = pino({
    prettyPrint: {
      translateTime: true,
      colorize: false
    }
  });

const info = msg => {
  const ns = getNamespace('application');
  const requestId = ns ? ns.get('requestId') : '';
  return logger.info(`[${requestId}] ${msg}`);
};

const error = msg => {
  const ns = getNamespace('application');
  const requestId = ns ? ns.get('requestId') : '';
  return logger.error(`[${requestId}] ${msg}`);
};

const expressMiddleware = (req, res, next) => {
  const method = req.method;
  const url = req.originalUrl || req.url;
  const params = JSON.stringify(req.params);
  const query = JSON.stringify(req.query);
  const body = JSON.stringify(req.body);
  const namespace = getNamespace('application');

  const requestId = namespace ? namespace.get('requestId') : '';
  logger.info(
    `Started ${method} ${url} with params: ${params}, query: ${query}, body: ${body}, requestId: ${requestId}`
  );
  const begin = Date.now();
  next();
  const end = Date.now();
  const responseTime = res.headersSent ? end - begin : '-';
  const status = res.statusCode;
  logger.info(`Ended ${method} ${url} with status: ${status} in ${responseTime}ms`);
};

const expressRequestIdMiddleware = (req, res, next) => {
  ns.bindEmitter(req);
  ns.bindEmitter(res);
  return ns.run(() => {
    const requestId = req.headers['x-request-id'] || uuid();
    ns.set('requestId', requestId);
    next();
  });
};


module.exports = { logger: { ...logger, info, error }, expressMiddleware, expressRequestIdMiddleware };
