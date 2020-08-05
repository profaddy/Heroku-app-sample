const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require("http");

// IMPORT MODELS
require('./models/Product');
const productRoutes = require("./api/routes/products");
const userRoutes = require("./api/routes/users");
const entriesRoutes = require("./api/routes/entries");
const tehsilRoutes = require("./api/routes/tehsils");

const app = express();

mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/node-react-starter`);
mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://adnansaify11:oC79bIbGxL13QUHH@cluster0-gbsnu.mongodb.net/TestOnline?retryWrites=true&w=majority`);



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    res.status(200).json({})
  }
  next();
})
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/entries", entriesRoutes);
app.use("/tehsils", tehsilRoutes)


//IMPORT ROUTES
require('./routes/productRoutes')(app);
// require('./api/routes/productRoutes')(app);
// require('./api//routes/users')(app);
// require('./api/routes/entries')(app);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}
app.use((res, req, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});