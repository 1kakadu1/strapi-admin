'use strict';

/**
 * home controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { transformImage } = require("../../../utils/image.utils");

module.exports = createCoreController('api::home.home'
    , ({ strapi }) => ({
        async find(ctx) {
            const { query } = ctx;
            const entity = await strapi.db.query('api::home.home').findOne({
                populate: {
                    ...query,
                    seo: true,
                    Posts: {
                        populate: {
                            posts: {
                                populate: ['preview'],
                            }
                        },
                    }
                }
            });

            delete entity.seo.id;

            const postsObj = JSON.parse(JSON.stringify(entity.Posts));
            const posts = [...postsObj.posts];
            delete entity.Posts;
            for(let i = 0; i < posts.length; i++){
                posts[i].preview = transformImage(posts[i].preview);
            }
            entity.posts = posts;

            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
            return this.transformResponse(sanitizedEntity);
        }
    })
);