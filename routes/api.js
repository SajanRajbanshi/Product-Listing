const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const axios =require("axios");

// router.get("/products", (req, res,next) => {
//     console.log("product end points fired");
//     axios
//       .get("https://json-server-c67opnddza-el.a.run.app/products")
//       .then((apiRes) => {
//         if (req.query.availability === "yes") {
//           res.status(200).send(
//             apiRes.data.filter((item) => {
//               return (
//                 item.price >= req.query.minPrice &&
//                 item.price <= req.query.maxPrice &&
//                 item.availability === "yes"
//               );
//             })
//           );
//         } else {
//           res.status(200).send(
//             apiRes.data.filter((item) => {
//               return (
//                 item.price >= req.query.minPrice &&
//                 item.price <= req.query.maxPrice
//               );
//             })
//           );
//         }
//       })
//       .catch((err) => {
//         res.status(400).send({ error: err });
//       });
//   });

router.get('/todos', (req, res, next) => {
    // This will return all the data, exposing only the id and action field to the client
    Todo.find({}, 'action')
        .then((data) => res.json(data))
        .catch(next);
});

router.post('/todos', (req, res, next) => {
    if (req.body.action) {
        Todo.create(req.body)
            .then((data) => res.json(data))
            .catch(next);
    } else {
        res.json({
            error: 'The input field is empty',
        });
    }
});

router.delete('/todos/:id', (req, res, next) => {
    Todo.findOneAndDelete({ _id: req.params.id })
        .then((data) => res.json(data))
        .catch(next);
});

module.exports = router;