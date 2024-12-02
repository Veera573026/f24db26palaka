// // controllers/plant.js
// var plant = require('../models/plants'); 

// // List of all plants
// exports.plant_list = async function(req, res) {
//     try {
//         let theplants = await plant.find();
//         res.json(theplants);
//     } catch (err) {
//         res.status(500).send({"error": `${err}`});
//     }
// };

// // View all plants
// exports.plant_view_all_Page = async function(req, res) {
//     try {
//         const theplants = await plant.find(); 
//         res.render('plants', { title: 'plant Search Results', results: theplants });
//     } catch (err) {
//         res.status(500);
//         res.send({"error": `${err}`});
//     }
// };

// // Handle plant creation on POST
// exports.plant_create_post = async function(req, res) {
//     console.log(req.body);
//     let document = new plant();
//     // Populate the plant fields from the request body
//     document.plant_name = req.body.plant_name;
//     document.plant_type = req.body.plant_type;
//     document.plant_age = req.body.plant_age;
//     try {
//         let result = await document.save();
//         res.send(result); // Send back the saved plant document
//     } catch (err) {
//         res.status(500);
//         res.send({"error": `${err}`});
//     }
// };



//    // Get details of a specific plant
//    exports.plant_detail = async function(req, res) {
//     console.log("detail" + req.params.id); // Log the ID to verify
//     try {
//         // Use findById to fetch the plant by ID from the database
//         let result = await plant.findById(req.params.id);
//         res.send(result); // Send the plant details as JSON
//     } catch (error) {
//         res.status(500); // Send an error status if not found
//         res.send(`{"error": "Document for id ${req.params.id} not found"}`);
//     }
// };
// //     res.send('NOT IMPLEMENTED: plant detail: ' + req.params.id);
// // };

// // Handle plant delete on DELETE
// exports.plant_delete = async function(req, res) {
//     console.log("delete" + req.params.id)
//     try{
//         result = await plant.findByIdAndDelete(req.params.id)
//         console.log("Removed" + result)
//         res.send(result)
//     }catch (err){
//         res.status(500)
//         res.send(`{"error":Error deleting ${err}}`);
//     }
// };



// // Handle plant update on PUT
// exports.plant_update_put = async function(req, res) {
//     console.log(`update on id${req.params.id}with body ${JSON.stringify(req.body)}`)
//     try{
//         let toUpdate =await plant.findById(req.params.id)
//         //Do updates of properties
//         if(req.body.plant_type)
//             toUpdate.plant_type=req.body.plant_type;
//             if(req.body.plant_name) toUpdate.plant_name = req.body.plant_name;
//             if(req.body.plant_type) toUpdate.plant_type = req.body.plant_type;
//             if(req.body.plant_age) toUpdate.plant_age = req.body.plant_age;
//             let result = await toUpdate.save();
//             res.send(result)    
//     } catch(err){
//         res.status(500)
//         res.send(`{"error":${err}: Update for id ${req.params.id}failed`);
//     }
//     };

    
// // Handle a show one view with id specified by query
// exports.plant_view_one_Page = async function(req, res) {
//     console.log("single view for id " + req.query.id); // Log the ID to debug
//     try {
//         let result = await plant.findById(req.query.id); // Find the plant by ID
//         if (result) {
//             res.render('plantdetail', { title: 'plant Detail', toShow: result });
//         } else {
//             res.status(404).send(`{'error': 'plant not found'}`);
//         }
//     } catch (err) {
//         res.status(500).send(`{'error': '${err}'}`);
//     }
// };


// // Handle building the view for creating a plant.
// // No body, no in-path parameter, no query.
// // Does not need to be async
// exports.plant_create_Page = function (req, res) {
//     console.log("create view");
//     try {
//         res.render('plantcreate', { title: 'plant Create' });
//     } catch (err) {
//         res.status(500).send(`{'error': '${err}'}`);
//     }
// };


// // Handle building the view for updating a plant.
// // Query provides the id

// exports.plant_update_Page = async function (req, res) {
//     console.log("update view for item " + req.query.id);
//     try {
//         let result = await plant.findById(req.query.id);
//         res.render('plantupdate', { title: 'plant Update', toShow: result });
//     } catch (err) {
//         res.status(500).send(`{'error': '${err}'}`);
//     }
// };

