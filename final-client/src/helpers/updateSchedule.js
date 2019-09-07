import axios from 'axios';

export default function updateSchedule (scheduleId, start_place, end_place, transit, setSchedules) {
  return axios.put(`/schedule/${scheduleId}`, {start_place, end_place, transit})
}
