import trailsFactory from './trailsFactory'
import { meets } from './meets'

const trails = trailsFactory(meets)
console.log( trails.build() )
console.log( trails.buildSchedule() )
