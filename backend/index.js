const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const Text = require('./text-model.js')

dotenv.config();

const app = express();
const port = process.env.PORT;

mongoose
    .connect(process.env.DB, { useNewUrlParser: true })
    .then(() => {
        console.log('mongodb connected')
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/text', async (req,res) => {
  let text = req.body.text
  if (text === null){
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

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});