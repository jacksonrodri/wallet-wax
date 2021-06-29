const Story = require('../models/stories');
const jwt = require('jsonwebtoken');
const axios = require('axios').default;

const users = require('../models/users');

const userLogin = async (req, res) => {
  try {
    const { username } = req.body;
    let role = '';
    //HS: Check the username against in the database collection users, pass role from that user into the JWT token.

    const admin = await users.findOne({
      username: username,
    });
    if (admin != null) {
      role = admin.role;
    } else {
      role = 'User';
    }

    const token = jwt.sign({ username, role }, process.env.API_KEY, {
      expiresIn: '365d',
    });
    res.status(200).json({ token, role }); // HS: Send role in the response as well.
  } catch (err) {
    res.send('Error' + err);
  }
};

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
        let arr = [];
        for (i = 0; i < data.length; i++) {
          asset = data[i];
          assetId = asset.asset_id;
          assetName = asset.name;

          temp = asset.data;
          assetImage = temp.img;

          arr.push({
            AssetImage: assetImage,
            AssetName: assetName,
            AssetId: assetId,
          });
        }
        res.status(200).json(arr);
      });
  } catch (err) {
    res.send('Error' + err);
  }
};

const verifyUserAssets = async (req, res) => {
  const { authorization } = req.headers;
  const { username } = jwt.verify(authorization, process.env.API_KEY);
  storyId = req.params.id;

  try {
    const stories = await Story.findOne({ _id: storyId });

    const requiredTemplateIds = stories.templateIds.split(',');

    console.log("required Template Ids", requiredTemplateIds)

    storyContent = stories.content;

    let requiredAssetIdsCommaSeparated = [];

    for(i = 0; i<requiredTemplateIds.length; i++){
      await axios
      .get(
        `https://wax.api.atomicassets.io/atomicassets/v1/assets?template_id=${requiredTemplateIds[i]}&page=1&limit=100000&order=desc&sort=asset_id`
      ).then((response) => {
        const { data } = response.data;
        
        for(j = 0; j< data.length; j++){
          requiredAssetIdsCommaSeparated.push(data[j].asset_id)
        }
      })
    }
    
      console.log("required Asset Ids", requiredAssetIdsCommaSeparated)
      console.log("Reguired Asset Lenght", requiredAssetIdsCommaSeparated.length)

      axios
      .get(
        `https://wax.api.atomicassets.io/atomicassets/v1/assets?owner=${username}&page=1&limit=100&order=desc&sort=asset_id`
      )
      .then((response) => {
        const { data } = response.data;

        let userAssetIds = [];

        for (i = 0; i < data.length; i++) {
          userAssetIds.push(data[i].asset_id);
        }

        console.log("userAssetIds", userAssetIds)

        let approvedAssets = [];
        let deniedAssets = [];
        for (i = 0; i < requiredAssetIdsCommaSeparated.length; i++) {
          if (userAssetIds.includes(requiredAssetIdsCommaSeparated[i])) {
            approvedAssets.push(requiredAssetIdsCommaSeparated[i]);
          } else {
            deniedAssets.push(requiredAssetIdsCommaSeparated[i]);
          }
        }

        console.log("approvedAssets", approvedAssets)
        console.log("deniedAssets", deniedAssets)

        if (approvedAssets.length > 0) {
          res.status(200).json({ Story: storyContent });
        } else {
          res.status(401).json({ deniedAssets: requiredAssetIdsCommaSeparated });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: 'There is some issue on atomic assets server.' });
      });

  } catch (err) {
    res.send('Error' + err);
  }
};

module.exports = {
  userLogin,
  getUserAssets,
  verifyUserAssets,
};
