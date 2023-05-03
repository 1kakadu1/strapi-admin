'use strict';

/**
 * tag controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { transformTags } = require("../../../utils/post.utils");

module.exports = createCoreController('api::tag.tag', ({ strapi }) =>  ({
    async find(ctx) {
        const { query } = ctx;
        const { results, pagination } = await strapi.service('api::tag.tag').find({
            ...query,
            populate:{
                image: true,
            }
        });
        const tags = transformTags(results);
        const sanitizedResults = await this.sanitizeOutput(tags, ctx);
        const response = this.transformResponse(sanitizedResults, { pagination });
        const data = [...response.data];
        for(let i=0; i < data.length; i++){
            const attributes = {...data[i].attributes};
            const id = data[i].id;
            data[i] = attributes;
            data[i].id = id;
            delete data[i].attributes;
        }
        return {
            ...response,
            data: data,
        }
    }
  }));