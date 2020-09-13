const comment = {
  author(parent, args, {
    db
  }, info) {
    return db.users.find((user) => {
      return user.id === parent.author
      //if user.id = comment.author then comment.author = founded user
    })
  },
  post(parent, args, {
    db
  }, info) {
    return db.posts.find((post) => {
      return post.id === parent.post
    })
  },
}

export {
  comment as default
}
