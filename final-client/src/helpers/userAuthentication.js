import axios from "axios";
import qs from 'qs'

axios.defaults.baseURL = process.env.SERVER_URL || "http://localhost:8080"
axios.defaults.headers.common = {
  "Content-Type": "application/x-www-form-urlencoded"
}
export default function userAuthentication(user) {
  // format example for data
  // { 
  //   'query': inputvalue, 
  //   location: {lat:'49.246292', lng: '-123.116226'} --- this is optional
  // }

  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(user),
    url: '/user'
  }
  return (
    axios(options)
  )

  // axios(options).then(function(response) {
  //   console.log(response.data)
  // });


}
