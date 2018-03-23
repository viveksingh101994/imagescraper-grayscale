const mongoose=require('mongoose');
const config=require('../config/database');

const imgSearchSchema=mongoose.Schema({
    keys:{
        type:String,
        require:true
    },
    ImagePath:{
        type:String,
        require:true
    }
})


const ImageSearch=module.exports=mongoose.model('searchimg',imgSearchSchema);

//Query For Getting Images By Keyword
module.exports.GetImagebyKey=function(key,callback){
    let query={keys:key};
    ImageSearch.findOne({keys:key},{keys:'a',ImagePath:''},callback)
}

//Query For Getting All Images
module.exports.GetAllKeys=function(callback){
    ImageSearch.distinct("keys",callback)
}

//Query For Adding or Update Image
module.exports.addOrUpdateSearch=function(item,callback){
    let query={
                keys:item.keys,
                ImagePath:item.imagepath
              };
              
    ImageSearch.update(query, query, {upsert:true},callback);
}

module.exports.ImagePath="./images/";
