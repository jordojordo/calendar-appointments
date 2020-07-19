import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import {
  WithStyles,
  withStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import { GithubPicker } from "react-color";

const styles = (theme: Theme) =>
  createStyles({
    addReminderFormContainer: {
      minHeight: "250px",
      marginTop: "10px",
      display: "flex",
      flexDirection: "column",
    },
    closeButton: {
      position: "absolute",
      right: "10px",
      top: "10px",
    },
    colorPopover: {
      zIndex: 2,
      margin: "0 12px"
    },
  });

interface Props extends WithStyles<typeof styles> {
  isOpen: boolean;
  onClose: () => void;
  onAdd: any;
}

let initReminderState = {
  title: "",
  date: new Date(),
  color: "#e57373"
};

const AddReminder = (props: Props) => {
  const [inputValue, setInputValue] = useState(initReminderState);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [iconColor, setIconColor] = useState("#e57373")
  const { classes, isOpen, onClose, onAdd } = props;
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setInputValue({
      ...inputValue,
      [id]: value.substring(0, 30),
    });
  };

  const handleDateChange = (date: Date | null) => {
    setInputValue({
      ...inputValue,
      date: date,
    });
  };

  const handleColorIcon = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleColorChange = (color, event) => {
    setIconColor(color.hex)
    setInputValue({
      ...inputValue,
      color: color.hex
    })
    setDisplayColorPicker(!displayColorPicker);
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">
        Add Reminder
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider light />
      <DialogContent className={classes.addReminderFormContainer}>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12} spacing={3}>
              <TextField
                id="title"
                label="Add Title"
                value={inputValue.title}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} spacing={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  margin="normal"
                  id="date"
                  label="Date"
                  format="MM/dd/yyyy"
                  value={inputValue.date}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} spacing={3} container direction="row" alignItems="center">
              <IconButton
                onClick={handleColorIcon}
                style={{ color: iconColor }}
              >
                <ColorLensIcon />
              </IconButton>
              {displayColorPicker ? (
                <div className={classes.colorPopover}>
                  {/* using GithubPicker from react-color */}
                  <GithubPicker
                    triangle="hide"
                    colors={[
                      "#e57373",
                      "#ba68c8",
                      "#7986cb",
                      "#4fc3f7",
                      "#4db6ac",
                      "#aed581",
                      "#fff176",
                      "#ffb74d",
                    ]}
                    onChange={(color, event) => handleColorChange(color, event)}
                  />
                </div>
              ) : null}
            </Grid>
            <Grid item xs={12} spacing={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onAdd(inputValue)}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(AddReminder);
