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
        let url=images.map(item=>item.thumb_url);                       //Getting Url Of images
        return imageScrape.GrayScaleImage(url,req.body.keyword)  //Converting Images to Grayscale
    })
    .then((imagePath)=>{
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
            if(err){
                res.json({
                    message:"Server Error"
                })
            } else
            {
                var top15=files.slice(0, 15).map(i =>i);
                var obj={
                    Images:req.body.keyword,
                    Keys:files,
                    imagepath:imagePathFolder+"/"+req.body.keyword+"/",
                    message:""
                }
                res.json(obj);
            }
           
        })
    }).catch(err=>{throw err;});
})

//Get Saved Images
router.post('/getSavedImages',(req,res)=>{
    imageDB.GetImagebyKey(req.body.keyword,(err,result)=>{
        if (err)
        throw err;
        else{
            fs.readdir("./public/"+imagePathFolder+"/"+req.body.keyword+"/", (err, files) => {
                if(err){
                    console.log(err)
                    res.json({
                        message:"Server Error"
                    })
                }
                else{
                    var top15=files.slice(0, 15).map(i =>i)
                    res.json({
                        Keys:result.keys,
                        imagepath:imagePathFolder+"/"+req.body.keyword+"/",
                        images:top15,
                        message:""
                    })
                }
                
            })
        }
    })
})


module.exports=router;