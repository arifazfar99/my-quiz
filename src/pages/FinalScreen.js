import { Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { handleScoreChange } from "../redux/actions";

const FinalScreen = () => {
  const { score } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRestart = () => {
    dispatch(handleScoreChange(0));
    history.push("/");
  };

  return (
    <Box sx={{ border: 1, borderColor: "grey", paddingX: 2, paddingY: 2 }}>
      <Box>
        <Typography variant="h4">Congratulation!</Typography>
        <Typography>Your final score is</Typography>
        <Typography fontWeight="bold" mb={3}>
          Score {score}/10
        </Typography>
      </Box>

      <Divider />
      <Box
        mt={2}
        sx={{ display: "flex", flexDirection: "row", justifyContent: "right" }}
      >
        <Button
          variant="contained"
          onClick={handleRestart}
          mt={2}
          style={{ backgroundColor: "black" }}
        >
          Restart
        </Button>
      </Box>
    </Box>
  );
};

export default FinalScreen;
