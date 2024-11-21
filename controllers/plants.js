// Get details of a specific plant by ID and render the plant details page
exports.plant_detail = async function (req, res) {
  try {
    const plant = await Plant.findById(req.params.id);  // Find a plant by its ID
    if (!plant) {
      return res.status(404).render('error', { message: 'Plant not found' });  // Render an error page
    }
    res.render('plantdetail', { title: 'Plant Detail', plant });  // Render the 'plantdetail' view with plant data
  } catch (err) {
    console.error('Error fetching plant details:', err);
    res.status(500).render('error', { message: 'Failed to fetch plant details' });  // Render an error page
  }
};
