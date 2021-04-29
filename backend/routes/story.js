var express = require('express');
var router = express.Router();
const Story = require('../models/stories');
const jwt = require('jsonwebtoken');
const multer = require('multer')

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

// Get Assets by User name
router.get('/assets', async (req, res) => {
	try {
		const {authorization} = req.headers;
		const {username} = jwt.verify(authorization, 'secret');

		var assetsData;
		var Assets
		const python = spawn('python', ['./Python/Get_User_Assets.py', username])

		python.stdout.on('data', function(data){
			console.log('Pipe data from python script....')
			assetsData = data.toString();
			
			// Add Regex to get only asset numbers
			var assetId = /\d+/g
			Assets = assetsData.match(assetId)
		})

		python.on('close', ()=>{
			res.status(200).json(Assets)
		})
		
	}catch(err) {
		res.status(500).send("Error", err);
	}
});

// Get Image of Assest
router.get('/assetsImage', (req, res)=>{
	try{
		const {authorization} = req.headers;
		const {assetsImage} = jwt.verify(authorization, 'secret');
		// var assetsImage = req.params.id
		const python = spawn('python', ['./Python/Get_Asset_image.py', assetsImage])

		var img
		python.stdout.on('data', function(data){
			img = data.toString()
		})

		python.on('close', (code)=>{
			console.log(`child process close all stdio with code ${code}`)
			// res.send(img)
			res.status(200).json(img)

		})
	}catch(err) {
		res.status(500).send("Error", err);
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
		res.send("Error", err)
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
