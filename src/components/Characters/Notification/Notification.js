import { ROOT_MOODEL } from '../../../constants/root'

import styles from './Notification.css'

import imgCloseBlack from './img/closeBlack.png'

class Notification {

  render() {
    const htmlWrapper = `
      <div class="${styles.notification__container}">
        <span>нет контента</span>
        <button
          class="bg-contain ${styles.notification__close}"
          onclick="modal.innerHTML = ''"
          style="background-image: url(${imgCloseBlack});">
        </button>
      </div>
    `
    ROOT_MOODEL.innerHTML = htmlWrapper
  }
}

export default new Notification()