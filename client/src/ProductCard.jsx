import React,{useState} from 'react';
import { Card, Box, Grid } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Star } from "@mui/icons-material"
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function ProductCard({ productProp }) {
  const [isCardLiked,setIsCardLiked] = useState(false)

  return (
    <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="194"
          image={`https://picsum.photos/200/300?random=${productProp?.id}`}
          alt="Random Image"
          objectfit="fill"
        />
        <CardContent>
          <Grid
            container
            spacing={2}
            justifyContent={"space-between"}
          >
            <Grid
              item
              display={"flex"}
              justifyContent={"space-between"}
              sx={
                {
                  "width": "100%",
                  "alignItems": "baseline"
                }
              }>
              <Box display={"flex"}
                justifyContent={'space-between'}
                alignItems={"center"}>
                <Box>
                <Typography
                  color="text.primary"
                  sx={{
                    fontWeight: "550",
                    fontSize: "22px",
                    display: "block"
                  }}
                >
                  {productProp?.productName} ({productProp?.company})
                  
                </Typography>
                <Box sx={{fontSize:"16px",fontWeight:"normal",color:"#888"}}>
                    {productProp.category}
                  </Box>
                </Box>
              </Box>
              <Box sx={{
                lineHeight: "normal",
                height: "fit-content",
                display: "inline-flex",
                color: "#fff",
                padding: "2px 4px 2px 2px",
                borderRadius: "3px",
                fontWeight: 500,
                gap: "2px",
                fontSize: "12px",
                verticalAlign: "middle",
                backgroundColor: "#388e3c",
                alignItems: "center",
              }}>
                <Star sx={{
                  color: "rgb(255,255,255)",
                  height: "15px",
                  width: "15px"
                }}
                />
                {" " + `${productProp?.rating}`}
              </Box>
            </Grid>
            <Grid item width={"100%"}>
              <Box display={"flex"}
                alignItems={"center"}
                justifyContent={'space-between'}>
                <Typography
                  color="text.primary"
                  variant='h6'
                  fontSize={"25px"}
                  fontWeight={550}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  ₹ {productProp?.price}
                  <Typography variant='body 1'
                    fontSize={"16px"}
                  >
                    <span style={{
                      textDecoration: "line-through",
                      fontWeight: "500",
                      color: "#888"
                    }}
                    >
                      {`₹${Math.ceil((100 * (productProp?.price)) / (100 - productProp?.discount))}`}
                    </span>
                    {` ${productProp?.discount}`}% off
                  </Typography>
                </Typography>
                <span style={{display:"flex", flexDirection:"column", "alignItems":"end"}}>
                <IconButton
                  onClick={()=>{setIsCardLiked(!isCardLiked)}}
                  aria-label="add to favorites"
                  sx={{
                    height: "30px",
                    width: "30px",
                    zIndex:0
                  }}>
                  <FavoriteIcon 
                    sx={{"color":isCardLiked?"red":"none",zIndex:0}}
                  />
                </IconButton>
                {productProp?.availability==="yes"?"Stock Available":"Out of the Stock"}
                </span>
                
              </Box>
            </Grid>
          </Grid>
        </CardContent>
    </Card >
  );
}