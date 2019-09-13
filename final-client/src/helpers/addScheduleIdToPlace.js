import axios from 'axios';

export default function addScheduleIdToPlace (placeId, scheduleId, setUser) {
  axios.put(`/places/${placeId}/schedule`, {scheduleId: scheduleId}).then((response) => {
    setUser(prev => ({...prev}))
  })
}

