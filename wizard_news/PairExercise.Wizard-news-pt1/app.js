const morgan = require("morgan");
const express = require("express");
const postBank = require("./postBank");

const app = express();
app.use(morgan('dev'));
app.use(express.static('public'))
app.get("/", (req, res) => {

  const posts = postBank.list();
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            <a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
          
        </div>`
  ).join('')}
    </div>
  </body>
</html>`;

  res.send(html);

});

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);

  res.send(`<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
 
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            ${post.title}</br></br>${post.content}
            <small>(by ${post.name})</small></br></br>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>
     
    </div>
  </body>
</html>`);
}
);

const { PORT = 1337 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});