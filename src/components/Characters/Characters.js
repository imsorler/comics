import { IMG_SIZE_X_LARGE } from '../../constants/api'
import { ROOT_MOODEL } from '../../constants/root'
import { getDataApi } from '../../utils/getDataApi'
import Notification from './Notification'

import styles from './Characters.css'

import imgCloseBlue from './img/closeBlue.png'

class Characters {

  renderContent(data) {
    let htmlContent = ''

    data.forEach(({ name, thumbnail: { path, extension } }) => {
      const imgSrc = path + '/' + IMG_SIZE_X_LARGE + '.' + extension
      
      htmlContent += `
        <li class="${styles.characters__item}">
          <img class="img-cover ${styles.characters__img}" src="${imgSrc}"/>
          <span class="${styles.charactes__name}">${name}</span>
        </li>
      `
    })

    const htmlWrapper = `
      <div class="${styles.wrapper}">
        <ul class="${styles.characters__container}">
          ${htmlContent}
        </ul>
        <button
          class="bg-contain ${styles.characters__close}"
          onclick="modal.innerHTML = ''"
          style="background-image: url(${imgCloseBlue});">
        </button>
      </div>
    `
    ROOT_MOODEL.innerHTML = htmlWrapper
  }

  async render(uri) {
    const data = await getDataApi.getData(uri)

    data.length ? this.renderContent(data) : Notification.render()
  }
}

export default new Characters()