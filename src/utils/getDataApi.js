import axios from 'axios'
import { API_KEY } from '../constants/api'

class GetDataApi {

  async getData(url) {
    try {
      const response = await axios.get(url, {
        params: {
          apikey: API_KEY
        }
      })
      return response.data.data.results

    } catch(error) {
      console.log(`ERROR: ${error.messsage}`)

      return false
    }
  }
}

export const getdDatApi = new GetDataApi()