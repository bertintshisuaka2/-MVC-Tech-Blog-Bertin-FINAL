//import the Model and Datatypes from squelize, and sequelize
const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/connection');

//creating th class Blogs
class Blogs extends Model{}

Blogs.init(
    //entering the columns and their types for the Blogs table
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }, 
        user_id: {
            //setting up a foreign key referencing the Users table
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true, 
        modelName: 'blogs'
    }
);

module.exports = Blogs;