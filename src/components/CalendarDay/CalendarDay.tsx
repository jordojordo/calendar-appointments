import React, { useState } from "react";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import deepPurple from "@material-ui/core/colors/deepPurple";
import Typography from "@material-ui/core/Typography";
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { isSameMonth, isSameDay, getDate } from "date-fns";

const styles = (theme: Theme) =>
  createStyles({
    dayCell: {
      display: "flex",
      flex: "1 0 13%",
      flexDirection: "column",
      border: "1px solid lightgray",
      cursor: "pointer",
    },
    dayCellOutsideMonth: {
      display: "flex",
      flex: "1 0 13%",
      flexDirection: "column",
      border: "1px solid lightgray",
      backgroundColor: "rgba( 211, 211, 211, 0.4 )",
      cursor: "pointer",
    },
    dateNumber: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#000",
      backgroundColor: "transparent",
    },
    todayAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#fff",
      backgroundColor: deepPurple[400],
    },
    focusedAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#000",
      backgroundColor: "#f1f1f1",
    },
    focusedTodayAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#fff",
      backgroundColor: deepPurple[800],
    },
    remindersContainer: {
      height: "100%",
    },
  });

interface DateObj {
  date: Date;
}

interface Props extends WithStyles<typeof styles> {
  calendarDate: Date;
  dateObj: DateObj;
  addReminderStatus: {
    reminders?: any;
  };
  onDayClick: (dateObj: DateObj) => void;
}

const CalendarDay = (props: Props) => {
  const {
    classes,
    dateObj,
    addReminderStatus,
    calendarDate,
    onDayClick,
  } = props;
  const [focused, setFocused] = useState(false);

  const { reminders } = addReminderStatus;

  const isToday = isSameDay(dateObj.date, new Date());

  // iterate over reminders and filter the correct date for selected date
  const correctReminders =
    reminders.length > 0
      ? reminders.filter((reminder) =>
          isSameDay(dateObj.date, reminder.date)
        )
      : null;

  // Limit amount of reminders displayed
  const limitedReminders =
    correctReminders != null
      ? correctReminders
          .sort((a, b) => a.date - b.date)
          .slice(0, 3)
          .map((reminder) => (
            <div className={classes.remindersContainer}>
              <Grid container spacing={3} style={{ width: "100%", margin: "unset" }}>
                <FiberManualRecordIcon style={{ color: reminder.color }} />
                <Typography>{reminder.title}</Typography>
              </Grid>
            </div>
          ))
      : null;

  const avatarClass =
    isToday && focused
      ? classes.focusedTodayAvatar
      : isToday
      ? classes.todayAvatar
      : focused
      ? classes.focusedAvatar
      : classes.dateNumber;

  const onMouseOver = () => setFocused(true);
  const onMouseOut = () => setFocused(false);

  return (
    <div
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={() => onDayClick(dateObj)}
      className={
        isSameMonth(dateObj.date, calendarDate)
          ? classes.dayCell
          : classes.dayCellOutsideMonth
      }
    >
      <Avatar className={avatarClass}>{getDate(dateObj.date)}</Avatar>

      {limitedReminders}
      {/* Show amount of hidden reminders when greater than limited display (3) */}
      {correctReminders != null ? (
        correctReminders.length >= 4 ? (
          <div className={classes.remindersContainer}>
            <Grid container spacing={3} style={{ width: "100%", margin: "unset" }}>
              <MoreHorizIcon />
              <Typography>{`${
                correctReminders.slice(3).length
              } more reminders`}</Typography>
            </Grid>
          </div>
        ) : null
      ) : null}
    </div>
  );
};

export default withStyles(styles)(CalendarDay);
