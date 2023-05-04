const { transformImage } = require("./image.utils");

function transformCategories(categories){
    const values = [...categories];
    for(let i = 0; i < values.length; i++){
        delete values[i]["createdAt"];
        delete values[i]["updatedAt"];
        delete values[i]["publishedAt"];
        values[i].image = transformImage(values[i].image);
    }

    return values;
}

function transformPostSmall(posts){
    const values = [...posts];
    for(let i = 0; i < values.length; i++){
        delete values[i]["createdAt"];
        delete values[i]["updatedAt"];
        values[i].preview = transformImage(values[i].preview);
        values[i].categories = transformCategories(values[i].categories);
        values[i].tags = transformTags(values[i].tags);

    }

    return values;
}

function transformTags(tags){
    const values = [...tags];
    for(let i = 0; i < values.length; i++){
        delete values[i]["createdAt"];
        delete values[i]["updatedAt"];
        delete values[i]["publishedAt"];
    }

    return values;
}

function transformResponseCategories(categories){
    const values = [];
    for(let i = 0; i < categories.length; i++){
        values.push({
            ...categories[i].attributes,
            id: categories[i].id,
            image: categories[i].attributes.image.data.attributes,
        })
    }

    return values;
}

function transformResponseTags(tags){
    const values = [];
    for(let i = 0; i < tags.length; i++){
        values.push({
            ...tags[i].attributes,
            id: tags[i].id,
        })
    }

    return values;
}

module.exports ={
    transformCategories,
    transformTags,
    transformPostSmall,
    transformResponseCategories,
    transformResponseTags
}