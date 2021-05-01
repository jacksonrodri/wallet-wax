var express = require('express');
var router = express.Router();
const Story = require('../models/stories');
const jwt = require('jsonwebtoken');
const multer = require('multer')
const axios = require('axios').default;

const { spawn } = require("child_process")


router.post('/login', async(req, res)=>{
	try{
		const { username } = req.body;
		const token = jwt.sign({username}, 'secret', { expiresIn: '365d' });
		res.status(200).json({token});
	}catch(err){
		res.send("Error", err)
	}
});

// Get Assets by User name Using Python
// router.get('/assets/:name', async (req, res) => {
// 	try {
// 		// const {authorization} = req.headers;
// 		// const {username} = jwt.verify(authorization, 'secret');

// 		const username = req.params.name

// 		var assetsData;
// 		var Assets
// 		var rawData
// 		const python = spawn('python', ['./Python/Get_User_Assets.py', username])

// 		python.stdout.on('data', function(data){
// 			console.log('Pipe data from python script....')
// 			assetsData = data.toString();
			
// 			// Add Regex to get only asset numbers
// 			var assetId = /\d+/g
// 			Assets = assetsData.match(assetId)
// 		})
// 		python.on('close', ()=>{
// 			console.log(`Assets of ${username} `,Assets)
// 			// assetsId = Assets[0]
// 			// console.log(assetsId)
// 			var i
// 			for (i = 0; i < Assets.length; i++){
// 				console.log(i)
// 				id = Assets[i]
// 				console.log(id)

// 				const python2 = spawn('python', ['./Python/Get_Asset_image.py', Assets[i]])
				

// 				python2.stdout.on('data', function(data){
// 					rawData = data.toString()
// 					console.log(rawData, id)
// 					img = rawData.slice(0, 67)
// 					name1 = rawData.slice(69,-2)
// 				})

// 				python2.on('close', (code)=>{
// 					id = Assets[i]
					
// 					return res.status(200).json({
// 													AssetImage: img,
// 													AssetName: name1,
// 													AssetId: id
// 					})
// 				})
// 			}
// 		})

		
// 	}catch(err) {
// 		res.status(500).send("Error"+ err);
// 	}
// });


// Get Assets by User name Using Axios
router.get('/assets/:name', async (req, res) => {
	try {
		// const {authorization} = req.headers;
		// const {username} = jwt.verify(authorization, 'secret');

		const username = req.params.name
		axios.get(
			`https://wax.api.atomicassets.io/atomicassets/v1/assets?owner=${username}&page=1&limit=100&order=desc&sort=asset_id`)
					.then((response) => {
						const { data } = response.data;
						// console.log(data)

						// For All Asset
						console.log("For All Asset")
						for(i = 0; i< data.length; i++){
							asset = data[i]
							// console.log(i)
							// console.log(asset.asset_id)
							assetId = asset.asset_id
							assetName = asset.name
		
							temp = asset.data
							assetImage = temp.img
							// console.log(assetId, assetName, assetImage)
							console.log(i+1)
							console.log("AssetImage: ",assetImage)
							console.log("AssetName: ", assetName,)
							console.log("AssetId:", assetId)

							res.status(200).json({
															AssetImage: assetImage,
															AssetName: assetName,
															AssetId: assetId
													})
						}
					})

	}catch(err){
		res.send("Error", err)
	}
})

// Get all Stories
router.get('/', async(req, res)=>{
	try{
		const stories = await Story.find()
		res.json(stories)
	}catch(err){
		res.send("Error", err)
	}
})

// Insert New Story

// For Uploading Image

var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './public/uploads')
	},
	filename: function(req, file, cb){
		cb(null, Date.now() + '_' + file.originalname)
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

router.post('/', upload.single('image'), async(req, res)=>{
	// console.log(req.file)
	const newStory = new Story({
    name: req.body.name,
    content: req.body.content,
    NFT_Assets: req.body.NFT_Assets,
	image: req.file.path
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
