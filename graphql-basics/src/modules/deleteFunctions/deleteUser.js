function deleteUser(users, posts, comments, args) {
  var userIndex = users.findIndex((user) => user.id === args.id);

  if (userIndex === -1) {
    throw new Error('User not found')
  }

  var deletedUser = users.splice(userIndex, 1);

  posts = posts.filter(post => {
    var match = post.author === args.id

    if (match) {
      comments = comments.filter((comment) => {
        return comment.post !== post.id
      })
    }

    return !match
  });

  comments = comments.filter((comment) => {
    return comment.author !== args.id
  })

  return {users, posts, comments, deletedUser: deletedUser[0]}
}

module.exports = deleteUser;
