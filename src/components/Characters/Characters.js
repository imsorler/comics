import { IMG_SIZE_X_LARGE, IMG_NOT_AVAILABLE } from '../../constants/api'
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

      if(path.lastIndexOf(IMG_NOT_AVAILABLE) === -1) {
        htmlContent += `
        <li class="${styles.characters__item}" data-info>
          <img class="img-cover ${styles.characters__img}" src="${imgSrc}"/>
          <span class="${styles.charactes__name}" data-name>${name}</span>
        </li>
      `
      }
    })

    const htmlWrapper = `
      <div class="wrapper ${styles.wrapper}">
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

  eventListener(data) {
    const charactersCart = document.querySelectorAll('[data-info]')
    const charactersInfo = document.querySelectorAll('[data-name]')

    let charactersComicBook = []
    let dataNames = []
    let heroSeries = []
    let heroNames = []

    data.forEach((element) => {
      charactersComicBook.push(element)
    })

    charactersInfo.forEach((dataName) => {
      dataNames.push(dataName.textContent)
    })

    charactersCart.forEach((element) => {
      element.addEventListener('click', () => {
        console.log('Element', element) // в element записывать результат
        console.log('dataNames', dataNames)
        
        element.innerHTML = ``

        charactersComicBook.forEach(({name, series: { items }}) => {
          // console.log('1.Name', name, '2.Series', items)
          heroNames.push(name)
          heroSeries.push(items)
        })


        for(
          let i=0,j=0, k=0;
          i<=charactersCart.length,
          j<=heroSeries.length,
          k < heroNames.length;
          i++,j++,k++
          ) {
          dataNames.forEach((names) => {
            if (names === heroNames[k]) {
              element.innerHTML += `
                <h6>${heroSeries[i][j].name}</h6>
              `
            }
          })
        } 
      })
    })
  }

  async render(uri) {
    const data = await getDataApi.getData(uri)

    if(data.length) {
      this.renderContent(data)
      this.eventListener(data)
    } else {
      Notification.render()
    }
  }
}

export default new Characters()