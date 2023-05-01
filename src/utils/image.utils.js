function transformImage(image){
    const imageF = image.formats
    return {
        thumbnail: process.env.ASSETS_PATH+imageF.thumbnail.url,
        small: process.env.ASSETS_PATH+imageF.small.url
    }
} 

module.exports ={
    transformImage,
}