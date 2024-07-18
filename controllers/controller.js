const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config();

const getAllProducts = async (req, res) => {
  console.log("product end points fired");
  const DB = await mongoose
    .createConnection(process.env.MONGO_DB_URI)
    .asPromise();
  const dataArray = await DB.db.collection("products").find().toArray();
  if (req.query.availability === "yes") {
    res.status(200).send(
      dataArray.filter((item) => {
        return (
          item.price >= req.query.minPrice &&
          item.price <= req.query.maxPrice &&
          item.availability === "yes"
        );
      })
    );
  } else {
    res.status(200).send(
      dataArray.filter((item) => {
        return (
          item.price >= req.query.minPrice && item.price <= req.query.maxPrice
        );
      })
    );
  }
};

const getProductsByCompany = async (req, res) => {
  console.log("product with company only end points fired");
  const DB = await mongoose
    .createConnection(process.env.MONGO_DB_URI)
    .asPromise();
  const dataArray = await DB.db.collection("products").find().toArray();
  if (req.query.availability.toLowerCase() === "yes") {
    res.status(200).send(
      dataArray.filter((item) => {
        return (
          item["company"].toLowerCase() === req.params.company.toLowerCase() &&
          item.availability.toLowerCase() === "yes" &&
          item.price <= req.query.maxPrice &&
          item.price >= req.query.minPrice
        );
      })
    );
  } else {
    res.status(200).send(
      dataArray.filter((item) => {
        return (
          item["company"].toLowerCase() === req.params.company.toLowerCase() &&
          item.price <= req.query.maxPrice &&
          item.price >= req.query.minPrice
        );
      })
    );
  }
};

const getProductByCategory = async (req, res) => {
  //minPrice,maxPrice,availability
  console.log("product with category only end points fired");
  const DB = await mongoose
    .createConnection(process.env.MONGO_DB_URI)
    .asPromise();
  const dataArray = await DB.db.collection("products").find().toArray();
  if (req.query.availability.toLowerCase() === "yes") {
    res.status(200).send(
      dataArray.filter((item) => {
        return (
          item["category"].toLowerCase() ===
            req.params.category.toLowerCase() &&
          item.availability.toLowerCase() === "yes" &&
          item.price <= req.query.maxPrice &&
          item.price >= req.query.minPrice
        );
      })
    );
  } else {
    res.status(200).send(
      dataArray.filter((item) => {
        return (
          item["category"].toLowerCase() ===
            req.params.category.toLowerCase() &&
          item.price <= req.query.maxPrice &&
          item.price >= req.query.minPrice
        );
      })
    );
  }
};

const getProductsByCompanyAndCategory = async (req, res) => {
  //minPrice,maxPrice,availability
  console.log("product with company and category end points fired");
  const DB = await mongoose
    .createConnection(process.env.MONGO_DB_URI)
    .asPromise();
  const dataArray = await DB.db.collection("products").find().toArray();
  if (req.query.availability.toLowerCase() === "yes") {
    res.status(200).send(
      dataArray.filter((item) => {
        return (
          item["company"].toLowerCase() === req.params.company.toLowerCase() &&
          item["category"].toLowerCase() ===
            req.params.category.toLowerCase() &&
          item.availability.toLowerCase() === "yes" &&
          item.price <= req.query.maxPrice &&
          item.price >= req.query.minPrice
        );
      })
    );
  } else {
    res.status(200).send(
      dataArray.filter((item) => {
        return (
          item["company"].toLowerCase() === req.params.company.toLowerCase() &&
          item["category"].toLowerCase() ===
            req.params.category.toLowerCase() &&
          item.price <= req.query.maxPrice &&
          item.price >= req.query.minPrice
        );
      })
    );
  }
};

const getCompanies = async (req, res) => {
  console.log("companies end points fired");
  const DB = await mongoose
    .createConnection(process.env.MONGO_DB_URI)
    .asPromise();
  const dataArray = await DB.db.collection("companies").find().toArray();
  res.send(dataArray).status(200);
};

const getCategories=async (req, res) => {
    console.log("categories end points fired");
    const DB = await mongoose
      .createConnection(process.env.MONGO_DB_URI)
      .asPromise();
    const dataArray = await DB.db.collection("categories").find().toArray();
    res.send(dataArray).status(200);
  }

module.exports = {
  getAllProducts,
  getProductsByCompany,
  getProductByCategory,
  getProductsByCompanyAndCategory,
  getCompanies,
  getCategories
};
