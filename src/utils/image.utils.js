function transformImage(image, id){

    if(image === null){
        return null;
    }
    const imageF = image?.formats !== undefined &&  image !== null ? image.formats : {thumbnail: image.url, small: image.url}
    return {
        full: process.env.ASSETS_PATH+image.url,
        thumbnail: imageF.thumbnail ? process.env.ASSETS_PATH+imageF.thumbnail.url : image.url,
        small: imageF.small ? process.env.ASSETS_PATH+imageF.small.url : undefined,
        large: imageF.large ? process.env.ASSETS_PATH+imageF.large.url : undefined,
        medium: imageF.medium ? process.env.ASSETS_PATH+imageF.medium.url : undefined,
    }
} 

module.exports ={
    transformImage,
}