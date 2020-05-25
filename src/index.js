import coreUI from './ui'
import { meets } from './meets'
import trailsFactory from './trailsFactory'

const ui = coreUI(trailsFactory, meets)
ui.start()
