"use strict";

module.exports = function(sequelize, Datatypes) {
    return sequelize.define('article', {
        id: {
            primaryKey: true,
            type: Datatypes.INTEGER
        },
        category: Datatypes.INTEGER,
        title: Datatypes.TEXT,
        link: Datatypes.TEXT,
        shortDesc: Datatypes.TEXT,
        intro: Datatypes.TEXT,
        author: Datatypes.TEXT,
        body: Datatypes.TEXT,
        keywords: Datatypes.TEXT,
        description: Datatypes.TEXT,
        dateCreate: Datatypes.DATE
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'libraryArticles'
    });
} 