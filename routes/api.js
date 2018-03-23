const express=require('express');
const router=express.Router();
const imageDB=require('../models/SearchData');
const imageScrape=require('../methods/imagescraping');
const SearchData=require('../models/SearchData');
const fs=require('fs');
const imagePathFolder="images";
//Get All Search List
router.get('/getAll',(req,res)=>{
    imageDB.GetAllKeys((err,result)=>{
        if(err)
        throw err;
        else
        res.json({
            KeyList:result
        })
    })
})

//Get Keyword Images
router.post('/getImageByKey',(req,res)=>{
   imageScrape.GetImageFromGoogle(req.body.keyword)
   .then(images=>{
      let url=images.map(item=>item.url);                       //Getting Url Of images
      return imageScrape.GrayScaleImage(url,req.body.keyword)  //Converting Images to Grayscale
    }).then((imagePath)=>{
        let image=new imageDB({
            keys:req.body.keyword,
            imagepath:imagePath
        });
       
        imageDB.addOrUpdateSearch(image,(err,done)=>{
            if (err)
            throw err;
            else
            console.log("done")
        })
        fs.readdir("./public/"+imagePathFolder+"/"+req.body.keyword+"/", (err, files) => {
            var obj={
                Images:req.body.keyword,
                Keys:files,
                imagepath:imagePathFolder+"/"+req.body.keyword+"/",
            }
            console.log(obj)
            
            res.json(obj);
        })
    });
})

//Get Saved Images
router.post('/getSavedImages',(req,res)=>{
    imageDB.GetImagebyKey(req.body.keyword,(err,result)=>{
        if (err)
        throw err;
        else{
            fs.readdir("./public/"+imagePathFolder+"/"+req.body.keyword+"/", (err, files) => {

                res.json({
                    Keys:result.keys,
                    imagepath:imagePathFolder+"/"+req.body.keyword+"/",
                    images:files,
                })
            })
        }
    })
})


module.exports=router;