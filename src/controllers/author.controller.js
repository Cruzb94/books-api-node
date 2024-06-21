const { validationResult } = require('express-validator');
const AuthorService = require ('../services/author.service');
const xlsx = require('xlsx');
const ExcelJS = require('exceljs');

const service = new AuthorService();

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

const exportToExcel = async (req, res) => {
    try {
      const authors = await service.find();
  
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Authors');
  
      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Date of Birth', key: 'date_birth', width: 15 },
        { header: 'Literary Genre', key: 'literary_genre', width: 30 },
        { header: 'Quantity', key: 'quantity', width: 10 },
        { header: 'Created At', key: 'createdAt', width: 20 },
        { header: 'Updated At', key: 'updatedAt', width: 20 },
      ];
  
      authors.forEach((author) => {
        worksheet.addRow(author);
      });
  
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=authors.xlsx');
  
      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  };

module.exports = {
    create,
    get,
    getById,
    update,
    _delete,
    exportToExcel
}