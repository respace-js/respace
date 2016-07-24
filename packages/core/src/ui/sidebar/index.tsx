import * as React from 'react'
import { observer } from 'mobx-react'
import { IUIStore, IDocumentStore } from '@respace/common'
import { Row, Button, ButtonGroup } from 'react-bootstrap'
import { Motion, spring, presets } from 'react-motion'
import FaExpand from 'react-icons/fa/expand'
import FaCogs from 'react-icons/fa/cogs'
import FaInfo from 'react-icons/fa/info-circle'
import ComponentPicker from './component-picker'
import { addTooltip } from '../util'

export interface ISidebarProps {
  documentStore: IDocumentStore,
  uiStore: IUIStore
}

const Sidebar = ({ documentStore, uiStore }: ISidebarProps) => {
  const startWidth = uiStore.isSidebarToggled
      ? uiStore.SIDEBAR_MIN_WIDTH
      : uiStore.SIDEBAR_MAX_WIDTH
  const endWidth = uiStore.isSidebarToggled
      ? uiStore.SIDEBAR_MAX_WIDTH
      : uiStore.SIDEBAR_MIN_WIDTH
  const handleExpand = uiStore.toggleSidebar.bind(uiStore)
  const components = uiStore.sidebarComponents.map(() => {
    return <Row></Row>
  })

  const toggleSidebarButton = (
    <Button onClick={handleExpand} bsStyle='success'>
      <FaExpand />
    </Button>
  )

  const header = (
    <ButtonGroup>
      { addTooltip(toggleSidebarButton, 'Toggle Sidebar', true, 'bottom') }
      { uiStore.isSidebarToggled &&
        <Button onClick={handleExpand} bsStyle='info'>
          <FaCogs />
        </Button> }
      { uiStore.isSidebarToggled &&
        <Button onClick={handleExpand} bsStyle='default'>
          <FaInfo />
        </Button>
      }
    </ButtonGroup>
  )

  const sidebar = interp => {
    const style = {
      float: 'left',
      width: interp.width + 'px',
      height: uiStore.appHeight + 'px'
    }
    return (
      <div className='sidebar' style={style}>
        { header }
        <ComponentPicker {...{ uiStore }} />
      </div>
    )
  }
  const onRest = () => {
    uiStore.isSidebarAnimating = false
  }
  return (
    <Motion defaultStyle={{ width: startWidth }} onRest={ onRest }
            style={{ width: spring(endWidth, presets.stiff) }}>
      { sidebar }
    </Motion>
  )
}

export default observer(Sidebar)