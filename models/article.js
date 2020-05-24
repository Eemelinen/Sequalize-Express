'use strict';
const Sequelize = require('sequelize');
// NPM package for formatting timestamps
const moment = require('moment');

module.exports = (sequelize) => {
    class Article extends Sequelize.Model {

        publishedAt() {
            // Formatting release date
            const date = moment(this.createdAt).format('MMMM D YYYY h:mma');
            return date;
        }
        shortDescription() {
            const shortDesc = this.body.length > 200 ? this.body.substring(0, 200) + "..." : this.body ;
            return shortDesc;
        }
    }

    Article.init({
        title: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: {
                    msg: '"Title" is required'
                }
            }
        },
        author: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: {
                    msg: '"Author" is required'
                }
            }
        },
        body: Sequelize.TEXT
    }, {
        sequelize
    });

    return Article;
};