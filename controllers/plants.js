// Handle a single view with ID specified by query
exports.plant_view_one_Page = async function (req, res) {
  console.log("Single view for ID: " + req.query.id);
  try {
      const result = await Plant.findById(req.query.id);
      if (!result) {
          return res.status(404).send(`{'error': 'No plant found with ID ${req.query.id}'}`);
      }
      res.render('plantdetail', { title: 'Plant Detail', toShow: result });
  } catch (err) {
      res.status(500).send(`{'error': '${err}'}`);
  }
};
