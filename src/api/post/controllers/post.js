'use strict';

/**
 * post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { transformImage } = require("../../../utils/image.utils");

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
    async findOne(ctx) {
        const { slug, query } = ctx.params;

        const entity = await strapi.db.query('api::post.post').findOne({
            where: { slug },
            populate: {
                ...query,
                banner: {
                    populate: true,
                    banner_preview: true,
                }, 
                SEO: true, 
                preview: true
            }
        });

        delete entity.SEO.id;
        delete entity.banner.id;
        entity.banner.banner_preview = transformImage(entity.banner.banner_preview);
        entity.preview = transformImage(entity.preview);
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitizedEntity);
    }
}));
