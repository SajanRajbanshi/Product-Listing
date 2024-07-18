import { useState } from "react";
import { Slider, Stack, Typography } from "@mui/material";
export default function SliderComp({ onPriceRangeChange }) {

  const [sliderValueRange, setSliderValueRange] = useState([0, 10000]);

  return (
    <Stack
      minWidth={"500px"}
      maxWidth={"45%"}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{color:"#757575"}}
    >
      <Typography width={"150px"} fontSize={18}>
        Price Range:
      </Typography>
      <Slider
        sx={{margin:3}}
        value={sliderValueRange}
        min={0}
        max={10000}
        valueLabelDisplay="auto"
        disableSwap
        onChange={(_, newValue) => {
          setSliderValueRange(newValue);
        }}
        onChangeCommitted={onPriceRangeChange}
      ></Slider>
    </Stack>
  );
}
