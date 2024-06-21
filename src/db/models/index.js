
const { User, UserSchema } = require('./users.model');
const { Author, AuthorSchema } = require('./author.model');
const { Book, BookSchema, addBookHooks } = require('./book.model');


function setupModels(sequelize) {
 User.init(UserSchema, User.config(sequelize));
 Author.init(AuthorSchema, Author.config(sequelize));
 Book.init(BookSchema, Book.config(sequelize));

   // Asociaciones
   Author.hasMany(Book, {
    as: 'books',
    foreignKey: 'author_id'
  });
  Book.belongsTo(Author, {
    as: 'author',
    foreignKey: 'author_id'
  });

  addBookHooks(sequelize);
}

module.exports = setupModels;