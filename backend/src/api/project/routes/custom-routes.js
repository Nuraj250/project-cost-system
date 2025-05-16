'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/projects/:id/cost',
      handler: 'project.calculateCost',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
