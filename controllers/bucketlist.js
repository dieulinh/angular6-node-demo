const express = require('express');
const router = express.Router();

const bucketlist = require('../models/list');

router.get('/', (req, res) => {
  bucketlist.getAllLists((err, lists) => {
    if (err) {
      res.json({success: false, message: `Failed to load all lists. Error: ${err}`});
    } else {
      res.write(JSON.stringify({success: true, lists: lists}, null, 2));
      res.end();
    }
  });

});

router.post('/', (req, res, next) => {
  let newList = new bucketlist({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category
  });
  bucketlist.addList(newList, (err, list) => {
    if (err) {
      res.json({ success: false, message: `Failed to create a new list. Error: ${err}`});
    } else {
      res.json({success: true, message: 'Added successfully'});
    }
  });
});

router.delete('/:id', (req, res, next) => {
  let listId = req.params.id;
  bucketlist.deleteListById(listId, (err, list) => {
    if (err) {
      res.json({success: false, message: `Failed to delete the list. Error: ${err}`});
    } else if(list) {
      res.json({success: true,  message: 'Deleted successfully'});
    } else {
      res.json({success: false});
    }
  });
});
router.put('/:id', (req, res, next) => {
  res.send('UPDATE');
});

module.exports = router;