const Story = require('../models/stories');
const jwt = require('jsonwebtoken');
const axios = require('axios').default;
// const API_KEY = process.env.API_KEY

const userLogin = async (req, res) => {
    try {
      const { username } = req.body;
      const token = jwt.sign({ username }, process.env.API_KEY, { expiresIn: '365d' });
      res.status(200).json({ token });
    } catch (err) {
      res.send('Error'+err);
    }
  }

const getUserAssets = async (req, res) => {
    try {
      const { authorization } = req.headers;
      const { username } = jwt.verify(authorization, process.env.API_KEY);
  
      axios
        .get(
          `https://wax.api.atomicassets.io/atomicassets/v1/assets?owner=${username}&page=1&limit=100&order=desc&sort=asset_id`
        )
        .then((response) => {
          const { data } = response.data;
  
          // For All Asset
          console.log(`All Asset of ${username}`);
          let arr = [];
          for (i = 0; i < data.length; i++) {
            asset = data[i];
            assetId = asset.asset_id;
            assetName = asset.name;
  
            temp = asset.data;
            assetImage = temp.img;
            console.log(i + 1);
            console.log('AssetImage: ', assetImage);
            console.log('AssetName: ', assetName);
            console.log('AssetId:', assetId);
  
            arr.push({
              AssetImage: assetImage,
              AssetName: assetName,
              AssetId: assetId,
            });
          }
          res.status(200).json(arr);
        });
    } catch (err) {
      res.send('Error'+ err);
    }
  }

const verifyUserAssets = async (req, res) => {
    const { authorization } = req.headers;
    const { username } = jwt.verify(authorization, process.env.API_KEY);
    storyId = req.params.id;
  
    try {
      const stories = await Story.findOne({ _id: storyId });
  
      assetIdDb = stories.assetIds;
      
      // Regex to get all Asset ID's in a list
      var assetIdRegex = /\d+/g
      var storyAssetId = assetIdDb.match(assetIdRegex)
  
      storyContent = stories.content;
      axios
        .get(
          `https://wax.api.atomicassets.io/atomicassets/v1/assets?owner=${username}&page=1&limit=100&order=desc&sort=asset_id`
        )
        .then((response) => {
          const { data } = response.data;
          // console.log(data)
          let userAssetId = [];
          for (i = 0; i < data.length; i++) {
            asset = data[i];
            userAssetId.push(asset.asset_id);
          }
          console.log('Users', userAssetId);
          console.log('Story', storyAssetId);
  
          console.log(storyAssetId[0])
          console.log(userAssetId[0])
  
          storyAssetIdlength = storyAssetId.length
          console.log(storyAssetIdlength)
  
          let arr = []
          let requiredAsset = []
          for (i in userAssetId) {
            for (j=0; j<storyAssetId.length; j++) {
              let check = userAssetId[i] === storyAssetId[j]
              console.log(check)
  
              if (check) {
                  console.log(`Compare ${userAssetId[i]} = ${storyAssetId[j]}`)
                  arr.push(1)
                  console.log("Array:"+arr)
                  console.log(j)
                  console.log(storyAssetIdlength)
                  
                  temp = parseInt(j)+1
                  console.log(temp)
  
                  if(temp === storyAssetIdlength){
                      break
                  }
                  console.log("Flag True")
              } else {
                  requiredAsset.push(storyAssetId[j])
                  console.log("Flag False")
              }
  
            }
          }
          if (storyAssetIdlength === arr.length) {
            console.log('Verified');
            res.status(200).json({ Story: storyContent });
          } else {
            // res.status(200).json({"Story": storyContent})
            res
              .status(401)
              .json({ Message: `User dont have requred NFT for this story, And Required Assets are ${[...new Set(requiredAsset)]}` });
          }
        });
    } catch (err) {
      res.send('Error' + err);
    }
  }

module.exports = {
    userLogin,
    getUserAssets,
    verifyUserAssets
}