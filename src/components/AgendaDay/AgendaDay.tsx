import React from "react";
import { isSameDay } from "date-fns";
import CloseIcon from "@material-ui/icons/Close";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";

import * as dateFns from "date-fns";

const styles = (theme: Theme) =>
  createStyles({
    remindersContainer: {
      minHeight: "250px",
      marginTop: "10px",
    },
    closeButton: {
      position: "absolute",
      right: "10px",
      top: "10px",
    },
    toolbarButtonHidden: {
      visibility: "hidden",
    },
    toolbarButtonVisible: {
      visibility: "visible",
    },
  });

interface Props extends WithStyles<typeof styles> {
  agendaStatus: {
    isOpen: boolean;
    date: Date;
  };
  addReminderStatus: {
    reminders?: any;
  };
  onClose: () => void;
}

const AgendaDay = (props: Props) => {
  const { classes, agendaStatus, addReminderStatus, onClose } = props;
  const { reminders } = addReminderStatus;

  const dateTitle = agendaStatus.date
    ? dateFns.format(agendaStatus.date, "LLLL do, yyyy")
    : "Closing";

  // iterate over reminders and filter the correct date for selected date
  const correctReminders =
    reminders.length > 0
      ? reminders.filter((reminder) =>
          isSameDay(agendaStatus.date, reminder.date)
        )
      : null;

  return (
    <Dialog
      open={agendaStatus.isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        {dateTitle}
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider light />
      <DialogContent className={classes.remindersContainer}>
        {correctReminders != null
          ? correctReminders
              .sort((a, b) => a.date - b.date)
              .map((reminder) => (
                <Grid container spacing={3} style={{ width: "100%", margin: "unset" }}>
                  <FiberManualRecordIcon style={{ color: reminder.color }} />
                  <Typography>{reminder.title}</Typography>
                </Grid>
              ))
          : null}
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(AgendaDay);
