import * as yup from 'yup'
import axios from 'axios'
import uniqueId from 'lodash.uniqueid'

const feedbackInners = {
  required: 'feedback.validation.required',
  duplicated: 'feedback.validation.duplicated',
  incorrecredUrl: 'feedback.validation.incorrecredUrl',
  fail: 'feedback.processStates.fail',
  success: 'feedback.processStates.success',
  network: 'feedback.network',
}

yup.setLocale({
  mixed: {
    required: () => feedbackInners.required,
    notOneOf: () => feedbackInners.duplicated,
  },
  string: {
    url: () => feedbackInners.incorrecredUrl,
  },
})

const initSchema = urls =>
  yup.object().shape({
    url: yup.string().required().url().notOneOf(urls),
  })

const routes = url => `https://allorigins.hexlet.app/get?disableCache=true&url=${url}`

const parseXMLString = (str) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(str, 'application/xml')
  // commit 'change logic with feedback element' ??
  const isErrorFormat = doc.querySelector('parsererror')
  const isRSSFormat = doc.querySelector('rss')
  if (isErrorFormat && !isRSSFormat) throw new Error(feedbackInners.fail)

  const feedId = uniqueId()
  const data = {
    feed: {
      id: feedId,
      title: doc.querySelector('title').textContent,
      description: doc.querySelector('description').textContent,
    },
    posts: [],
  }

  const posts = doc.querySelectorAll('item')
  data.posts = [...posts].map(post => ({
    id: uniqueId(),
    feedId,
    title: post.querySelector('title').textContent,
    description: post.querySelector('description').textContent,
    link: post.querySelector('link').textContent,
  }))
  return data
}

export default (watchedState, elements) => {
  const { formElement } = elements
  watchedState.processStatus = 'default'

  formElement.addEventListener('submit', (event) => {
    event.preventDefault()
    const { urls } = watchedState.form
    const formData = new FormData(formElement)
    const newUrl = { url: formData.get('url').trim() }

    const schema = initSchema(urls)
    schema
      .validate(newUrl)
      .then(() => {
        // watchedState.feedback = '' // ??
        const rightUrl = routes(newUrl.url)
        watchedState.processStatus = 'sending'
        return axios.get(rightUrl)
      })
      .then((response) => {
        const xmlString = response.data.contents
        const parsingData = parseXMLString(xmlString)

        watchedState.processStatus = 'success'
        watchedState.feedback = feedbackInners.success
        urls.push(newUrl.url)
        watchedState.fields.feeds.push(parsingData.feed)
        watchedState.fields.posts = [...parsingData.posts, ...watchedState.fields.posts] // корректно ли??
      })
      .catch((error) => {
        watchedState.feedback = error.message === 'Network Error' ? feedbackInners.network : error.message
        watchedState.processStatus = 'fail'
      })
  })
}
