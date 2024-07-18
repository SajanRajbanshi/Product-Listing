const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
app.use(cors());
app.use(express.json());
require("dotenv").config();
const mongoose = require("mongoose");

const {
  getAllProducts,
  getProductsByCompany,
  getProductByCategory,
  getProductsByCompanyAndCategory,
  getCompanies,
  getCategories
} = require("./controllers/controller");

app.get("/api/products", getAllProducts);

app.get("/api/companies/:company/products", getProductsByCompany);

app.get("/api/categories/:category/products", getProductByCategory);

app.get(
  "/api/companies/:company/categories/:category/products",
  getProductsByCompanyAndCategory
);

app.get("/api/companies", getCompanies);

app.get("/api/categories", getCategories);

app.listen(5000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening at 5000`);
  }
});
