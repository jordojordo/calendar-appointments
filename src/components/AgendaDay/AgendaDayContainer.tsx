import { connect } from "react-redux";
import AgendaDay from "./AgendaDay";
import { closeAgenda } from "../../redux/actions";

interface Props {}

interface State {
  agendaStatus: {
    isOpen: boolean;
    date: Date;
  };
  addReminderStatus: {
    reminders?: any;
  };
}

const mapStateToProps = (state: State, ownProps: Props) => {
  const { agendaStatus, addReminderStatus } = state;

  return { agendaStatus, addReminderStatus };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClose: () => {
      dispatch(closeAgenda());
    },
  };
};

const AgendaDayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AgendaDay);

export default AgendaDayContainer;
