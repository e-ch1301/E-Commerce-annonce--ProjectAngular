//--------------------------------Module Importation-----------------------------//
// import express module
const express = require("express");
// import body-parser module
const bodyParser = require("body-parser");
// import mongoose module
const mongoose = require("mongoose");
// import bcrypt module
const bcrypt = require("bcrypt");
// import path module
const path = require("path");
// import multer module
const multer = require("multer");
//import ObjectID
const { ObjectId } = require("mongodb");
//import JWT
const jwt = require("jsonwebtoken");

// connect APP with DB 
mongoose.connect('mongodb://127.0.0.1:27017/annoncesDB');
//--------------------------------Models Importation-----------------------------//
const User = require("./models/user");
const Annonce = require("./models/annonce");
const Order = require("./models/order");

//--------------------------------Create Express Application-----------------------------//
const app = express();

//--------------------------------App Configuraton-----------------------------//
// send JSON response
app.use(bodyParser.json());
// get object from request
app.use(bodyParser.urlencoded({ extented: true }));
// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});
// Path configuration
app.use('/images', express.static(path.join('backend/images')));
// Define media type
const MIME_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const configStorage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, 'backend/images')
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
      extension;
    cb(null, imgName);
  }
});

//--------------------------------Buisness Logic-----------------------------//

//Business Logic : Signup
app.post("/users/signup", multer({ storage: configStorage }).single('img'), (req, res) => {
  bcrypt.hash(req.body.pwd, 10).then((cryptedpwd) => {
    let url = req.protocol + '://' + req.get('host');
    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      adress: req.body.adress,
      email: req.body.email,
      pwd: cryptedpwd,
      role: req.body.role,
      statut: req.body.statut,
      avatar: url + '/images/' + req.file.filename
    })
    user.save((err, doc) => {
      if (err) {
        res.json({ message: "email existe" })
      } else {
        res.json({ message: "added with success" });
      }
    });
  });
});

// Business Logic : Signup Admin
app.post("/users/signupAdmin", multer({ storage: configStorage }).single('img'), (req, res) =>
  bcrypt.hash(req.body.pwd, 10).then((cryptedpwd) => {

    const url = req.protocol + '://' + req.get('host');

    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      tel: req.body.tel,
      pwd: cryptedpwd,
      role: req.body.role,
      statut: req.body.statut,
      avatar: url + '/images/' + req.file.filename


    })
    user.save((err, doc) => {
      if (err) {

        res.json({ message: "email existe" })
      } else {

        res.json({ message: "add widh success" });
      }


    });

  })
);

//Business Logic: Login
app.post("/users/login", (req, res) => {
  let fetchedUser;
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.send({
        message: "Auth failed no such user"
      })
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.pwd, user.pwd);
  }).then(result => {
    if (!result) {
      return res.send({
        message: "Auth failed inccorect password"
      })
    }
    const token = jwt.sign(
      {
        email: fetchedUser.email,
        userId: fetchedUser._id,
        userRole: fetchedUser.userRole,
        statut: fetchedUser.statut,

      },
      "secret_this_should_be_longer",
      { expiresIn: "5min" }
    );
    res.status(200).send({
      token: token,
      expiresIn: 300,
      userId: fetchedUser._id,
      userRole: fetchedUser.role,
      statut: fetchedUser.statut,


    });
    console.log('here role', fetchedUser.role);
  })
    .catch(e => {
      console.log(e)
    })
});

//Busniss Logic: Get User Profile
app.get("/users/account/:id", (req, res) => {
  console.log("here user id", req.params.id);
  User.findOne({ _id: req.params.id }).then((doc) => {
    res.json({ user: doc });
  })
});

//Busniss Logic: Get User By Id
app.get("/users/:id", (req, res) => {
  console.log("here user id", req.params.id);
  User.findOne({ _id: req.params.id }).then((doc) => {
    res.json({ user: doc });
  })
});

//Business Logic : Add Product
app.post("/annonces", multer({ storage: configStorage }).single('img'), (req, res) => {
  User.findOne({ _id: req.body.userId }).then(
    (result) => {
      const url = req.protocol + '://' + req.get('host');
      let annonce = new Annonce({
        productName: req.body.productName,
        category: req.body.category,
        price: req.body.price,
        qty: req.body.qty,
        description: req.body.description,
        date: req.body.date,
        userId: req.body.userId,
        avatar: url + "/images/" + req.file.filename
      });
      annonce.save((err, doc) => {
        if (err) {
          res.json({ message: "Error with DB" });
        } else {
          res.json({ message: "Product added with success", annonce: doc });
        }
      })
    })
});

