import axios from 'axios';

export default function updateSchedule (scheduleId, start_place, end_place, transit, setSchedules) {
  axios.put(`/schedule/${scheduleId}`, {start_place, end_place, transit}).then((response) => {
    const newSchedule = response.data
    console.log(newSchedule)
    setSchedules(prev => {
      console.log('prev')
      console.log(prev)
      const otherSchedules = prev.filter(each => {
        return each.id !== newSchedule.id
      })
      return [...otherSchedules, newSchedule]
    })
  })
}
