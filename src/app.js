import initModel from './appStates/model.js'
import initView from './appStates/view.js'
import bindController from './appStates/controller.js'
import i18next from 'i18next'
import resources from './locales/index.js'

export default () => {
  const elements = {
    formElement: document.querySelector('#rss-form'),
    inputElement: document.querySelector('#url-input'),
    feedbackElement: document.querySelector('#feedback'),
    feedsElement: document.querySelector('#feeds'),
    postsElement: document.querySelector('#posts'),
    textFields: {
      title: document.querySelector('#rss-title'),
      description: document.querySelector('#rss-description'),
      example: document.querySelector('#rss-example'),
      submitButton: document.querySelector('#rss-submit'),
      label: document.querySelector('label[for="url-input"]'),
    },
  }

  const state = initModel()
  const defaultLanguage = 'ru'

  const i18n = i18next.createInstance()
  i18n
    .init({
      lng: defaultLanguage,
      resources,
    })
    .then(() => {
      // use i18n
      const watchedState = initView(state, i18n, elements)
      bindController(watchedState, elements)
    })
    .catch()
}
