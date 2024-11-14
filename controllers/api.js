exports.api=function(req,res){
    res.status(200).json({
        resources:[
            {resources: 'plants',verbs:['GET','POST','PUT','DELETE']}
        ]
    });
};