const Scraper = require ('images-scraper')
const google = new Scraper.Google();
const Jimp = require("jimp");
const SearchData=require('../models/SearchData');

//Search Google Images
module.exports.GetImageFromGoogle=function(key){
    return new Promise((resolve,reject)=>{
        google.list({
            keyword: key,
            num: 16,
            detail: true,
            nightmare: {
                show: false
            }
        })
        .then(function (res) {
            resolve(res);
        }).catch(function(err) {
            reject('err', err);
        });
    })
}

//Converting Image to GrayScale
module.exports.GrayScaleImage=function(images,keys){
    console.log(images.length)
    return new Promise((resolve,reject)=>{
        let check=0;        //Check For maintaining the Promise for resolve
        images.forEach((element,index) => {
            let path=`/public/images/${keys}/${index}.jpg`
            Jimp.read(element).then(function (lenna) {
            lenna.quality(60)                 // set JPEG quality 
                 .greyscale()                 // set greyscale 
                 .write(`.${path}`); // save
            check++;
            if(check==images.length)
            resolve(`/images/${keys}/`)
            console.log(check)
            })                    
            .catch(function (err) {
                reject(err);
            }); 
        });
    
})

   
}