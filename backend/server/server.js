const express = require("express");
const app = express();
const cors = require("cors");
const loginRoute = require("./routes/userLogin");
const getAllUsersRoute = require("./routes/userGetAllUsers");
const registerRoute = require("./routes/userSignUp");
const getUserByIdRoute = require("./routes/userGetUserById");
const dbConnection = require("./config/db.config");
const editUser = require("./routes/userEditUser");
const deleteUser = require("./routes/userDeleteAll");
const userGetReviews = require("./routes/userGetReviews");
const userReviews = require("./routes/userReviews");
const userDeleteReview = require("./routes/userDeleteReview");
const favorites = require("./routes/userFavorite");
const deleteFavorite = require("./routes/userDeleteFavorite");
const getFavorites = require("./routes/userGetFavorite");
const reviewRating = require("./routes/userReviewRating");
const getAllReviews = require("./routes/userGetAllReviews");

require("dotenv").config();
const SERVER_PORT = 8081;

dbConnection();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/user", loginRoute);
app.use("/user", registerRoute);
app.use("/user", getAllUsersRoute);
app.use("/user", getUserByIdRoute);
app.use("/user", editUser);
app.use("/user", deleteUser);
app.use("/userFav", getFavorites);
app.use("/userFav", favorites);
app.use("/userFav", deleteFavorite);
app.use("/userReview", userGetReviews);
app.use("/userReview", userReviews);
app.use("/userReview", userDeleteReview);
app.use("/userReview", getAllReviews);
app.use("/reviewRating", reviewRating);

//app.listen(SERVER_PORT, (req, res) => {
  //console.log(
   // `The backend service is running on port ${SERVER_PORT} and waiting for requests.`
  //);
//});

console.log(`The node environment is: ${process.env.NODE_ENV}`);




// Production environment: connect to the database and start listening for requests
if (process.env.NODE_ENV !== "test") {
    dbConnection();
    app.listen(SERVER_PORT, () => {
      setTimeout(() => {
        console.log(`All services are running on port: ${SERVER_PORT}`);
      }, 1000); // Add a 1-second delay
    });
}

module.exports = app; // Export the app instance for unit testing via supertest.
