import { ROOT_INDEX } from '../../constants/root'

import styles from './Error.css'

class Error {

  render() {
    const htmlWrapper = `
      <div class="${styles.error__container}">
        <span class="${styles.error__alert}">
          <p class="${styles.error__alert}">Произошла ошибка.</p>
          <p class="${styles.error__alert}">Попробуйте зайти позже</p>
        </span>
      </div>
    `

    ROOT_INDEX.innerHTML = htmlWrapper
  }
}

export default new Error()