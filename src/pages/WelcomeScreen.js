import {
  Button,
  CircularProgress,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SelectField from "../components/SelectField";
import useAxios from "../hooks/useAxios";

const WelcomeScreen = () => {
  const { response, error, loading } = useAxios({ url: "/api_category.php" });
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" mt={20} color="red">
        Some Went Wrong!
      </Typography>
    );
  }

  const difficultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/questions");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box mt={3} width="100%">
        <FormControl fullWidth size="small">
          <TextField
            required
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={handleNameChange}
            value={name}
          />
        </FormControl>
      </Box>

      <Box mt={3} width="100%">
        <FormControl fullWidth size="small">
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            onChange={handleEmailChange}
            value={email}
          />
        </FormControl>
      </Box>
      <SelectField options={response.trivia_categories} label="Category" />
      <SelectField options={difficultyOptions} label="Difficulty" />
      <Box mt={3}>
        <Button
          variant="contained"
          type="submit"
          style={{ backgroundColor: "black" }}
        >
          Start
        </Button>
      </Box>
      <Box></Box>
    </form>
  );
};

export default WelcomeScreen;
