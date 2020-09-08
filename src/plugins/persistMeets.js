import { INITIALISE } from '@/store/modules/meet/types'

function persistMeet(store) {
  function updateLocalStorage(updatedData) {
    localStorage.setItem('meets', JSON.stringify(updatedData))
  }

  store.subscribe((mutation, state) => {
    const isFromMeetModule = mutation.type.startsWith('meet/')
    const isNotInitialMutation = mutation.type !== `meet/${INITIALISE}`

    if (isFromMeetModule && isNotInitialMutation) {
      updateLocalStorage(state.meet.meets)
    }
  })
}

export default persistMeet
