const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    if (Array.isArray(blogs)) 
        return blogs.reduce((totalLikes, element) => totalLikes + element.likes, 0);
     
    return 0;
}

const favoriteBlog = (blogs) => {
    if (Array.isArray(blogs)) {
        const maxNumberOflike = Math.max(...(blogs.map(b => b.likes)));
        return blogs.find(b => b.likes == maxNumberOflike);
    }
    
    return undefined;
}

const mostBlogs = (blogs) => {
    if (Array.isArray(blogs)) {
        const authorsWithTotalBlogs = blogs.map(function(e) { 
            return {
                'author': e.author,
                'blogs': blogs.filter(element => element.author == e.author).length
            }
        });
        const mostBlogs = Math.max(...authorsWithTotalBlogs.map(e => e.blogs));
        return authorsWithTotalBlogs.find(e => e.blogs == mostBlogs);
    }
    
    return undefined;
}

const mostLikes = (blogs) => {
    if (Array.isArray(blogs)) {
        const authorsWithTotalLikes = blogs.map(function(e) { 
            return {
                'author': e.author,
                'likes': blogs.filter(element => element.author == e.author)
                              .reduce((acc, element) => acc + element.likes, 0)
            }
        })
        const mostLikes = Math.max(...authorsWithTotalLikes.map(e => e.likes));
        return authorsWithTotalLikes.find(e => e.likes == mostLikes);
    }

    return undefined;
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}