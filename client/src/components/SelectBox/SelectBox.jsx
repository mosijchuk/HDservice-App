import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import { useEffect } from "react";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

const SelectBox = props => {
  const classes = useStyles();
  const [currentValue, setValue] = React.useState(props.data[0].value);
  const handleChange = event => {
    setValue(event.target.value);
  };

  useEffect(() => {
    props.handleSelect(currentValue);
  }, [currentValue]);

  const options = props.data.map(option => (
    <MenuItem value={option.value} key={option.value}>
      {option.name}
    </MenuItem>
  ));

  let selectStyles = {};

  //styling select
  if (props.size === "medium") {
    selectStyles.bc = "#fdcb78";
    selectStyles.p = "10px 15px";
    selectStyles.fz = 16;
  } else {
    selectStyles.bc = "#f5f5f5";
    selectStyles.p = "5px 15px";
    selectStyles.fz = 14;
  }

  const StyledSelect = withStyles(theme => ({
    root: {
      "label + &": {
        marginTop: theme.spacing(3)
      }
    },
    input: {
      position: "relative",
      backgroundColor: selectStyles.bc,
      fontSize: selectStyles.fz,
      outline: "none",
      padding: selectStyles.p,
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      borderRadius: 30,
      border: "none",
      "&:focus": {
        borderRadius: 30,
        backgroundColor: selectStyles.bc,
        boxShadow: "none"
      }
    }
  }))(InputBase);

  return (
    <Select
      id={props.name + "-select"}
      value={currentValue}
      onChange={handleChange}
      input={<StyledSelect />}
      disabled={props.disabled || false}
    >
      {options}
    </Select>
  );
};

export default SelectBox;
