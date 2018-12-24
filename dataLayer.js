//declaration
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//for generate guid

//declare schema playlist
var BasicSearchSchema = Schema({
    title: [String],
    university: [String],
    laboratory: [String],
    author: [String], 
    keywords: [String]
});

//init model
var BasicSearchModel = mongoose.model('basicSearch',BasicSearchSchema);


module.exports = {
    search: function(docs){

        docs.forEach(element => {            
            var searchToSave = new BasicSearchModel({
                title: element.title_s,  
                university: element.structName_s,
                laboratory: element.labStructName_s,
                author: element.authFullName_s, 
                keywords: element.keyword_s
            });

            BasicSearchModel.findOne({title: element.title_s},function(err, doc){
                if(!doc){
                    searchToSave.save(function(err){                        
                        if(err)
                            console.log(err);
                    })
                }

            })
            
        });

        

    },
   

};









