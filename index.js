var models = require('./models/db.js');

models.mssql.articles.findAll({
    attributes: ['id'],
    order: 'id ASC',
    limit: 1,
})
    .then(function (result) {
        for(var i of result) {
            this.findById(i.id).then((a) => { transformArticle(a); });
        }
    });

function transformArticle(article) {
    console.log(article.title);
}

