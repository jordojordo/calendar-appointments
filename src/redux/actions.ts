// action types
export const OPEN_AGENDA = 'OPEN_AGENDA';
export const CLOSE_AGENDA = 'CLOSE_AGENDA';
export const OPEN_ADD_REMINDER = 'OPEN_ADD_REMINDER';
export const CLOSE_ADD_REMINDER = 'CLOSE_ADD_REMINDER';
export const CREATE_REMINDER = 'CREATE_REMINDER';

interface DateObj {
	date: Date
}

interface ReminderObj {
	reminder?: any
}

interface ReminderArr {
	reminders?: any
}

// action creators
export function openAgenda( dateObj: DateObj, reminderObj?: ReminderObj ) {
	return { type: OPEN_AGENDA, dateObj, reminderObj };
}

export function closeAgenda() {
	return { type: CLOSE_AGENDA };
}

export function openAddReminder( reminder?: any ) {
	return { type: OPEN_ADD_REMINDER, reminder };
}

export function closeAddReminder() {
	return { type: CLOSE_ADD_REMINDER };
}

export function createReminder( reminderObj?: ReminderObj, reminderArr?: ReminderArr ) {
	return { type: CREATE_REMINDER, reminderObj, reminderArr };
}
