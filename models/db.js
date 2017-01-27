var Sequelize = require('sequelize');
var cfg = require('../config.json');

var db = {};
db.mssql = new Sequelize(`mssql://${cfg.mssql.user}:${cfg.mssql.pass}@${cfg.mssql.host}:${cfg.mssql.port}/${cfg.mssql.database}`,
    {
        logging: undefined
    });

var seq_pgsql = new Sequelize(`postgres://${cfg.pgsql.user}:${cfg.pgsql.pass}@${cfg.pgsql.host}:${cfg.pgsql.port}/${cfg.pgsql.database}`,
    {
        logging: undefined
    });


db.mssql.articles = db.mssql.import('./mssql/article.js');
db.pgsql = {
    
};

module.exports = db;