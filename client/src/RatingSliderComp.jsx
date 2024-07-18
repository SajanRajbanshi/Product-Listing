import { useState } from "react";
import { Slider, Stack, Typography } from "@mui/material";
export default function RatingSliderComp({ onRatingRangeChange }) {

  const [sliderValueRange, setSliderValueRange] = useState([0, 5]);

  return (
    <Stack
      minWidth={"500px"}
      maxWidth={"45%"}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{color:"#757575"}}
    >
      <Typography width={"170px"} fontSize={18} color={"757575"}>
        Rating Range:
      </Typography>
      <Slider
        step={0.5}
        marks
        sx={{margin:3}}
        value={sliderValueRange}
        min={0}
        max={5}
        valueLabelDisplay="auto"
        disableSwap
        onChange={(_, newValue) => {
          setSliderValueRange(newValue);
        }}
        onChangeCommitted={onRatingRangeChange}
      ></Slider>
    </Stack>
  );
}
