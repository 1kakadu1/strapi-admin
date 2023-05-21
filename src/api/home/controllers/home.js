'use strict';

/**
 * home controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { transformImage } = require("../../../utils/image.utils");
const { transformCategories } = require("../../../utils/post.utils");

module.exports = createCoreController('api::home.home'
    , ({ strapi }) => ({
        async find(ctx) {
            const { query } = ctx;
            const entity = await strapi.db.query('api::home.home').findOne({
                populate: {
                    ...query,
                    seo: true,
                    posts: {
                        populate: {
                            posts: {
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
                                },
 
                            }
                        },
                    },
                }
            });

            delete entity.seo.id;

            const postsObj = JSON.parse(JSON.stringify(entity.posts));
            const posts = [...postsObj.posts];
            for(let i = 0; i < posts.length; i++){
                posts[i].preview = transformImage(posts[i].preview, posts[i].id);
                posts[i].categories = transformCategories(posts[i].categories);
            }
            entity.posts = posts;

            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
            return this.transformResponse(sanitizedEntity);
        }
    })
);