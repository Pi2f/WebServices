//declaration
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//for generate guid

//declare schema playlist
var LaboratorySearchSchema = Schema({
   searchText: String,
   result: [String]
});

//init model
var LaboratorySearchModel = mongoose.model('laboratorySearch',LaboratorySearchSchema);


module.exports = {
    search: function(docs, searchText){
        var tab = [];
        docs.forEach(element => {
            tab.push(element.title_s);
        });
        var searchToSave = new LaboratorySearchModel({
            searchText: searchText,
            result: tab
        });

        
        searchToSave.save(function(err){
            if(err)
                throw err;
        })

    },
   

};









