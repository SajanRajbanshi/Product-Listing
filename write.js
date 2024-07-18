const mongoose=require("mongoose");
const axios=require("axios");

const productSchema=mongoose.Schema({
    availability:String,
    category:String,
    company:String,
    discount:Number,
    _id:{type:String,
        required:true,
        unique:true
    },
    price:Number,
    productName:String,
    rating:Number
})

const categorySchema=mongoose.Schema({
    _id:{
        type:String,
        unique:true,
        required:true
    },
    name:String
})

const companySchema=mongoose.Schema({
    _id:{
        type:String,
        required:true,
        unique:true
    },
    name:String,
    description:String
})

const URI="mongodb://user_42kara5wq:p42kara5wq@ocdb.app:5050/db_42kara5wq";


async function writeCompany(dataArry)
{
    WriteClient=await mongoose.createConnection(URI).asPromise();
    WriteClient.on("connected",()=>{console.log(connected)});
    WriteClient.on("error",()=>{console.log("error occured while connecting")})
    const company=WriteClient.model("companies",companySchema);
    dataArry.forEach(async (item,index)=>
    {
        const newCompany=new company({
            _id:item.id.toString(),
            name:item.name,
            description:item.description
        })
        await newCompany.save();
        console.log("company written",index);
    })
}

function readCompany()
{
    axios.get("https://json-server-c67opnddza-el.a.run.app/companies").then(async (res)=>
    {
        await writeCompany(res.data);
    }).catch((err)=>
    {
        console.log(err);
    })
}


readCompany()

async function writeCategory(dataArray)
{
    WriteClient=await mongoose.createConnection(URI).asPromise();
    WriteClient.on("connected",()=>{console.log(connected)});
    WriteClient.on("error",()=>{console.log("error occured while connecting")})
    const category=WriteClient.model("categories",categorySchema);
    dataArray.forEach(async (item,index)=>
    {
        const newCategory=new category({
            _id:item.id,
            name:item.name
        })
        await newCategory.save();
        console.log("category written",index);
    })
}

function readCategory()
{
    axios.get("https://json-server-c67opnddza-el.a.run.app/categories").then(async (res)=>
    {
        await writeCategory(res.data);
    }).catch((err)=>
    {
        console.log(err);
    })
}






async function writeData(dataArray)
{
    WriteClient=await mongoose.createConnection(URI).asPromise();
    WriteClient.on("connected",()=>{console.log(connected)});
    WriteClient.on("error",()=>{console.log("error occured while connecting")})
    const product=WriteClient.model("products",productSchema);
    dataArray.forEach(async (item,index)=>
    {
        const newProduct=new product({
            availability:item.availability,
            category:item.category,
            company:item.company,
            discount:item.discount,
            _id:item.id,
            price:item.price,
            productName:item.productName,
            rating:item.rating
        })
        await newProduct.save();
        console.log("product saved",index);
    })
}



function readData()
{
    axios.get("https://json-server-c67opnddza-el.a.run.app/products").then(async (res)=>
    {
        await writeData(res.data);
        console.log("data written");
    }).then((err)=>
    {
        console.log(err);
    })
}

