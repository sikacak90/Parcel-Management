import express from 'express';
import QRModel from '../models/QRModel.js';


const router = express.Router();


//Add QRCode
router.post('/add', async (req, res) => {
    console.log(req.body);
    const QRcode = req.body.QRCode;

    const newQR = await QRModel.create({
        QRCode: QRcode
    });

    newQR.save()
    .then(() => res.json('QR added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/getQR', async (req, res) => {
    QRModel.find()
    .then(QR => res.json(QR))
    .catch(err => res.status(400).json('Error: ' + err));
});

export default router;