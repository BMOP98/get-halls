const express = require('express');
const router = express.Router();
const connection = require('../../modules/dbconect');

router.get('/', async (req, res) => {
    connection.query('SELECT * FROM halls', (err, results) => {
        if (err) {
            console.log("ERROR " + err.message);
            return res.status(500).json({ err: err.message });
        }
        if(results.length > 0){
            res.status(200).json(results);
        }else{
            res.status(404).json("Halls not found");
        }
    });
});

router.get('/:capacity/:price', async (req, res) => {
    const { capacity, price } = req.params;
    if(capacity === "More"){
        if(price === "More1"){
            connection.query('SELECT * FROM halls', (err, results) => {
                if (err) {
                    console.log("ERROR " + err.message);
                    return res.status(500).json({ err: err.message });
                }
                if(results.length > 0){
                    res.status(200).json(results);
                }else{
                    res.status(404).json("Halls not found");
                }
            });
        }else{
            connection.query('SELECT * FROM halls WHERE price <= ?',[price], (err, results) => {
                if (err) {
                    console.log("ERROR " + err.message);
                    return res.status(500).json({ err: err.message });
                }
                if(results.length > 0){
                    res.status(200).json(results);
                }else{
                    res.status(404).json("Halls not found");
                }
            });
        }
    }else{
        if(price === "More1"){
            connection.query('SELECT * FROM halls WHERE capacity <= ?',[ capacity], (err, results) => {
                if (err) {
                    console.log("ERROR " + err.message);
                    return res.status(500).json({ err: err.message });
                }
                if(results.length > 0){
                    res.status(200).json(results);
                }else{
                    res.status(404).json("Halls not found");
                }
            });
        }else{
            connection.query('SELECT * FROM halls WHERE capacity <= ? and price <= ?',[ capacity, price], (err, results) => {
                if (err) {
                    console.log("ERROR " + err.message);
                    return res.status(500).json({ err: err.message });
                }
                if(results.length > 0){
                    res.status(200).json(results);
                }else{
                    res.status(404).json("Halls not found");
                }
            });
        }
    }
    
});

router.get('/:idhall', async (req, res) => {
    const { idhall } = req.params;
    connection.query('SELECT * FROM halls WHERE idhalls = ?', [idhall], (err, results) => {
        if (err) {
            console.log("ERROR " + err.message);
            return res.status(500).json({ err: err.message });
        }
        if(results.length > 0){
            res.status(200).json(results);
        }else{
            res.status(404).json("Hall not found");
        }
    });
});

module.exports = router;
