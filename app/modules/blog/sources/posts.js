export default [{
  id: 'title1',
  slug: 'slug-title1',
  uri: '/blog/slug-title1',
  title: 'title1',
  text: `\`\`\`javascript
  /**
   * Blog#index method
   *
   * @description Display blog index page
   * @return Render blog index view
   */
  actions: {
    create: function () {
      ...
      return this.get('newProject.participants').then(function (participants) {
        participants.pushObjects(selectedUsers);
        return this.get('newProject').save();

      }.bind(this)).then(function (project) {
        this.transitionToRoute('project.show', project.get('id'));

      }.bind(this));
    }
  }
   \`\`\`
  \`\`\`scss
   pre code {
     display: block; padding: 0.5em;
     background: $dark-gray;
     color: $very-light-gray;
   }

   pre .keyword,
   pre .tag,
   pre .django .tag,
   pre .django .keyword,
   pre .css .class,
   pre .css .id,
   pre .lisp .title {
     color: $purple;
   }
   \`\`\`
  - Teach you React. It assumes no prior knowledge.
  - Teach you JSX. It makes writing React so much more pleasant.
  - Teach you (some) ES6. This presentation only assumes ES5 familiarity.
  - Teach you React with ES6. It shows you the newer paradigm of coding React using ES6 classes.
  - Teach you server-side rendering on React using Koa.
  - **Not** teach you Flux. We won't be going over it during this workshop.`,
  author: 'author1',
  createdDate: new Date('October 10, 2015')
  },{
  id: 'title2',
  slug: 'slug-title2',
  uri: '/blog/slug-title2',
  title: 'title2',
  text: `WiFi at conferences is notoriously :shit:ty.
  This presentation is made with that in mind. In order to switch to offline mode (which doesn't rely on the omdb API but instead serves dummy data) change all references of
  \`var omdb = require('omdb-client');\`
   to
   \`var omdb = require('./fake-omdb-client');\`
   . You may also have to mess with the paths to images a bit. I intend to fix that.`,
  author: 'author2',
  createdDate: new Date('July 20, 2015')
}];
