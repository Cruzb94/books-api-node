const BookService = require ('../services/book.service');
const { validationResult } = require('express-validator');


const service = new BookService();

const create = async ( req, res ) => {
    // Manejar errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

    try{
        const response = await service.create(req.body)
            res.json({ success: true, data: response});
        }catch(error){
            res.status(500).send({ success: false, message: error.message });
        }  
}

const get = async (req, res) => {
    try {
        const response = await service.find();
        res.json(response);
    } catch(error){
        res.status(500).send({ success: false, message: error.message });
    }  
}
const getById = async (req, res) => {
    try {
        const {id} = req.params;
        const response = await service.findOne(id);
        res.json(response);
    } catch(error){
        res.status(500).send({ success: false, message: error.message });
    }  
}
const update = async (req, res) => {
    // Manejar errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

    try {
        const {id} = req.params;
        const body = req.body;
        const response = await service.update(id,body);
        res.json(response);
    } catch(error){
        res.status(500).send({ success: false, message: error.message });
    }  
}
const _delete = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await service.delete(id);
        res.json(response);
    } catch(error){
        res.status(500).send({ success: false, message: error.message });
    }  
}

module.exports = {
    create,
    get,
    getById,
    update,
    _delete
}