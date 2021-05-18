import { API_URL, URL_COMIX } from '../../constants/api'
import { getdDatApi } from '../../utils/getDataApi'

import './App.css'

class App {

  async render() {
    const data = await getdDatApi.getData(API_URL + URL_COMIX)

    console.log(data)
  }
}

export default new App