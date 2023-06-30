import React, { useState, useEffect } from "react";
import Goal from "./Goal";
import useInputState from "../hooks/useInputState";

import SortIcon from "@mui/icons-material/Sort";
import MenuList from "@mui/material/MenuList";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import IconButton from '@mui/material/IconButton';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import { makeStyles } from '@mui/styles';
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { spacing } from '@mui/system';

import SelectTagFilters from "./SelectTagFilters";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft:spacing(0),
    paddingRight:spacing(0),
    paddingTop:spacing(2),
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
    padding:spacing(1),
    paddingLeft:spacing(3),
    paddingRight:spacing(3),
    width: "95%",
  },
  searchIconContainer: {
    display: "flex",
    alignItems: "center",
  },
  checkBoxContainer: {
    padding:spacing(2),
  },
  resetButton: {
    marginTop:spacing(2),
  },
}));

function GoalList({ goals, setGoals, globalHashTags }) {
  const classes = useStyles();
  const [searchText, setSearchText, resetSearchText] = useInputState("");
  const [selectedHastagIds, setSelectedHashTagIds] = useState({});
  const [filteredGoals, setFilteredGoals] = useState(goals);
  const [sortedGoals, setSortedGoals] = useState(filteredGoals);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setSortedGoals(filteredGoals);
  }, [filteredGoals]);

  useEffect(() => {
    const textFilter = !searchText
      ? goals
      : goals.filter((goal) => {
          if (
            goal.name
              .trim()
              .toLowerCase()
              .includes(searchText.trim().toLowerCase()) ||
            goal.description
              .trim()
              .toLowerCase()
              .includes(searchText.trim().toLowerCase())
          ) {
            return true;
          }
          return false;
        });

    const tagFilter =
      Object.keys(selectedHastagIds).length === 0
        ? textFilter
        : textFilter.filter((goal) => {
            for (let key in goal.hashTags) {
              if (selectedHastagIds[key]) {
                return true;
              }
            }
            return false;
          });

    setFilteredGoals(tagFilter);
  }, [searchText, goals, selectedHastagIds]);

  const resetFilters = () => {
    resetSearchText();
    setSelectedHashTagIds({});
  };

  const renderGoals = () => {
    return sortedGoals.map((goal) => (
      <Goal
        goal={goal}
        setGoals={setGoals}
        globalHashTags={globalHashTags}
        key={goal._id}
      />
    ));
  };

  return (
    <div className={classes.root}>
      <div className={classes.searchFilterDiv}>
        <Paper elevation={2} component="div" className={classes.searchBarRoot}>
          <InputBase
            className={classes.input}
            placeholder="Search Goals"
            inputProps={{ "aria-label": "search Goals" }}
            value={searchText}
            onChange={setSearchText}
          />
          <div className={classes.searchIconContainer}>
            <SearchIcon />
          </div>
        </Paper>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <SortIcon />
        </IconButton>
      </div>
      <div className={classes.checkBoxContainer}>
        <Typography style={{ fontSize: "1.5rem" }}>
          Select Hashtags to filter by
        </Typography>
        <SelectTagFilters
          selectedHastagIds={selectedHastagIds}
          setSelectedHashTagIds={setSelectedHashTagIds}
          globalHashTags={globalHashTags}
        />
        <IconButton
          className={classes.resetButton}
          color="primary"
          onClick={resetFilters}
        >
          Reset Filters
        </IconButton>
      </div>

      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              setSortedGoals((prevGoals) => {
                return prevGoals.sort(function (a, b) {
                  const duration1 = a.isActive
                    ? a.duration +
                      (new Date().getTime() -
                        new Date(a.latestStartTimeStamp).getTime()) /
                        1000
                    : a.duration;

                  const duration2 = b.isActive
                    ? b.duration +
                      (new Date().getTime() -
                        new Date(b.latestStartTimeStamp).getTime()) /
                        1000
                    : b.duration;
                  return duration1 - duration2;
                });
              });
              handleClose();
            }}
          >
            <ListItemIcon>
              <ArrowDownwardIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Time spent</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSortedGoals((prevGoals) => {
                return prevGoals.sort(function (a, b) {
                  const duration1 = a.isActive
                    ? a.duration +
                      (new Date().getTime() -
                        new Date(a.latestStartTimeStamp).getTime()) /
                        1000
                    : a.duration;

                  const duration2 = b.isActive
                    ? b.duration +
                      (new Date().getTime() -
                        new Date(b.latestStartTimeStamp).getTime()) /
                        1000
                    : b.duration;
                  return duration2 - duration1;
                });
              });
              handleClose();
            }}
          >
            <ListItemIcon>
              <ArrowUpwardIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Time spent</Typography>
          </MenuItem>
        </MenuList>
      </Menu>
      {renderGoals()}
    </div>
  );
}

export default GoalList;





