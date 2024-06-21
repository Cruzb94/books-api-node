const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs'); // Importa bcryptjs en lugar de bcrypt

const USER_TABLE = 'users';

class User extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: true,
            underscored: true // Para usar snake_case en las columnas de la base de datos
        };
    }

        // Setter para encriptar la contraseña
        set password(value) {
            const saltRounds = 10; // Número de rondas de hashing
            const hashedPassword = bcrypt.hashSync(value, saltRounds);
            this.setDataValue('password', hashedPassword);
        }
} 


const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        field:'name'
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        field: 'email'
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'password',
        set(value) {
            // Función para encriptar la contraseña antes de guardarla en la base de datos
            const saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(value, saltRounds);
            this.setDataValue('password', hashedPassword);
        }
    }
}
  
module.exports = { User, UserSchema };