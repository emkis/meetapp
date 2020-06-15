import trailsFactory from './trailsFactory'
import { meets as originalMeets } from './meets'
import { CATEGORIES } from './utils/constants'
import { haveOnlyLetters, mustNotBeGreaterThanLimit, mustBeMultipleOfFive, isEmpty } from './utils/validators'

function createUi(configurations = {}) {
  const meets = configurations.meets || originalMeets
  const categories = configurations.categories || CATEGORIES
  const factory = configurations.factory || trailsFactory

  const $alert = document.querySelector('.alert')
  const $form = document.querySelector('.meet__register')
  const $nameInput = document.querySelector('#meet-name')
  const $durationInput = document.querySelector('#meet-duration')
  const $categoryInput = document.querySelector('#meet-category')
  const $organizeButton = document.querySelector('#organizer')
  const $categoryFilters = document.querySelector('.filters-list')

  $form.addEventListener('submit', handleSubmit)
  $nameInput.addEventListener('input', (event) => handleInput(event, 'meetName'))
  $categoryInput.addEventListener('change', handleSelect)
  $durationInput.addEventListener('input', (event) => handleInput(event, 'meetDuration'))
  $organizeButton.addEventListener('click', handleOrganize)

  const state = {
    meetName: '',
    meetCategory: '',
    meetDuration: '',
    errors: [],
    filter: ''
  }

  function _resetState() {
    $nameInput.value = ''
    $durationInput.value = ''
    $categoryInput.value = ''
    $alert.innerHTML = ""

    state.meetName = ''
    state.meetDuration = ''
    state.errors = []
    state.filter = ''

    resetFilterButtons()
  }

  function handleInput({ target }, propName) {
    const value = target.value.trim()
    state[propName] = value
  }

  function handleFilterClick({ target }) {
    const clickedButton = target
    const selectedFilter = clickedButton.value

    const alreadySelected = state.filter === selectedFilter

    if (alreadySelected) {
      clickedButton.classList.remove('selected')
      state.filter = ''
    } else {
      resetFilterButtons()
      clickedButton.classList.add('selected')
      state.filter = selectedFilter
    }

    renderFilteredMeets()
  }

  function renderFilteredMeets() {
    const trailsContainer = document.querySelectorAll('.trail-list')
    const filter = state.filter

    if (!filter) {
      trailsContainer.forEach(trail => trail.classList.remove('filtered'))
    } else {
      trailsContainer.forEach(trail => trail.classList.add('filtered'))
    }

    const meets = document.querySelectorAll('.trail-list > li')

    meets.forEach(meet => {
      meet.classList.remove('found')
      const category = meet.getAttribute('category') ?? null

      if (!category) return
      if (filter === category) meet.classList.add('found')
    })
  }

  function resetFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter')
    filterButtons.forEach(button => button.classList.remove('selected'))
  }

  function handleSelect({ target }) {
    const value = target.value.trim()
    state.meetCategory = value
  }

  function handleSubmit(event) {
    event.preventDefault()
    handleErrors()
  }

  function renderCategories() {
    const categoriesNames = Object.values(categories)

    categoriesNames.forEach(categoryName => {
      const option = document.createElement('option')
      option.textContent = categoryName
      option.value = categoryName

      const button = document.createElement('button')
      button.classList.add('filter')
      button.textContent = categoryName
      button.setAttribute('value', categoryName)
      button.onclick = handleFilterClick

      $categoryInput.append(option)
      $categoryFilters.append(button)
    })
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
    const filtersContainer = document.querySelector('.filters')

    trailsContainer.innerHTML = ''
    trailsContainer.style = ''
    filtersContainer.style = ''

    trails.forEach((trail, trailIndex) => {
      const trailWrapper = document.createElement('div')
      trailWrapper.classList.add('container')

      const trailTitle = document.createElement('h4')
      trailTitle.textContent = `👉 Trail ${trailIndex + 1}`

      const trailList = document.createElement('ul')
      trailList.classList.add('trail-list')

      trail.forEach(meet => {
        const trailListItem = document.createElement('li')
        const trailTime = document.createElement('span')

        trailTime.textContent = meet.time
        trailListItem.textContent = meet.name

        trailListItem.insertBefore(trailTime, trailListItem.firstChild)
        meet.category && trailListItem.setAttribute('category', meet.category)
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
    const categoryIsEmpty = isEmpty(state.meetCategory)

    if (inputsAreEmpty) {
      addError('You need to fill in all the inputs')
    }

    if (nameHasOnlyText) {
      addError(`The name can't have a number`)
    }

    if (categoryIsEmpty) {
      addError(`You must choose a category`)
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
      category: state.meetCategory,
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
    renderCategories(categories)
    renderRawList()
  }

  return { render }
}

export default createUi
