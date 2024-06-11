const dummy = (blogs) => {
 return 1
}

const totalLikes = (array) => {
    const likes = []
    array.map(blog => {
        likes.push(blog.likes)
    })
    return likes.reduce((acumulador, valorActual) => acumulador + valorActual);
}

const favoriteBlog = (array) => {
    const objetoConMasLikes = array.reduce((max, obj) => {
        return obj.likes > max.likes ? obj : max;
      }, array[0]); 
 return objetoConMasLikes
}

module.exports = {
    dummy, 
    totalLikes,
    favoriteBlog
}