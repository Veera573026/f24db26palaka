<<<<<<< HEAD
// API for our resources
exports.api = function(req, res) {
    res.write('[');
    res.write('{"resource":"spices", ');
=======
exports.api = function(req, res) {
    res.write('[');
    res.write('{"resource":"galaxies", ');
>>>>>>> 7aed5c59f629a1cdde052b98f4532532eb01c877
    res.write(' "verbs":["GET","PUT", "DELETE"] ');
    res.write('}');
    res.write(']')
    res.send();
<<<<<<< HEAD
   };
   
=======
  };
  
    
>>>>>>> 7aed5c59f629a1cdde052b98f4532532eb01c877
