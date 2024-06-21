const express = require('express');
const usersRouter = require('./users.router');
const authorRouter = require('./author.router');
const bookRouter = require('./book.router');
const authRouter = require('./auth.router');
const { verifyToken } = require('../auth/auth');

function routerApi(app) {
    const router = express.Router();
    
    // Middleware para rutas protegidas con JWT
    router.use('/author', verifyToken);
    router.use('/book', verifyToken);
    
    // Rutas públicas
    router.get('/', (req, res) => {
        res.send("APP EN NODE JS");
    });

    // Rutas públicas para persons y users
    router.use('/users', usersRouter);
    router.use('/users', authRouter)

    // Rutas protegidas con JWT para author y book
    router.use('/author', authorRouter);
    router.use('/book', bookRouter);

    // Montar el enrutador bajo /api/v1 en la aplicación principal
    app.use('/api/v1', router);
}

module.exports = routerApi;