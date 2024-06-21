const { Model, DataTypes, Sequelize } = require('sequelize');
const { Author } = require('./author.model');

//const Author = require('./author.model'); // Importa el modelo Author para la relación

const BOOK_TABLE = 'books';

class Book extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: BOOK_TABLE,
      modelName: 'Book',
      timestamps: true,
      underscored: true // Para usar snake_case en las columnas de la base de datos
    };
  }
}
const BookSchema = {
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
    edition: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'edition'
    },
    edition_date: {
      allowNull: false,
      type: DataTypes.DATEONLY,
      field: 'edition_date'
    },
    author_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'authors',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
  };

   
  module.exports = { Book, BookSchema };

  
// Hook afterCreate para actualizar la cantidad de libros del autor
function addBookHooks(sequelize) {
    Book.init(BookSchema, Book.config(sequelize));
  
    Book.addHook('afterCreate', async (book, options) => {
      await Author.increment('quantity', { where: { id: book.author_id } });
    });
  }
  
  module.exports = { Book, BookSchema, addBookHooks };
 