// // Handle a delete one view with id from query
// exports.plant_delete_Page = async function(req, res) {
//     console.log("Delete view for id " + req.query.id)
//     try{
//     result = await plant.findById(req.query.id)
//     res.render('plantdelete', { title: 'plant Delete', toShow:
//    result });
//     }
//     catch(err){
//     res.status(500)
//     res.send(`{'error': '${err}'}`);
//     }
//    };
 


// controllers/plant.js
var plant = require('../models/plants');
 
// List of all plants
exports.plant_list = async function(req, res) {
    try {
        let theplants = await plant.find();
        res.json(theplants);
    } catch (err) {
        res.status(500).send({"error": `${err}`});
    }
};
 
// View all plants
exports.plant_view_all_Page = async function(req, res) {
    try {
        const theplants = await plant.find();
        res.render('plants', { title: 'plant Search Results', results: theplants });
    } catch (err) {
        res.status(500);
        res.send({"error": `${err}`});
    }
};
 
// Handle plant creation on POST
exports.plant_create_post = async function(req, res) {
    console.log(req.body);
    let document = new plant();
    // Populate the plant fields from the request body
    document.plant_name = req.body.plant_name;
    document.plant_origin = req.body.plant_origin;
    document.plant_cost = req.body.plant_cost;
 
    try{
        let result = await document.save();
        res.send(result);
        }
    catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
        }
};
 
   // Get details of a specific plant
   exports.plant_detail = async function(req, res) {
    console.log("detail" + req.params.id); // Log the ID to verify
    try {
        // Use findById to fetch the plant by ID from the database
        let result = await plant.findById(req.params.id);
        res.send(result); // Send the plant details as JSON
    } catch (error) {
        res.status(500); // Send an error status if not found
        res.send(`{"error": "Document for id ${req.params.id} not found"}`);
    }
};
//     res.send('NOT IMPLEMENTED: plant detail: ' + req.params.id);
// };
 
// Handle plant delete on DELETE
exports.plant_delete = async function(req, res) {
    console.log("delete" + req.params.id)
    try{
        result = await plant.findByIdAndDelete(req.params.id)
        console.log("Removed" + result)
        res.send(result)
    }catch (err){
        res.status(500)
        res.send(`{"error":Error deleting ${err}}`);
    }
};
 
 
 
// Handle plant update on PUT
exports.plant_update_put = async function(req, res) {
    console.log(`update on id${req.params.id}with body ${JSON.stringify(req.body)}`)
    try{
        let toUpdate =await plant.findById(req.params.id)
        //Do updates of properties
        if(req.body.plant_type)
            toUpdate.plant_type=req.body.plant_type;
            if(req.body.plant_name) toUpdate.plant_name = req.body.plant_name;
            if(req.body.plant_origin) toUpdate.plant_origin = req.body.plant_origin;
            if(req.body.plant_cost) toUpdate.plant_cost = req.body.plant_cost;
            let result = await toUpdate.save();
            res.send(result)    
    } catch(err){
        res.status(500)
        res.send(`{"error":${err}: Update for id ${req.params.id}failed`);
    }
    };
 
   
// Handle a show one view with id specified by query
exports.plant_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id); // Log the ID to debug
    try {
        let result = await plant.findById(req.query.id); // Find the plant by ID
        if (result) {
            res.render('plantdetail', { title: 'plant Detail', toShow: result });
        } else {
            res.status(404).send(`{'error': 'plant not found'}`);
        }
    } catch (err) {
        res.status(500).send(`{'error': '${err}'}`);
    }
};
 
 
// Handle building the view for creating a plant.
// No body, no in-path parameter, no query.
// Does not need to be async
exports.plant_create_Page = function (req, res) {
    console.log("create view");
    try {
        res.render('plantcreate', { title: 'plant Create' });
    } catch (err) {
        res.status(500).send(`{'error': '${err}'}`);
    }
};
 
 
// Handle building the view for updating a plant.
// Query provides the id
 
exports.plant_update_Page = async function (req, res) {
    console.log("update view for item " + req.query.id);
    try {
        let result = await plant.findById(req.query.id);
        res.render('plantupdate', { title: 'plant Update', toShow: result });
    } catch (err) {
        res.status(500).send(`{'error': '${err}'}`);
    }
};
 
// Handle a delete one view with id from query
exports.plant_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await plant.findById(req.query.id)
    res.render('plantdelete', { title: 'plant Delete', toShow:
   result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };
