import axios from "axios";
import searchPlaces from '../helpers/searchPlaces'
// load .env data into process.env

const APIKey = process.env.REACT_APP_GoogleAPIKey

//imaga search option
export default function imageSearch(inputvalue,setInputvalue,setplaces, setAlert) {
  return axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${APIKey}`,
  {
    "requests": [
        {
          "image": {
            "source": {
              "imageUri": inputvalue  
            } 
          },
          "features": [
            {
              "type": "LANDMARK_DETECTION"
            }
          ]
        }
    ]
  }
  ).then((response) => {
    setInputvalue('')
    setAlert('')
    if (response.data.responses[0].landmarkAnnotations) {
      const landmarks = response.data.responses[0].landmarkAnnotations.map((landmark) => landmark.description)
      Promise.all(
        landmarks.map(landmark => {
          return searchPlaces({'query': landmark})
        })
      )
      .then((all) => {
        const landmarks = all.map(each => {
          return each.data[0]
        })
        setplaces([])
        setplaces(landmarks)
      })
    } else {
      setAlert('No places found')
    }
  }).catch((err) => {
  })
}
