import {
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { decode } from "html-entities";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { handleScoreChange } from "../redux/actions";

const getRandomNumber = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const QuestionScreen = () => {
  const { question_category, question_difficulty, score } = useSelector(
    (state) => state
  );

  const history = useHistory();
  const dispatch = useDispatch();

  let apiUrl = `/api.php?amount=10&type=multiple`;

  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`);
  }
  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
  }

  const { response, loading } = useAxios({ url: apiUrl });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomNumber(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
    }
  }, [response, questionIndex]);

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const handleClickAnswer = (e) => {
    const question = response.results[questionIndex];
    if (value === question.correct_answer) {
      dispatch(handleScoreChange(score + 1));
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      history.push("/score");
    }
  };

  return (
    <>
      <Box sx={{ paddingBottom: 1 }}>
        <LinearProgress
          variant="determinate"
          value={(questionIndex + 1) * 10}
          sx={{ height: 15 }}
        />
      </Box>
      <Box sx={{ border: 1, borderColor: "grey", paddingX: 2, paddingY: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "row", paddingBottom: 2 }}>
          <Typography fontWeight="bold">Q{questionIndex + 1}:</Typography>
          <Typography style={{ textAlign: "left" }}>
            {decode(response.results[questionIndex].question)}
          </Typography>
        </Box>
        <Divider />
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          {options.map((data, id) => (
            <FormControlLabel
              key={id}
              value={decode(data)}
              control={<Radio />}
              label={decode(data)}
            />
          ))}
        </RadioGroup>

        <Divider />

        <Box
          mt={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
          }}
        >
          <Button
            variant="contained"
            style={{ backgroundColor: "black" }}
            onClick={handleClickAnswer}
          >
            NEXT
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default QuestionScreen;
