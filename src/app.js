// import initModel from './appStates/model.js'
// import initView from './appStates/view.js'
import bindController from './appStates/controller.js'
import i18next from 'i18next'
import resourses from './locales/index.js'

export default () => {
  // view logic (plug)
  const mainEl = document.querySelector('.main')
  const mainContainer = document.createElement('div')
  mainContainer.classList.add('.container')

  const formEl = document.createElement('form')
  const inputEl = document.createElement('input')
  inputEl.type = 'text'
  inputEl.placeholder = 'Ссылка RSS'

  const resetBtn = document.createElement('button')
  resetBtn.type = 'reset'
  resetBtn.classList.add('btn', 'btn-primary')
  resetBtn.textContent = 'Добавить'
  formEl.append(inputEl, resetBtn)
  mainContainer.append(formEl)
  mainEl.append(mainContainer)

  const i18n = i18next.createInstance()
  i18n.init({
    lng: 'ru',
    resourses,
  })
    .then(() => {
      // use i18n
    })
    .catch()

  // const state = initModel()
  // const watchedState = initView(state)
  const watchedState = {
    // plug
    plug: 'plug',
  }
  bindController(watchedState)
}
