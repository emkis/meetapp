import trailsFactory from './trailsFactory'
import { meets as originalMeets } from './meets'
import { haveOnlyLetters, mustNotBeGreaterThanLimit, mustBeMultipleOfFive, isEmpty } from './utils/validators'

function createUi(configurations = {}) {
  const meets = configurations.meets || originalMeets
  const factory = configurations.factory || trailsFactory

  const $alert = document.querySelector('.alert')
  const $form = document.querySelector('.meet__register')
  const $nameInput = document.querySelector('#meet-name')
  const $durationInput = document.querySelector('#meet-duration')
  const $organizeButton = document.querySelector('#organizer')

  $form.addEventListener('submit', handleSubmit)
  $nameInput.addEventListener('input', (event) => handleInput(event, 'meetName'))
  $durationInput.addEventListener('input', (event) => handleInput(event, 'meetDuration'))
  $organizeButton.addEventListener('click', handleOrganize)

  const state = {
    meetName: '',
    meetDuration: '',
    errors: []
  }

  function _resetState() {
    $nameInput.value = ''
    $durationInput.value = ''
    $alert.innerHTML = ""

    state.meetName = ''
    state.meetDuration = ''
    state.errors = []
  }

  function handleInput({ target }, propName) {
    const value = target.value.trim()
    state[propName] = value
  }

  function handleSubmit(event) {
    event.preventDefault()
    handleErrors()
  }

  function handleOrganize() {
    const organizer = factory(meets)
    organizer.build()

    const trails = organizer.buildSchedule()
    renderTrails(trails)
  }

  function renderRawList() {
    const $meetList = document.querySelector('.meet-list')
    $meetList.innerHTML = ''

    meets.forEach(meet => {
      const meetListItem = document.createElement('li')
      const meetListItemSpan = document.createElement('span')

      meetListItem.classList.add('meet-list__item')
      meetListItem.textContent = meet.name
      meetListItemSpan.textContent = ` ${meet.duration}min`

      meetListItem.appendChild(meetListItemSpan)
      $meetList.appendChild(meetListItem)
    })
  }

  function renderTrails(trails) {
    const trailsContainer = document.querySelector('.trails')
    trailsContainer.innerHTML = ''
    trailsContainer.style = ''

    trails.forEach((trail, trailIndex) => {
      const trailWrapper = document.createElement('div')
      trailWrapper.classList.add('container')

      const trailTitle = document.createElement('h4')
      trailTitle.textContent = `👉 Trail ${trailIndex + 1}`

      const trailList = document.createElement('ul')
      trailList.classList.add('trail-list')

      trail.forEach(meet => {
        const trailListItem = document.createElement('li')
        trailListItem.textContent = meet
        trailList.appendChild(trailListItem)
      })

      trailWrapper.appendChild(trailTitle)
      trailWrapper.appendChild(trailList)
      trailsContainer.appendChild(trailWrapper)
    })
  }

  function handleErrors() {
    const durationIsBiggerThanLimit = mustNotBeGreaterThanLimit(state.meetDuration)
    const inputsAreEmpty = isEmpty(state.meetName) || isEmpty(state.meetDuration)
    const durationIsInvalid = !mustBeMultipleOfFive(state.meetDuration)
    const nameHasOnlyText = !haveOnlyLetters(state.meetName)

    if (inputsAreEmpty) {
      addError('You need to fill in all the inputs')
    }

    if (nameHasOnlyText) {
      addError(`The name can't have a number`)
    }

    if (durationIsBiggerThanLimit) {
      addError(`Can't be greater than 240 minutes`)
    }

    if (durationIsInvalid) {
      addError('Only durations multiple of five are allowed')
    }

    else if (!hasErrors()) addMeet()
    renderErrors()
  }

  function renderErrors() {
    $alert.innerHTML = ""

    if (state.errors.length > 0) $alert.classList.add('visible')
    else $alert.classList.remove('visible')

    state.errors.forEach(errorMessage => {
      const message = document.createElement('p')
      message.textContent = errorMessage

      $alert.appendChild(message)
    })

    state.errors = []
  }

  function addMeet() {
    const meet = {
      name: state.meetName,
      duration: parseInt(state.meetDuration)
    }

    meets.push(meet)
    renderRawList()
    _resetState()
    $nameInput.focus()
  }

  function addError(error) {
    state.errors.push(error)
  }

  function hasErrors() {
    return !!state.errors.length
  }

  function render() {
    renderRawList()
  }

  return { render }
}

export default createUi
