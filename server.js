const express = require('express');
const path = require('path');
const compression = require('compression');
const cors = require('cors');

const PORT = process.env.PORT || 80;
const app = express();

const PUBLIC_FOLDER = 'public';

//seconds * minutes * hours * days
const cacheTime = 60 * 60 * 24 * 365;
const robots = require('express-robots-txt');

app.use(compression());

app.use(cors({ origin: ['http://localhost:3003'] }));

app.use(
  express.static(PUBLIC_FOLDER, {
    setHeaders: ((res, path, stat) => {
      if (path.includes('.html')) {
        res.set('Cache-Control', `no-cache`);
        return;
      }
      res.set('Cache-Control', `max-age=${cacheTime}`);
    })
  })
);

const robotsFilePath = path.join(__dirname, '/robots.txt');
app.use(robots(robotsFilePath));

const rootFilePath = path.join(__dirname, `/${PUBLIC_FOLDER}/index.html`);

// app.get('/sitemap.xml', (req, res) => {
//   res.sendFile(path.join(__dirname, `sitemap.xml`));
// });

app.get('*', (req, res) => {
  res.set('Cache-Control', `no-cache`);
  res.sendFile(rootFilePath);
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
