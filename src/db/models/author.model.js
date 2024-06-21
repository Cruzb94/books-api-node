const { Model, DataTypes, Sequelize } = require('sequelize');


const AUTHOR_TABLE = 'authors';

class Author extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: AUTHOR_TABLE,
      modelName: 'Author',
      timestamps: true,
      underscored: true // Para usar snake_case en las columnas de la base de datos
    };
  }
}

const AuthorSchema = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'name'
    },
    date_birth: {
      allowNull: false,
      type: DataTypes.DATEONLY, // Solo fecha sin hora
      field: 'date_birth'
    },
    literary_genre: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'literary_genre'
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0 // Valor inicial de quantity es 0
    }
  };

  module.exports = { Author, AuthorSchema };