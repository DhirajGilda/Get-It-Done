import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const CheckBoxComp=({ hashTag, selectedHastagIds, setSelectedHashTagIds })=> {
  const handleChange = () => {
    if (selectedHastagIds[hashTag._id]) {
      // return setSelectedHashTagIds((prevHashTagsIds) =>
      //   prevHashTagsIds.filter((prevHashTagId) => hashTag._id !== prevHashTagId)
      // );
      return setSelectedHashTagIds((prevHashTagIds) => {
        delete prevHashTagIds[hashTag._id];
        return { ...prevHashTagIds };
      });
    }
    setSelectedHashTagIds((prevHashTags) => {
      return { ...prevHashTags, [hashTag._id]: true };
    });
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={selectedHastagIds[hashTag._id] ? true : false}
          onChange={handleChange}
        />
      }
      label={hashTag.tag}
    />
  );
}

export default CheckBoxComp;