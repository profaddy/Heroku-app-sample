const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const userRoutes = require("./api/routes/users");
const entriesRoutes = require("./api/routes/entries");

// // To run on mongodb atlas
mongoose.connect(`mongodb+srv://adnansaify11:oC79bIbGxL13QUHH@cluster0-gbsnu.mongodb.net/TestOnline?retryWrites=true&w=majority`,
    {useUnifiedTopology:true,useNewUrlParser:true},
)
// To run on local machine
// mongoose.connect(`mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false`,
//   { useUnifiedTopology: true, useNewUrlParser: true },
// )
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.use((res, req, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
// if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

// }
// app.use((error, res, req, next) => {
//     // res.status = error.status || 500;
//      res.status(error.status).json({
//         error:{
//             message:error.message
//         }
//     })
// next();
// })

module.exports = app;