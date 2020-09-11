import { INITIALIZE } from '@/store/modules/meet/types'

function persistMeet(store) {
  function updateLocalStorage(updatedData) {
    localStorage.setItem('meets', JSON.stringify(updatedData))
  }

  store.subscribe((mutation, state) => {
    const isFromMeetModule = mutation.type.startsWith('meet/')
    const isNotInitialMutation = mutation.type !== `meet/${INITIALIZE}`

    if (isFromMeetModule && isNotInitialMutation) {
      updateLocalStorage(state.meet.meets)
    }
  })
}

export default persistMeet
