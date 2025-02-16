const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
// add template engine
const hbs = require('express-handlebars');

// setup template engine directory and files extensions
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }))

const articleRoutes = require('/routes/article'); //importing article route

app.use ('/', articleRoutes);
app.use('/article', articleRoutes)

app.get('/', (req, res) => {
    let query = "SELECT * FROM article";
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        res.render('index', {
            articles: articles
    })
    res.render('index', {
        articles: articles
    })
})})

// Show article by this slug
app.get('/article/:slug', (req, res) => {
    let query = `SELECT * FROM article WHERE slug="${req.params.slug}"`
    let article
    con.query(query, (err, result) => {
        if (err) throw err;
        article = result[0]
        if (article.author_id) {
            let authorQuery = `SELECT name FROM author WHERE id=${article.author_id}`;
             con.query(authorQuery, (err, authorResult) => {
                if (err) throw err;
                    let authorName = authorResult.length > 0 ? 
                    authorResult[0].name : 'Unknown Author';
                    article.authorName = authorResult[0].name;
                    res.render('article', {
                        article: article,
                        author_name: authorName
            })
        })
    }
    })
});

app.listen(3003, () => {
    console.log('App is started at http://localhost:3003')
})