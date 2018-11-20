'use strict';

/**
 * Handout.js controller
 *
 * @description: A set of functions called "actions" for managing `Handout`.
 */

module.exports = {

  /**
   * Retrieve handout records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.handout.search(ctx.query);
    } else {
      return strapi.services.handout.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a handout record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.handout.fetch(ctx.params);
  },

  /**
   * Count handout records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.handout.count(ctx.query);
  },

  /**
   * Create a/an handout record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.handout.add(ctx.request.body);
  },

  /**
   * Update a/an handout record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.handout.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an handout record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.handout.remove(ctx.params);
  }
};
