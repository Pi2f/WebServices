//declaration
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//declare schema playlist
var CoautSearchSchema = Schema({
   searchText: String,
   result: [String]
});

//init model
var CoautSearchModel = mongoose.model('coautSearch',CoautSearchSchema);


module.exports = {
    search: function(docs, searchText){
        var tab = [];
        docs.forEach(element => {
            element.authFullName_s.forEach(author =>{
                if(!author.includes(searchText) && !tab.includes(author)){
                    tab.push(author);
                }
            })
           
        });
        var searchToSave = new CoautSearchModel({
            searchText: searchText,
            result: tab
        });

        
        searchToSave.save(function(err){
            if(err)
                throw err;
        })

    },
   

};









