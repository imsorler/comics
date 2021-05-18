import { 
    API_URL,
    IMG_SIZE_X_LARGE,
    URL_COMIX,
    IMG_NOT_AVAILABLE,
    URL_CHARACTERS
  } from '../../constants/api'

import { getdDatApi } from '../../utils/getDataApi'
import { ROOT_INDEX } from '../../constants/root'

import './Comics.css'

class Comics {
  
  async render() {
    const data = await getdDatApi.getData(API_URL + URL_COMIX)

    let htmlContent = ''

    data.forEach(({ id, title, thumbnail: { extension, path } }) => {

      if (path.lastIndexOf(IMG_NOT_AVAILABLE) === -1) {
        const IMG_SRC = path + '/' + IMG_SIZE_X_LARGE + '.' + extension
        const uri = API_URL + URL_COMIX + '/' + id + '/' + URL_CHARACTERS

        htmlContent += `
        <li class="comics__item" data-uri="${uri}">
          <span class="comics__name">${title}</span>
          <img class="comics_img" src="${IMG_SRC}">
        </li>
      `
      }
    })

    const htmlWrapper = `
      <ul class="comics__container">
        ${htmlContent}
      </ul>
    `

    ROOT_INDEX.innerHTML = htmlWrapper
  }

  eventListener() {
    document.querySelectorAll('.comics__item').forEach(element => {
      const uri = element.getAttribute('data-uri')

      element.addEventListener('click', () => {
        //получаю url на который нужно отправлять запрос
        console.log(uri)
      })
    })
  }
}

export default new Comics()