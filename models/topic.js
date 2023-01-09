'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Topic.hasMany(models.Message, {
        foreignKey: "TopicId"
      })
      Topic.belongsTo(models.User, {foreignKey: "UserId"})
    }
  }
  Topic.init({
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    type: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Topic',
  });

  Topic.beforeCreate((instance, options) => {
    return instance.slug = (instance.name).toLocaleLowerCase().replace(/ /g, '-')
  })

  Topic.afterUpdate((instance, options) => {
    return instance.slug = (instance.name).toLocaleLowerCase().replace(/ /g, '-')
  })
  return Topic;
};