//Business Logic : Edit Annonce
app.put("/annonces/:id", multer({ storage: configStorage }).single('img'), (req, res) => {
  console.log("Here into BL: Edit Annonce");
  let newAnnonce = req.body;
  Annonce.updateOne({ _id: req.body._id }, newAnnonce).then((result) => {
    if (result.modifiedCount == 1) {
      res.json({ message: "Annonce edited with success" });
    } else {
      res.json({ message: "Annonce Not Found" });
    }
  });
});

//Business Logic : Get All Annonces
app.get("/annonces", (req, res) => {
  Annonce.find().then((docs) => {
    res.json({ annonces: docs });
  })
});

//Business Logic : Get Annonce By ID 
app.get("/annonces/:id", (req, res) => {
  console.log("here into BL: Get Annonce By ID ");
  Annonce.findOne({ _id: req.params.id }).then((doc) => {
    res.json({ annonce: doc })
  })
});

//Business Logic : Delete Annonce
app.delete("/annonces/:id", (req, res) => {
  console.log("Here into BL: Delete Annonce");
  let id = req.params.id;
  Annonce.deleteOne({ _id: id }).then((result) => {
    console.log("Here result after delete", result);
    if (result.deletedCount == 1) {
      res.json({ message: `Annonce with ID ${id} is deleted with success`, isDeleted: true });
    } else {
      res.json({ message: `Annonce not found`, isDeleted: false });
    }
  });
});

//Business Logic : Get Annonce By User ID 
app.get("/annonces/:id", (req, res) => {
  console.log("here into display Annonce Client", req.params.id);
  Annonce.find({ userId: req.params.id }).then((docs) => {
    console.log(docs);
    res.json({ annonces: docs });
  })
});

//Business Logic : Get Last Annonce 
app.get("/home", (req, res) => {
  console.log("bl home annonce");
  Annonce.find().sort({ "idate": -1 }).limit(6).then((annonce) => {
    res.json({ doc: annonce })
  });
})

// Buisness Logic: Add Order
app.post("/orders", (req, res) => {
  console.log("here req", req.body);

  Annonce.findOne({ _id: req.body.annonceId }).then((doc) => {
    let order = new Order({
      qty: req.body.qty,
      annonceId: ObjectId(req.body.annonceId),
      userId: ObjectId(req.body.userId),

    });
    order.save((err, result) => {
      console.log("Error", err);
      if (result) {
        res.status(200).json({
          message: "Order added with success"
        });
      }
    });

  })
});


// Buisness Logic: Delete Order
app.delete("/orders/:id", (req, res) => {
  Order.deleteOne({ _id: req.params.id }).then((response) => {
    if (response.deletedCount == 1) {
      res.json({ message: "Deleted with success" });
    }
  })
});

// Buisness Logic: Get All Orders
app.get("/orders", (req, res) => {
  Order.aggregate(
    [
      {
        $lookup: {
          from: "annonces",
          localField: "annonceId",
          foreignField: "_id",
          as: "annonce",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },

    ],
    (error, docs) => {
      res.status(200).json({ orders: docs });
      console.log(docs);
    }
  )
});

// Buisness Logic: Get Order By Id
app.get("/orders/:id", (req, res) => {
  let id = req.params.id;
  Order.aggregate([

    {
      $lookup: {
        from: "annonces",
        localField: "annonceId",
        foreignField: "_id",
        as: "annonce",
      },
    },

  ],
  ).then((doc) => {
    let docs = doc.filter((data) => data.userId == id)
    res.json({ order: docs, msg: "order" });
    console.log(doc);
  });
});

// // Buisness Logic: Get Order By User
// app.get("/orders/:id", (req, res) => {

//   Order.aggregate(
//     [
//       { $match: { userId: ObjectId(`${req.params.id}`) } },
//       {
//         $lookup: {
//           from: "annonces", 
//           localField: "annonceId", 
//           foreignField: "_id", 
//           as: "annonce", 
//         },
//       },
//       {
//         $lookup: {
//           from: "users", 
//           localField: "clientId", 
//           foreignField: "_id", 
//           as: "user", 
//         },
//       },
//     ],
//     (error, docs) => {
//       res.status(200).json({ order: docs });
//       console.log(docs);
//     }
//   )
// });

// // Buisness Logic: Get Order By Client
// app.get("/orders/:id", (req, res) => {

//   Order.aggregate(
//     [
//       { $match: { clientId: ObjectId(`${req.params.id}`) } },
//       {
//         $lookup: {
//           from: "annonces", 
//           localField: "annonceId", 
//           foreignField: "_id", 
//           as: "annonce", 
//         },
//       },
//       {
//         $lookup: {
//           from: "users", 
//           localField: "userId", 
//           foreignField: "_id", 
//           as: "user", 
//         },
//       },
//     ],
//     (error, docs) => {
//       res.status(200).json({ order: docs });
//       console.log(docs);
//     }
//   )
// });






//--------------------------------Make App Importable-----------------------------//
module.exports = app;





