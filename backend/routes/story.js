var express = require('express');
var router = express.Router();
const Story = require('../models/stories');
const jwt = require('jsonwebtoken');
const multer = require('multer')
const axios = require('axios').default;

const { spawn } = require("child_process");
const { response } = require('../app');


router.post('/login', async(req, res)=>{
	try{
		const { username } = req.body;
		const token = jwt.sign({username}, 'secret', { expiresIn: '365d' });
		res.status(200).json({token});
	}catch(err){
		res.send("Error", err)
	}
});

// Get Assets by User name
router.get('/assets', async (req, res) => {
	try {
		const {authorization} = req.headers;
		const {username} = jwt.verify(authorization, 'secret');

		axios.get(
			`https://wax.api.atomicassets.io/atomicassets/v1/assets?owner=${username}&page=1&limit=100&order=desc&sort=asset_id`)
					.then((response) => {
						const { data } = response.data;

						// For All Asset
						console.log(`All Asset of ${username}`)
						let arr = []
						for(i = 0; i< data.length; i++){
							asset = data[i]
							assetId = asset.asset_id
							assetName = asset.name
		
							temp = asset.data
							assetImage = temp.img
							console.log(i+1)
							console.log("AssetImage: ",assetImage)
							console.log("AssetName: ", assetName,)
							console.log("AssetId:", assetId)

							arr.push({AssetImage: assetImage,
								AssetName: assetName,
								AssetId: assetId
							})
						}
						res.status(200).json(arr)
					})

	}catch(err){
		res.send("Error", err)
	}
})

// Get all Stories
router.get('/stories', async(req, res)=>{
	try{
		const stories = await Story.find()
		res.json(stories)
	}catch(err){
		res.send("Error", err)
	}
})

// Check user has Asset for the story 

router.get('/story/:id', async(req, res)=>{
	const {authorization} = req.headers;
	const {username} = jwt.verify(authorization, 'secret');
	storyId = req.params.id

	try{
		const stories = await Story.findOne({ _id: storyId})

		assetIdDb = stories.assetIds
		storyContent = stories.content
		axios.get(
			`https://wax.api.atomicassets.io/atomicassets/v1/assets?owner=${username}&page=1&limit=100&order=desc&sort=asset_id`)
			.then(
				(response)=>{
					const { data } = response.data;
					// console.log(data)
					let assetId =[]
					for(i=0; i< data.length; i++){
						asset = data[i]
						assetId.push(asset.asset_id)
					}
					console.log("Users",assetId)
					console.log("Story",assetIdDb)

					let flag
					for(i in assetId){
						for(j in assetIdDb){
							if(assetId[i].localeCompare(assetIdDb[j])){
								flag = true
							}else{
								flag = false
							}
						}
					}
					if(flag == true){
						console.log("Verified")
						res.status(200).json({"Story": storyContent})
					}else{
						res.status(401).json({ Message: "User dont have requred NFT for this story"})
					}
				}
			)
	}catch(err){
		res.send("Error"+err)
	}
})

// Insert New Story

// For Uploading Image

var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './public/uploads')
	},
	filename: function(req, file, cb){
		// cb(null, Date.now() + '_' + file.originalname)
		cb(null, file.originalname)
	}
})

var fileFilter = (req, file, cb)=>{
	if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/JPG'){
		cb(null, true)
	}else{
		cb(null, false)
	}
}

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
})

router.post('/add-story', upload.single('image'), async(req, res)=>{
	const newStory = new Story({
    name: req.body.name,
    content: req.body.content,
    assetIds: req.body.assetIds,
	// image: req.file.path
	image: req.file.originalname
  })
  try{
		const S = await newStory.save()
      	res.json(S)
	}catch(err){
		res.send("Error", err)
	}
})

// Get perticular Story
router.get('/:id', async(req, res)=>{
	try{
		const s = await Story.findById(req.params.id)
		res.json(s)
	}catch(err){
		res.send("Error"+ err)
	}
})

// Delete story

router.delete('/delete/:id', async(req, res)=>{
	try{
		const s = await Story.findById(req.params.id)
		const res = await s.deleteOne({_id: toString(s)});
	}catch(err){
		res.send("Error", err)
	}
})

module.exports = router;
