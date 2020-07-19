import { connect } from "react-redux";
import AddReminder from "./AddReminder";
import { closeAddReminder, createReminder } from "../../redux/actions";

interface State {
  addReminderStatus: {
    isOpen: boolean;
    reminders?: any
    reminder?: any
  };
}

const mapStateToProps = (state: State) => {
  return {
    isOpen: state.addReminderStatus.isOpen,
    reminder: state.addReminderStatus.reminder,
    reminders: state.addReminderStatus.reminders
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClose: () => {
      dispatch(closeAddReminder());
    },
    onAdd: (props) => {
      dispatch(createReminder(props));
    }
  };
};

const AddReminderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddReminder);

export default AddReminderContainer;
