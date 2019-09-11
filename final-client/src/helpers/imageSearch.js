import axios from "axios";
import searchPlaces from '../helpers/searchPlaces'
//imaga search option
export default function imageSearch(inputvalue,setInputvalue,setplaces, setAlert) {
  console.log('oh here is the image search')
  return axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDtGZmEeW3QEK20irH8SpIpdKQjPoKuW5U',
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
    console.log('image search')
    setAlert('')
    if (response.data.responses[0].landmarkAnnotations) {
      const landmarks = response.data.responses[0].landmarkAnnotations.map((landmark) => landmark.description)
      console.log(landmarks)
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
    console.log(err)
  })
}
