var models = require('./models/db.js');

// models.mssql.authenticate();
// models.pgsql.authenticate();
models.pgsql.sync({ force: true });

models.mssql.articles.findAll({
    attributes: ['id'],
    order: 'id ASC',
    // limit: 1,
})
    .then(function (result) {
        for(var i of result) {
            this.findById(i.id).then((a) => { transformArticle(a); });
        }
    });

function transformArticle(a) {
    var article = models.pgsql.articles.build(
        {
            id: a.id,
            category: a.category,
            title: a.title,
            link: a.link,
            shortDesc: a.shortDesc,
            intro: a.intro,
            author: a.author,
            body: a.body,
            keywords: a.keywords,
            description: a.description,
            createdAt: a.dateCreate
    });
    article.save();
}

