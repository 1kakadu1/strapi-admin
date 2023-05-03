'use strict';

/**
 * category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { transformCategories } = require("../../../utils/post.utils");

module.exports = createCoreController('api::category.category', ({ strapi }) =>  ({
    async find(ctx) {
        const { query } = ctx;
        const { results, pagination } = await strapi.service('api::category.category').find({
            ...query,
            populate:{
                image: true,
            }
        });
        const categories = transformCategories(results);
        const sanitizedResults = await this.sanitizeOutput(categories, ctx);
        const response = this.transformResponse(sanitizedResults, { pagination });
        const data = [...response.data];
        for(let i=0; i < data.length; i++){
            const attributes = {...data[i].attributes};
            const id = data[i].id;
            data[i] = attributes;
            data[i].id = id;
            data[i].image = data[i].image.data.attributes;
            delete data[i].attributes;
        }
        return {
            ...response,
            data: data,
        }
    }
  }));
