'use strict';

/**
 * Blog#index method
 *
 * @description Display todos index page
 * @return Render todos index view
 */

export function* index () {
   yield this.render('todos', {});
 }
