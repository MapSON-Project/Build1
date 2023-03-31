const dotenv = require('dotenv');
const mongoose = require('mongoose')
const app = require('./app')

dotenv.config();

const port = process.env.PORT;

mongoose
    .connect(process.env.DB, { useNewUrlParser: true })
    .then(() => {
        console.log('mongodb connected')
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })



app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
