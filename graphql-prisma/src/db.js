const users = [
  {
    username: 'async-devil',
    id: 'd7af0046-3bdf-40cf-8aef-0a2f61bf9603',
    email: 'async.devil@gmail.com',
  },
  {
    username: 'jozide',
    id: '8c89657e-e64a-49e8-a01e-7b0d227e4dbd',
    email: 'jozide@tutanota.com',
  },
  {
    username: 'purprurp',
    id: '6d11bb37-7367-44ad-b13d-682cff7ea13c',
    email: 'purprurp@gmail.com',
  },
];

const posts = [
  {
    title: 'My first post!',
    body: "Hi, it's my first post",
    published: true,
    id: 'bc5467f8-05d2-43de-95ab-1aef8fa20768',
    author: 'd7af0046-3bdf-40cf-8aef-0a2f61bf9603',
  },
  {
    title: 'My second post!',
    body: "Hi, it's my second post",
    published: true,
    id: 'e6266412-b0de-4e3f-ae97-b5c01bc58d7b',
    author: '8c89657e-e64a-49e8-a01e-7b0d227e4dbd',
  },
  {
    title: 'My third post!',
    body: "Hi, it's my third post",
    published: false,
    id: '80ec9c47-70ca-4218-8697-47a41659ce1d',
    author: '6d11bb37-7367-44ad-b13d-682cff7ea13c',
  },
];

const comments = [
  {
    body: 'WOW!',
    published: true,
    id: 'c98c232f-c175-440b-839c-e672c87ddbb1',
    author: 'd7af0046-3bdf-40cf-8aef-0a2f61bf9603',
    post: 'e6266412-b0de-4e3f-ae97-b5c01bc58d7b',
  },
  {
    body: 'Amazing!',
    published: true,
    id: '8f9b65c7-1ae4-4286-9f5e-6ab1ab3593a2',
    author: '8c89657e-e64a-49e8-a01e-7b0d227e4dbd',
    post: 'bc5467f8-05d2-43de-95ab-1aef8fa20768',
  },
  {
    body: 'So impressing!',
    published: false,
    id: 'ff8c9c3e-c578-458a-8298-39d46ad05cad',
    author: '6d11bb37-7367-44ad-b13d-682cff7ea13c',
    post: 'e6266412-b0de-4e3f-ae97-b5c01bc58d7b',
  },
];

const db = {
  users,
  posts,
  comments,
};

export { db as default };
