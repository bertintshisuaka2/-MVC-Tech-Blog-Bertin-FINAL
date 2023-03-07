//import DataTypes and Models from sequelize 
const {DataTypes, Model} = require('sequelize');
const bcrypt = require("bcrypt");
const sequelize = require('../config/connection');
// const { beforeCreate, beforeUpdate } = require('./Blogs');

//creating the class here 
class Users extends Model{
    //will help to authenticate the power of prayer
    authenticatePassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}

//initializing the Users table and creating the columns 
Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }, 
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
           //making sure that the user's password is of the correct format"
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    },
    //here, is where the hooks are passed
    {
        // hooks: {
        //     async beforeCreat(createdUserData) {
        //         createdUserData.password = await bcrypt.hash(createdUserData.password, 10);
        //     },
        //     async beforeUpdate(updatedData) {
        //         updatedData.password = await bcrypt.hash(updatedData.password, 10);
        //     },
        // },
          //additional configurations
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: 'users',
    },
);

//export
module.exports = Users;