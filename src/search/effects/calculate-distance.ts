import axios from "axios"
import {Address} from '../../state/address'
import {API_KEY} from '../../config'

export const calculateDistance = (origin:Address,distination: Address)=>{
  return axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.location.lat},${origin.location.lng}&destinations=${distination.location.lat}%2C${distination.location.lng}&key=${API_KEY}`)
}