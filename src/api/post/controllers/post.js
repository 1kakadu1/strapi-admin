'use strict';

/**
 * post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { transformImage } = require("../../../utils/image.utils");
const { transformPostSmall, transformResponseCategories, transformResponseTags } = require("../../../utils/post.utils");

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
    },
    // tags: ITag[]
    // categories: ICategory[]

    async find(ctx) {
        const { query } = ctx;
        const { results, pagination } = await strapi.service('api::post.post').find({
            ...query,
            populate: {
                preview: true,
                tags:{
                    select: ['id', 'name', 'type', 'is_aside', 'slug']
                },
                categories:{
                    populate:{
                        image: true,
                        select: ['id', 'name', 'is_aside']
                    }
                    
                }
            }
        });
        const posts = transformPostSmall(results);
        const sanitizedResults = await this.sanitizeOutput(posts, ctx);
        const response = this.transformResponse(sanitizedResults, { pagination });
        const data = [...response.data];
        for(let i=0; i < data.length; i++){
            const attributes = {...data[i].attributes};
            const id = data[i].id;
            data[i] = attributes;
            data[i].id = id;
            data[i].preview = data[i].preview.data.attributes;
            data[i].categories = transformResponseCategories(data[i].categories.data);
            data[i].tags = transformResponseTags(data[i].tags.data);
            delete data[i].attributes;
        }
        return {
            ...response,
            data: data,
        }
    }
}));
