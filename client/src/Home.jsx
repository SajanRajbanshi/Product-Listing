import {
    Stack,
    Select,
    Pagination,
    Typography,
    Checkbox,
    IconButton,
    MenuItem,
  } from "@mui/material";
  import { useState, useEffect, useRef } from "react";
  import axios from "axios";
  import ProductCard from "./ProductCard";
  import PriceSliderComp from "./PriceSliderComp";
  import RatingSliderComp from "./RatingSliderComp";
  import { motion } from "framer-motion";
  import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
  
  const AnimatedIconButton = motion(IconButton);
  
  export default function Home() {
    const [company, setCompany] = useState("All");
    const [category, setCategory] = useState("All");
    const [showAvailable, setShowAvailable] = useState("All");
    const [ratingRange, setRatingRange] = useState([0, 5]);
    const [productArray, setProductArray] = useState([]);
    const [categoryArray, setCategoryArray] = useState([]);
    const [companyArray, setCompanyArray] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [productRange, setProductRange] = useState([0, 8]);
    const [noOfPages, setNoOfPages] = useState(1);
    const [sortBy, setSortBy] = useState("rating");
    const [isSortDirectionAscending, setIsSortDirectionAscending] =
      useState(false);
    const [pageNo, setPageNo] = useState(1);
    const originalResponse = useRef([]);
  
    // const axiosClient = axios.create({
    //   baseURL: "https://json-server-c67opnddza-el.a.run.app",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  
    function handleRatingRangeChange(_, newValue) {
      setRatingRange(newValue);
    }
    function handlePageChange(_, value) {
      setPageNo(value);
      if (value == 1) {
        setProductRange([0, 8]);
      } else {
        setProductRange([8 * (value - 1), 8 * (value - 1) + 8]);
      }
    }
  
    function handleAvailablityChange(event) {
      setShowAvailable(event.target.checked ? "yes" : "All");
    }
    function handlePriceRangeChange(_, newValue) {
      setPriceRange(newValue);
    }
    function handleCompanyChange(event) {
      setCompany(event.target.value);
    }
    function handleSortByChange(event) {
      setSortBy(event.target.value);
    }
    function handleCategoryChange(event) {
      setCategory(event.target.value);
    }
    function handleSortDirectionChange() {
      setIsSortDirectionAscending(!isSortDirectionAscending);
    }
  
    function sortAsPerProperty(dataArray) {
      if (sortBy === "productName") {
        if (isSortDirectionAscending) {
          dataArray.sort((a, b) => {
            return a.productName
              .toLowerCase()
              .localeCompare(b.productName.toLowerCase());
          });
        } else {
          dataArray.sort((a, b) => {
            return b.productName
              .toLowerCase()
              .localeCompare(a.productName.toLowerCase());
          });
        }
      } else {
        if (isSortDirectionAscending) {
          dataArray.sort((a, b) => {
            return a[sortBy] - b[sortBy];
          });
        } else {
          dataArray.sort((a, b) => {
            return b[sortBy] - a[sortBy];
          });
        }
      }
      return [...dataArray];
    }
  
    useEffect(() => {
      axios.get("/api/companies").then((res) => {
        res.data.push({
          description: "All",
          id: -1,
          name: "All",
        });
        setCompanyArray(res.data);
      });
      axios.get("/api/categories").then((res) => {
        res.data.push({ id: -1, name: "All" });
        setCategoryArray(res.data);
      });
      // axiosClient.get("/products").then((res) => {
      //   originalResponse.current = res.data;
      //   let filteredArray = sortAsPerProperty(
      //     res.data.filter((item) => {
      //       return item.rating >= ratingRange[0] && item.rating <= ratingRange[1];
      //     })
      //   );
      //   setNoOfPages(Math.ceil(filteredArray.length / 8));
      //   setProductArray(filteredArray.slice(productRange[0], productRange[1]));
      // });
    }, []);
  
    useEffect(() => {
      if (category === "All" && company === "All") {
        axios
          .get(
            `/api/products?minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&availability=${showAvailable}`
          )
          .then((res) => {
            originalResponse.current = res.data;
            console.log(res.data);
            let filteredArray = sortAsPerProperty(
              res.data.filter((item) => {
                return (
                  item.rating >= ratingRange[0] && item.rating <= ratingRange[1]
                );
              })
            );
            setNoOfPages(Math.ceil(filteredArray.length / 8));
            setPageNo(1);
            setProductRange([0, 8]);
            setProductArray(
              filteredArray.slice(productRange[0], productRange[1])
            );
          });
      } else if (category === "All") {
        axios
          .get(
            `/api/companies/${company}/products?minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&availability=${showAvailable}`
          )
          .then((res) => {
            originalResponse.current = res.data;
            let filteredArray = sortAsPerProperty(
              res.data.filter((item) => {
                return (
                  item.rating >= ratingRange[0] && item.rating <= ratingRange[1]
                );
              })
            );
            setNoOfPages(Math.ceil(filteredArray.length / 8));
            setPageNo(1);
            setProductRange([0, 8]);
            setProductArray(
              filteredArray.slice(productRange[0], productRange[1])
            );
          });
      } else if (company === "All") {
        axios
          .get(
            `/api/categories/${category}/products?minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&availability=${showAvailable}`
          )
          .then((res) => {
            originalResponse.current = res.data;
            let filteredArray = sortAsPerProperty(
              res.data.filter((item) => {
                return (
                  item.rating >= ratingRange[0] && item.rating <= ratingRange[1]
                );
              })
            );
            setNoOfPages(Math.ceil(filteredArray.length / 8));
            setPageNo(1);
            setProductRange([0, 8]);
            setProductArray(
              filteredArray.slice(productRange[0], productRange[1])
            );
          });
      } else {
        axios
          .get(
            `/api/companies/${company}/categories/${category}/products?minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&availability=${showAvailable}`
          )
          .then((res) => {
            originalResponse.current = res.data;
            let filteredArray = sortAsPerProperty(
              res.data.filter((item) => {
                return (
                  item.rating >= ratingRange[0] && item.rating <= ratingRange[1]
                );
              })
            );
            setNoOfPages(Math.ceil(filteredArray.length / 8));
            setPageNo(1);
            setProductRange([0, 8]);
            setProductArray(
              filteredArray.slice(productRange[0], productRange[1])
            );
          });
      }
    }, [category, company, priceRange, showAvailable]);
  
    useEffect(() => {
      let newProductArray = [...originalResponse.current];
      newProductArray = newProductArray.filter((item) => {
        return item.rating >= ratingRange[0] && item.rating <= ratingRange[1];
      });
      setNoOfPages(Math.ceil(newProductArray.length / 8));
      setProductArray(
        sortAsPerProperty(newProductArray).slice(productRange[0], productRange[1])
      );
    }, [sortBy, ratingRange, isSortDirectionAscending, productRange]);
  
    return (
      <>
        <Stack position={"fixed"} top={0} backgroundColor={"#d9d9d9"} width={"100%"} zIndex={1}>
        <Stack
          direction={"row"}
          display={"flex"}
          width={"100%"}
          color={"#757575"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexWrap={"wrap"}
        >
          <Typography variant="h6" color={"grey"}>
            HasEverything Shop
          </Typography>
          <Stack
            direction={"row"}
            display={"flex"}
            alignItems={"center"}
            gap={1}
            justifyContent={"center"}
            flexWrap={"wrap"}
          >
            <Stack
              direction={"row"}
              display={"flex"}
              alignItems={"center"}
              gap={1}
              justifyContent={"center"}
            >
              <Typography>Category</Typography>
              <Select
                value={category}
                size="small"
                sx={{ width: "120px",color:"#757575" }}
                onChange={handleCategoryChange}
              >
                {categoryArray.map((item, index) => {
                  return (
                    <MenuItem key={`${item.name}${index}`} value={item.name}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Stack>
            <Stack
              direction={"row"}
              display={"flex"}
              alignItems={"center"}
              gap={1}
              justifyContent={"center"}
            >
              <Typography>Company</Typography>
              <Select
                value={company}
                size="small"
                sx={{ width: "120px",color:"#757575" }}
                onChange={handleCompanyChange}
              >
                {companyArray.map((item, index) => {
                  return (
                    <MenuItem key={`${item.name}${index}`} value={item.name}>
                      {item.description}
                    </MenuItem>
                  );
                })}
              </Select>
            </Stack>
            <Stack
              direction={"row"}
              display={"flex"}
              alignItems={"center"}
              gap={1}
              justifyContent={"center"}
            >
              <Typography>Sort by</Typography>
              <Select
                value={sortBy}
                size="small"
                sx={{ width: "120px",color:"#757575" }}
                onChange={handleSortByChange}
              >
                <MenuItem value={"productName"}>Name</MenuItem>
                <MenuItem value={"rating"}>Rating</MenuItem>
                <MenuItem value={"price"}>Price</MenuItem>
                <MenuItem value={"discount"}>Discount</MenuItem>
              </Select>
            </Stack>
            <AnimatedIconButton
              animate={{
                rotate: isSortDirectionAscending ? 180 : 0,
              }}
              onClick={handleSortDirectionChange}
            >
              <FilterListRoundedIcon />
            </AnimatedIconButton>
            <Stack direction={"row"} display={"flex"} alignItems={"center"}>
              <Typography>Available</Typography>
              <Checkbox
                checked={showAvailable === "All" ? false : true}
                onChange={handleAvailablityChange}
              ></Checkbox>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          direction={"row"}
          width={"100%"}
          flexWrap={"wrap"}
          justifyContent={"space-evenly"}
        >
          <PriceSliderComp
            onPriceRangeChange={handlePriceRangeChange}
          ></PriceSliderComp>
          <RatingSliderComp
            onRatingRangeChange={handleRatingRangeChange}
          ></RatingSliderComp>
        </Stack>
        </Stack>
        <Stack
          flexWrap={"wrap"}
          direction={"row"}
          justifyContent={"center"}
          gap={5}
          width={"100%"}
          sx={{ marginTop: "160px" }}
        >
          {productArray?.map((item, index) => {
            return <ProductCard productProp={item} key={`item.name${index}`} />;
          })}
        </Stack>
        <Stack alignItems={"center"} width={"100%"} marginTop={2}>
          <Pagination
            count={noOfPages}
            onChange={handlePageChange}
            page={pageNo}
          />
        </Stack>
      </>
    );
  }
  