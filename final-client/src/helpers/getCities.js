import axios from "axios";
import qs from 'qs'

axios.defaults.baseURL = process.env.SERVER_URL || "http://localhost:8080"
axios.defaults.headers.common = {
  "Content-Type": "application/x-www-form-urlencoded"
}
export default function getCities(data) {

  const options = {
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
    url: '/cities'
  }
  return (
    axios(options)
  )

}