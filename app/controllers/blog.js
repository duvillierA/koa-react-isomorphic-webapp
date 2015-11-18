'use strict';

import React from 'react';
import marked from 'marked';
import hjs from 'highlight.js';
import BlogApp from '../modules/blog/components/blog';
import PostApp from '../modules/blog/components/post';
import ReactDOMServer from 'react-dom/server';

import PostsFixtures from '../modules/blog/sources/posts.js';

PostsFixtures.forEach(function(p){
  p.text = marked(p.text, {
    gfm: true,
    sanitize: true,
    breaks: true,
    tables: false,
    xhtml: true,
    highlight: (code, lang) => {
      hjs.configure({
        classPrefix: ''
      });
      return hjs.highlight(lang, code).value;
    }
  });
});

/**
 * Blog#index method
 *
 * @description Display blog index page
 * @return Render blog index view
 */

export function* index () {
  let somePosts = PostsFixtures;
  let blogApp = ReactDOMServer.renderToString(React.createElement(BlogApp, {posts: somePosts}));
  yield this.render('blog', {blogApp});
 }

 /**
  * Blog#post method
  *
  * @description Display blog post page
  * @return Render blog post view
  */

export function* post (slug) {
  // let postApp = ReactDOMServer.renderToString(React.createElement(PostApp, {post: aPost}));
  // yield this.render('blog/post', {post: postApp});
}

/**
 * Blog#post method
 *
 * @description Display blog post page
 * @return Render blog post view
 */

export function* posts () {
  let somePosts = PostsFixtures;
  this.body = {posts: somePosts};
}
