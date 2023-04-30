const { transformImage } = require("./image.utils");

function transformTags(tags){
    const values = [...tags];
    for(let i = 0; i < values.length; i++){
        delete values[i]["createdAt"];
        delete values[i]["updatedAt"];
    }

    return values;
}

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

module.exports ={
    transformTags,transformCategories
}