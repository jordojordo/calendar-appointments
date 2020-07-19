import { combineReducers } from "redux";
import {
  OPEN_AGENDA,
  CLOSE_AGENDA,
  OPEN_ADD_REMINDER,
  CLOSE_ADD_REMINDER,
  CREATE_REMINDER,
} from "./actions";

const initialAgendaState = {
  isOpen: false,
  date: null,
};

const initialAddReminderState = {
  isOpen: false,
  reminders: [],
  reminder: {
    title: "",
    date: new Date(),
    color: ""
  },
};

function agendaStatus(state = initialAgendaState, action: any) {
  switch (action.type) {
    case OPEN_AGENDA:
      return {
        isOpen: true,
        date: action.dateObj.date,
        reminder: initialAddReminderState.reminder,
      };
    case CLOSE_AGENDA:
      return {
        isOpen: false,
        date: null,
      };
    default:
      return state;
  }
}

function addReminderStatus(state = initialAddReminderState, action: any) {
  switch (action.type) {
    case OPEN_ADD_REMINDER:
      return {
        isOpen: true,
        reminders: [...state.reminders]
      };
    case CLOSE_ADD_REMINDER:
      return {
        isOpen: false,
        reminders: [...state.reminders]
      };
    case CREATE_REMINDER:
      console.log('action: ', action.reminderObj);

      return {
        ...state,
        reminders: [...state.reminders, action.reminderObj],
        isOpen: false
      };

    default:
      return state;
  }
}

const calendarApp = combineReducers({
  agendaStatus,
  addReminderStatus,
});

export default calendarApp;
