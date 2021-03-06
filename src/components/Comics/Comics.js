import { 
    API_URL,
    IMG_SIZE_X_LARGE,
    URL_COMIX,
    IMG_NOT_AVAILABLE,
    URL_CHARACTERS
  } from '../../constants/api'

import { getDataApi } from '../../utils/getDataApi'
import { ROOT_INDEX } from '../../constants/root'

import Error from '../Error'
import Characters from '../Characters'

import styles from './Comics.css'

class Comics {

  renderComics(data) {
    let htmlContent = ''

    data.forEach(({ id, title, thumbnail: { extension, path } }) => {

      if (path.lastIndexOf(IMG_NOT_AVAILABLE) === -1) {
        const IMG_SRC = path + '/' + IMG_SIZE_X_LARGE + '.' + extension
        const uri = API_URL + URL_COMIX + '/' + id + '/' + URL_CHARACTERS

        htmlContent += `
        <li class="comics__item ${styles.comics__item}" data-uri="${uri}">
          <span class="${styles.comics__name}">${title}</span>
          <img class="img-contain ${styles.comics_img}" src="${IMG_SRC}">
        </li>
      `
      }
    })

    const htmlWrapper = `
      <ul class="${styles.comics__container}">
        ${htmlContent}
      </ul>
    `

    ROOT_INDEX.innerHTML = htmlWrapper
  }
  
  async render() {
    const data = await getDataApi.getData(API_URL + URL_COMIX)

    data ? this.renderComics(data) : Error.render()
  }

  eventListener() {
    document.querySelectorAll('.comics__item').forEach(element => {
      const uri = element.getAttribute('data-uri')

      element.addEventListener('click', () => {
        //получаю url на который нужно отправлять запрос
        Characters.render(uri)
      })
    })
  }
}

export default new Comics()