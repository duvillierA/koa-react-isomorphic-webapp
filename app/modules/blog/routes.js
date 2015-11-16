var routes = {
  'get /blog': 'blog#index',
  'get /blog/posts': 'blog#posts',
  'get /blog/posts/:slug': 'blog#post'
};

module.exports = routes;
