// importing the Models and DataTypes
const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/connection');

//creating the class
class Comments extends Model{}

//creating the Comments table 
Comments.init(
    //columns and their fields
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment_description: {
            type: DataTypes.STRING
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        blog_id: {
            type: DataTypes.INTEGER,
            //foreign key referencing the blogs tables
            references: {
                model: 'blogs',
                key: 'id'
            }
        }, 
        user_id: {
            type: DataTypes.INTEGER,
            //foreign key referencing the users table
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
        modelName: 'comment',
      }
);

//export
module.exports = Comments;