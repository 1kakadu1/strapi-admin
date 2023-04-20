function transformImage(image){
    const imageF = image.formats
    return {
        thumbnail: imageF.thumbnail.url,
        small: imageF.small.url
    }
} 

module.exports ={
    transformImage,
}