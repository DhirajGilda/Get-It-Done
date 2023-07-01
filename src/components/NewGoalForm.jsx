import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useInputState from "../hooks/useInputState";
import HashTagSelector from "./HashTagSelector";

import Typography from "@mui/material/Typography";
import { makeStyles } from '@mui/styles';
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Paper from '@mui/material/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  fab: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  fabContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const NewGoalForm = ({ setGoals, globalHashTags }) => {
  const classes = useStyles();

  const [name, setName, resetName] = useInputState("");
  const [desc, setDesc, resetDesc] = useInputState("");
  const [hashTags, setHashTags] = useState({});
  // time added assumed new Date() for now

  const resetForm = () => {
    resetName();
    resetDesc();
    setHashTags([]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newGoal = {
      _id: uuidv4(),
      name,
      description: desc,
      timeAdded: new Date(),
      hashTags,
      duration: 0,
      isActive: false,
    };
    setGoals((prevGoals) => {
      return [...prevGoals, newGoal];
    });
    resetForm();
  };
  return (
    <Paper elevation={2}>
      <form onSubmit={handleFormSubmit}>
        <div className={classes.root}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            align="center"
            style={{ fontSize: "4rem", marginTop: "1.5rem" }}
          >
            Add a new task here!
          </Typography>
          <TextField
            id="standard-full-width"
            label="Goal title"
            style={{ margin: 8 }}
            fullWidth
            margin="dense"
            value={name}
            required
            onChange={setName}
          />
          <TextField
            id="standard-full-width-2"
            label="Goal description"
            style={{ margin: 8 }}
            fullWidth
            margin="dense"
            value={desc}
            onChange={setDesc}
          />
           <HashTagSelector
            hashTags={hashTags}
            setHashTags={setHashTags}
            globalHashTags={globalHashTags}
          />
        </div>
        <div className={classes.fabContainer}>
          <Fab
            className={classes.fab}
            color="primary"
            aria-label="add"
            type="submit"
          >
            <AddIcon />
          </Fab>
        </div>
      </form>
    </Paper>
  );
};

export default NewGoalForm;
