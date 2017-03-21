import * as React from 'react'
import createMockStore from 'redux-mock-store'

import { mount } from 'enzyme'
import { List } from 'immutable'
import { Provider } from 'react-redux'
import { Action } from 'redux'

import App from '../App'
import { Content } from '../Content'
import { Sidebar } from '../Sidebar'

import { FETCH_TASKS } from '../../actions/types'
import { Navbar } from '../../components/Navbar'

describe('App container', () => {
  const createStore = createMockStore()
  const store = createStore({
    app: {
      darkMode: false,
      sidebarToggled: true
    },
    tasks: List()
  })

  const app = mount(
    <Provider store={store as any}>
      <App></App>
    </Provider>
  )

  it('renders with correct id', () => {
    expect(app.find('#rs-app').length).toBe(1)
  })

  it('renders navbar, sidebar and main content', () => {
    expect(app.find('#rs-app').children().length).toBe(2)
    expect(app.find(Navbar)).toHaveLength(1)
    expect(app.find(Sidebar)).toHaveLength(1)
    expect(app.find(Content)).toHaveLength(1)
  })

  const store2 = createStore({
    app: {
      sidebarToggled: false
    },
    tasks: List()
  })

  const app2 = mount(
    <Provider store={store2 as any}>
      <App></App>
    </Provider>
  )

  it('will not render sidebar if not toggled', () => {
    expect(app2.find(Sidebar)).toHaveLength(0)
  })

  it('dispatch FETCH_TASKS on mount', () => {
    const actions = store2.getActions()
    expect(actions.filter((a) => a.type === FETCH_TASKS)).toHaveLength(1)
  })
})
