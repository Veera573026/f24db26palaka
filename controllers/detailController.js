var Potion = require('../models/potion');
 
exports.potion_view_one_Page = async function (req, res) {
    console.log('Single view for id ' + req.query.id);
    try {
      const result = await Potion.findById(req.query.id);
      res.render('potiondetail', {
        title: 'Potion Detail',
        toShow: result,
      });
    } catch (err) {
      res.status(500);
      res.send(`{'error': '${err}'}`);
    }
  };

  exports.potion_create_Page = function (req, res) {
    console.log("Create view");
    try {
      res.render('potioncreate', { title: 'Create Potion' });
    } catch (err) {
      res.status(500);
      res.send(`{'error': '${err}'}`);
    }
  };
 
  exports.potion_update_Page = async function(req, res) {
    console.log("Update view for item " + req.query.id);
    try {
      let result = await Potion.findById(req.query.id);
      res.render('potionupdate', { title: 'Potion Update', toShow: result });
    } catch (err) {
      res.status(500);
      res.send(`{'error': '${err}'}`);
    }
  };

  exports.potion_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await Potion.findById(req.query.id)
    res.render('potiondelete', { title: 'Potion Delete', toShow:
   result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };