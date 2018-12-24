//declaration
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//declare schema playlist
var UniversitySearchSchema = Schema({
   searchText: String,
   result: [String]
});

//init model
var UniversitySearchModel = mongoose.model('universitySearch',UniversitySearchSchema);


module.exports = {
    search: function(docs, searchText){
        var tab = [];
        docs.forEach(element => {
            tab.push(element.title_s);
        });
        var searchToSave = new UniversitySearchModel({
            searchText: searchText,
            result: tab
        });

        
        searchToSave.save(function(err){
            if(err)
                throw err;
        })

    },
   

};









