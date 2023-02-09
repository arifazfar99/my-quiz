import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WelcomeScreen from "./pages/WelcomeScreen";
import QuestionScreen from "./pages/QuestionScreen";
import FinalScreen from "./pages/FinalScreen";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

function App() {
  return (
    <Router>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>
          <Switch>
            <Route path="/" exact>
              <Typography variant="h2" fontWeight="bold">
                Welcome to Quiz Challenge
              </Typography>
              <WelcomeScreen />
            </Route>
            <Route path="/questions">
              <QuestionScreen />
            </Route>
            <Route path="/score">
              <FinalScreen />
            </Route>
          </Switch>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
