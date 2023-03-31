const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Text = require('./text-model.js')

dotenv.config();

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/text', async (req,res) => {
  let text = req.body.text
  if (!text){
    return res
            .status(400)
            .json({
              err: 'invalid text'
            })
  }
  let texts = await Text.find({})
  if(texts.length === 0){
    await Text.create({texts: [text]})
    return res
            .status(200)
            .json({
              texts: [text]
            })
  }else{
    texts[0].texts.push(text)
    await Text.findByIdAndUpdate(texts[0]._id, {texts: texts[0].texts})
  }

  res
    .status(200)
    .json({
      texts: texts[0].texts
    })
})

app.get('/texts', async (req,res) => {
  let texts = await Text.find({})
  if (texts.length === 0){
    return res
            .status(200)
            .json({
              texts: []
            })
  }
  res
    .status(200)
    .json({
      texts: texts[0].texts
    })
})

app.get('/', (req, res) => {
  res.send('Express Server');
  
});

app.delete('/text', async (req, res) => {
  let text = req.body.text

  if (!text){
    return res
            .status(400)
            .json({
              err: 'invalid text'
            })
  }

  let texts = await Text.find({})
  if(texts.length === 0 || texts[0].texts.length === 0) {
    return res
            .status(200)
            .json({
              text: text,
              texts: []
            })
  }else{
    let textArr = texts[0].texts
    const index = textArr.indexOf(text);
    if (index > -1){
      textArr.splice(index, 1)
    }
    await Text.findByIdAndUpdate(texts[0]._id, {texts: textArr})
    res
      .status(200)
      .json({
        text: text,
        texts: textArr
      })
  }

})


module.exports = app