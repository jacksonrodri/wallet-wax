var express = require('express');
var router = express.Router();
const Story = require('../models/stories')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


// Get all Stories
router.get('/', async(req, res)=>{
	try{
		const stories = await Story.find()
		res.json(stories)
	}catch(err){
		res.send("Error", err)
	}
})

router.post('/', async(req, res)=>{
	const newStory = new Story({
    name: req.body.name,
    content: req.body.content,
    NFT_Assets: req.body.NFT_Assets
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

module.exports = router;
