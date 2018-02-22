var Item = require('./models/item');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
// gen an instance of the express router
var router = express.Router();
var adminRouter = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route('/items')
    .get(function(req, res) {
        Item.find(function(err, items) {
            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);
            
            res.json(items); // return all nerds in JSON format
        });
    })
    .post(function(req, res) {
        console.log(req.body.name);
        var item = new Item();
        item.name = req.body.name;
        item.color = req.body.color;
        item.price = req.body.price;
        item.pictures.push(req.body.picture);
        
        item.save(function(err) {
            if (err)
            {
                console.log(err.message);
                res.status(400).send(err.message);
            }
            else    
                res.json({message: 'Item Created'});
        });
    });


adminRouter.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/admin.html'));
});

module.exports = function(app) {
    app.use('/api', router);
    app.use('/admin', adminRouter);
    
    app.get('*', function (req, res, next) {
        res.sendFile(path.join(__dirname + '/../public/index.html'));
    });
};