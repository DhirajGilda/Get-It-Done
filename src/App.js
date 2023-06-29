import React from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorageState from "./hooks/useLocalStorageState";
import { Routes, Route, useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import Link from "@material-ui/core/Link";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import NewGoalForm from "./components/NewGoalForm";
import GoalList from "./components/GoalList";
import Chart from "./components/Charts";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    paddingTop: theme.spacing(2),
  },
  searchFilterDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
  input: {
    width: "90%",
  },
  searchBarRoot: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    width: "95%",
  },
  searchIconContainer: {
    display: "flex",
    alignItems: "center",
  },
  checkBoxContainer: {
    padding: theme.spacing(2),
  },
  navItemsRight: {
    margin: "auto",
    marginRight: 0,
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function useCustomTheme(darkState) {
  const arcBlack = "#000000";
  const arcPink = "#FFA500";

  return React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          common: {
            blue: `${arcPink}`,
            orange: `${arcBlack}`,
          },
          primary: {
            main: `${arcPink}`,
          },
          secondary: {
            main: `${arcBlack}`,
          },
          type: darkState ? "dark" : "light",
          // Modify the colors directly in the palette object
          // based on your desired light and dark colors
          // For example:
          background: {
            default: darkState ? "#212121" : "#ffffff", // Dark mode background color or light mode background color
            paper: darkState ? "#424242" : "#f5f5f5", // Dark mode paper color or light mode paper color
          },
          text: {
            primary: darkState ? "#ffffff" : "#000000", // Dark mode text color or light mode text color
          },
        },
        overrides: {
          MuiTableCell: {
            head: {
              fontSize: "1rem",
              fontWeight: 700,
              color: arcBlack,
              borderColor: arcBlack,
            },
          },
        },
      }),
    [darkState]
  );
}

function App(props) {
  const classes = useStyles();
  const history = useNavigate();
  const [darkState, setDarkState] = useLocalStorageState("darkMode", false);
  const theme = useCustomTheme(darkState);

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  const [globalHashTags, setGlobalHashTags] = useLocalStorageState("hashtags", [
    { _id: "0", tag: "health", color: "green" },
    { _id: "1", tag: "love", color: "red" },
    { _id: "2", tag: "personal", color: "teal" },
    { _id: "3", tag: "family", color: "lime" },
    { _id: "4", tag: "academic", color: "blue" },
  ]);
  const [goals, setGoals] = useLocalStorageState("goals", [
    {
      _id: uuidv4(),
      name: "Eat breakfast",
      description:
        "buy oatmeal, tea and dried rose petals from the local grocery store",
      timeAdded: new Date(),
      duration: 1000,
      isActive: false,
      hashTags: {
        2: { _id: "2", tag: "personal", color: "teal" },
        4: { _id: "4", tag: "academic", color: "blue" },
      },
    },
    {
      _id: uuidv4(),
      name: "make task planner project",
      description: "Make best task planner app ever",
      timeAdded: new Date(),
      duration: 2000,
      isActive: false,
      hashTags: {
        0: { _id: "0", tag: "health", color: "green" },
        1: { _id: "1", tag: "love", color: "red" },
      },
    },
  ]);
  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ElevationScroll {...props}>
          <AppBar>
            <Toolbar>
              <Typography variant="h6">Get it Done</Typography>
              <div className={classes.navItemsRight}>
                <Button
                  type="contained"
                  color="secondary"
                  onClick={() => {
                    history("/statistics");
                  }}
                >
                  statistics
                </Button>
                <IconButton
                  aria-label="toggle dark mode"
                  aria-controls="menu-appbar"
                  aria-haspopup="false"
                  onClick={handleThemeChange}
                  color="inherit"
                >
                  {darkState ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <Link
                  href="https://github.com/DhirajGilda/Get-It-Done"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                >
                  <IconButton
                    aria-label="Github repository link"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <GitHubIcon />
                  </IconButton>
                </Link>
              </div>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Toolbar />
        <Container>
          <Box my={2}>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <NewGoalForm
                      setGoals={setGoals}
                      globalHashTags={globalHashTags}
                    />
                    <GoalList
                      goals={goals}
                      setGoals={setGoals}
                      globalHashTags={globalHashTags}
                    />
                  </>
                }
              />
              <Route path="/statistics" element={<Chart goals={goals}/>}/>
            </Routes>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;



