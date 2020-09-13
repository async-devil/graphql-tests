const user = {
  posts(parent, args, {
    db
  }, info) {
    return db.posts.filter(post => {
      return post.author === parent.id
      //if post author (id value) = user.id then user.posts = posts that filterd
    });
  },
  comments(parent, args, {
    db
  }, info) {
    return db.comments.filter(comment => {
      return comment.author === parent.id
    });
  },
}

export {
  user as default
}
