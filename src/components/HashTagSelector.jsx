import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { red, pink, green, purple, blue, teal, lime, yellow, grey, deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const HashTagSelector = ({ hashTags, setHashTags, globalHashTags }) => {
  const classes = useStyles();
  const theme = useTheme();

  const handleToggleHashTag = (hashTag) => {
    setHashTags((prevHashTags) => {
      if (prevHashTags[hashTag._id]) {
        const { [hashTag._id]: removedHashTag, ...updatedHashTags } = prevHashTags;
        return updatedHashTags;
      } else {
        return { ...prevHashTags, [hashTag._id]: hashTag };
      }
    });
  };

  const colors = {
    red,
    pink,
    green,
    purple,
    blue,
    teal,
    lime,
    yellow,
    grey,
    deepOrange,
  };

  const getColorButtonStyles = (hashTag, selected) => {
    const buttonColor = selected ? colors[hashTag.color][500] : "rgba(0,0,0,0)";
    const buttonBorderColor = selected ? colors[hashTag.color][500] : colors[hashTag.color][500];
    const buttonHoverColor = selected ? colors[hashTag.color][700] : colors[hashTag.color][700];
    const buttonTextColor = selected ? theme.palette.getContrastText(colors[hashTag.color][500]) : colors[hashTag.color][500];

    return makeStyles((theme) => ({
      root: {
        color: buttonTextColor,
        backgroundColor: buttonColor,
        borderColor: buttonBorderColor,
        "&:hover": {
          backgroundColor: buttonHoverColor,
          color: buttonTextColor,
          borderColor: buttonHoverColor,
        },
      },
    }));
  };

  return (
    <div>
      {globalHashTags.map((globalHashTag) => {
        const selected = Boolean(hashTags[globalHashTag._id]);
        const ColorButton = Button;
        const buttonStyles = getColorButtonStyles(globalHashTag, selected);

        return (
          <ColorButton
            className={`${classes.button} ${buttonStyles().root}`}
            size="small"
            key={globalHashTag._id}
            onClick={() => handleToggleHashTag(globalHashTag)}
            variant={selected ? "outlined" : "contained"}
          >
            {globalHashTag.tag}
          </ColorButton>
        );
      })}
    </div>
  );
};

export default HashTagSelector;
