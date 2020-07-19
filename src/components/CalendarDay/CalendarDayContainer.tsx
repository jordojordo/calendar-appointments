import { connect } from "react-redux";
import CalendarDay from "./CalendarDay";
import { openAgenda } from "../../redux/actions";

interface Props {}

interface State {
  addReminderStatus: {
    reminders?: any;
  }
}

interface DateObj {
  date: Date;
}

interface ReminderObj {
  reminder?: any;
}

const mapStateToProps = (state: State, ownProps: Props) => {
  return { ...state, ...ownProps };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onDayClick: (dateObj: DateObj, reminderObj: ReminderObj) => {
      dispatch(openAgenda(dateObj, reminderObj));
    },
  };
};

const CalendarDayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarDay);

export default CalendarDayContainer;
