import {
  FETCH_TASKS,
  FETCH_TASKS_START,
  FETCH_TASKS_SUCCESS,
  SET_ACTIVE_RESOURCE,
  SET_ACTIVE_WIDGET,
  TOGGLE_DARK_MODE,
  TOGGLE_SETTINGS_DIALOG_OPEN,
  TOGGLE_SIDEBAR
} from './types'

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR
})

export const toggleSettingsDialogOpen = () => ({
  type: TOGGLE_SETTINGS_DIALOG_OPEN
})

export const toggleDarkMode = () => ({
  type: TOGGLE_DARK_MODE
})

export const fetchTasks = () => ({
  type: FETCH_TASKS
})

export const fetchTasksStart = () => ({
  type: FETCH_TASKS_START
})

export const fetchTasksSuccess = (tasks: any[]) => ({
  payload: tasks,
  type: FETCH_TASKS_SUCCESS
})

export const setActiveResource = (resource: ('briefing' | 'task'), id: number) => ({
  payload: {
    resource,
    id
  },
  type: SET_ACTIVE_RESOURCE
})

export const setActiveWidget = (widget: ('none' | 'interpreter' | 'comments')) => ({
  payload: widget,
  type: SET_ACTIVE_WIDGET
})

