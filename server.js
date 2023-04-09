// import app from app.js
const app = require("./backend/app");

// BE server is listenning on PORT 3000 (http://localhost:3000)
app.listen(3000, () => {
    console.log("APP is listening on PORT 3000...");
});