'use strict';

const customRoutes = require('./custom-routes');

module.exports = {
  routes: [...customRoutes.routes],
};
