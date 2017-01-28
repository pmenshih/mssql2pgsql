var iconv = require('iconv-lite');
var jschardet = require("jschardet")
var models = require('./models/db.js');

// models.mssql.authenticate();
// models.pgsql.authenticate();

function copyArticles() { // функция копирования статей из из mssql в pg
  models.pgsql.sync({ force: true }); // дроп таблицы статей в пг
  models.mssql.articles.findAll({ // перебор всех статей в mssql по id
    attributes: ['id'],
    order: 'id ASC',
    // limit: 1,
  })
    .then(function (result) {
      for(var i of result) {
        this.findById(i.id) // выборка конкретной статьи
          .then((a) => { 
            transformArticle(a); // трансформирование
            article.save(); // сохранение
          });
      }
    });
}

function transformArticle(a) {  // создание инстанса статьи в pg
  var article = models.pgsql.articles.build({
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

function changeCharset() {  // преобразование кодировки элементов всех статей в pg статей в utf8
  models.pgsql.articles.findAll({
    atributes: ['id'],
    order: 'id ASC',
    // limit: 1000
  })
    .then(function (result) {
      for(var i of result) {
        this.findById(i.id)
          .then((a) => { 
            a = charsetCorrector(a);
            a.save();
          });
      }
    });
}

function charsetCorrector(article) {
  for(var s of Object.keys(article.dataValues)) { // перебор элементов статьи
    if (!article[s] || typeof(article[s]) !== 'string') continue;
    let buf = Buffer.from(article[s]);
    let encoding = jschardet.detect(buf).encoding;
    if(/UTF-8|ascii/.test(encoding)) continue;  // utf8/ascii оставляем в покое
    // преобразование определенной кодировки в utf8
    // if(encoding === 'windows-1252') {
    //   console.log(`windows-1252: ${article.id} ${s} ${article[s]}`);
    //   article[s] = iconv.decode(iconv.encode(article[s], 'win1252'), 'utf8');
    // }
    // else if(encoding === 'SHIFT_JIS') {
    //   console.log(`SHIFT_JIS: ${article.id} ${s}`);
    //   article[s] = iconv.decode(iconv.encode(article[s], 'Shift_JIS'), 'utf8');
    // }
    // else if(encoding === 'IBM855') {
    //   console.log(`IBM855: ${article.id} ${s}`);
    //   article[s] = iconv.decode(iconv.encode(article[s], 'ibm855'), 'utf8');
    // }
    // else if(encoding === 'GB2312') {
    //   console.log(`GB2312: ${article.id} ${s}`);
    //   article[s] = iconv.decode(iconv.encode(article[s], 'GB2312'), 'utf8');
    // }
    // else 
    console.log(encoding);
  }
  return article;
}

// changeCharset();

