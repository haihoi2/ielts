'use strict';

/**
 * Rhr.js controller
 *
 * @description: A set of functions called "actions" for managing `Rhr`.
 */

module.exports = {

  /**
   * Retrieve rhr records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.rhr.search(ctx.query);
    } else {
      return strapi.services.rhr.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a rhr record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.rhr.fetch(ctx.params);
  },

  /**
   * Count rhr records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.rhr.count(ctx.query);
  },

  /**
   * Create a/an rhr record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.rhr.add(ctx.request.body);
  },

  /**
   * Update a/an rhr record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.rhr.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an rhr record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.rhr.remove(ctx.params);
  }
};
