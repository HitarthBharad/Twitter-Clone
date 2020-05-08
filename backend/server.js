const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://201701223:<password>@twitter-clone-rqitm.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const userRouter = require('./router/user')
const profileRouter = require('./router/profile')
const twitRouter = require('./router/twit')

app.use('/user',userRouter)
app.use('/profile',profileRouter)
app.use('/twit',twitRouter)


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
