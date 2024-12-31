const express = require('express');
const router = express.Router();
const Joi = require('joi');
const xlsx = require('xlsx');
const path = require('path');

const excelFilePath = path.join(__dirname, 'merchants.xls');

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];

// Helper function to read merchants from Excel
function readMerchantsFromExcel() {
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(worksheet);
}

// Helper function to write merchants to Excel
function writeMerchantsToExcel(merchants) {
    const worksheet = xlsx.utils.json_to_sheet(merchants);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Merchants');
    xlsx.writeFile(workbook, excelFilePath);
}

// GET all courses
router.get('/api/courses', (req, res) => {
    res.send(courses);
});

// GET a specific course by ID
router.get('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Course not found');
    res.send(course);
});

// POST a new course
router.post('/api/courses', (req, res) => {
    const result = validateCourse(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// GET all merchants
router.get('/api/merchants', (req, res) => {
    const merchants = readMerchantsFromExcel();
    res.send(merchants);
});

// GET a specific merchant by ID
router.get('/api/merchants/:id', (req, res) => {
    const merchants = readMerchantsFromExcel();
    let merchant = merchants.find(m => m.id === parseInt(req.params.id));
    if (!merchant) {
        res.status(404).send('Merchant not found');
        return;
    }
    res.send(merchant);
});

// GET merchants by food type
router.get('/api/merchants/foodType/:foodType', (req, res) => {
    const merchants = readMerchantsFromExcel();
    const foodType = req.params.foodType.trim().toLowerCase();
    console.log(foodType);
    const filteredMerchants = merchants.filter(m => m.foodType.trim().toLowerCase() === foodType);
    
    if (filteredMerchants.length === 0) {
        res.status(404).send('No merchants found with the specified food type');
        return;
    }
    res.send(filteredMerchants);
});

// POST a new merchant
router.post('/api/merchants', (req, res) => {
    const merchants = readMerchantsFromExcel();

    const result = validateMerchant(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const merchant = {
        id: merchants.length + 1,
        name: req.body.name,
        location: req.body.location,
        foodType: req.body.foodType
    };
    merchants.push(merchant);
    writeMerchantsToExcel(merchants);
    res.send(merchant);
});

// PUT
router.put('/api/merchants/:id', (req, res) => {
    const merchants = readMerchantsFromExcel();
    let merchant = merchants.find(m => m.id === parseInt(req.params.id));
    if (!merchant) {
        res.status(404).send('Merchant not found');
        return;
    }

    const result = validateMerchant(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    merchant.name = req.body.name;
    merchant.location = req.body.location;
    merchant.foodType = req.body.foodType;
    writeMerchantsToExcel(merchants);
    res.send(merchant);
});

// DELETE
router.delete('/api/merchants/:id', (req, res) => {
    let merchants = readMerchantsFromExcel();
    let merchant = merchants.find(m => m.id === parseInt(req.params.id));
    if (!merchant) {
        res.status(404).send('Merchant not found');
        return;
    }

    merchants = merchants.filter(m => m.id !== parseInt(req.params.id));
    writeMerchantsToExcel(merchants);
    res.send(merchant);
});

//DELETE ALL MERCHANTS
router.delete('/api/merchants', (req, res) => {
    writeMerchantsToExcel([]);
    res.send('All merchants deleted');
});

// Validation functions
function validateCourse(course) {
    const schema = Joi.object({ name: Joi.string().min(3).required() });
    return schema.validate(course);
}

function validateMerchant(merchant) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        location: Joi.string().min(3).required(),
        foodType: Joi.string().min(3).required()
    });
    return schema.validate(merchant);
}

module.exports = router;