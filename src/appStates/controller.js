import * as yup from 'yup'
import axios from 'axios'
import uniqueId from 'lodash.uniqueid'
import 'bootstrap/js/dist/modal'

const feedbackInners = {
  required: 'feedback.validation.required',
  duplicated: 'feedback.validation.duplicated',
  incorrectUrl: 'feedback.validation.incorrectUrl',
  fail: 'feedback.processStates.fail',
  success: 'feedback.processStates.success',
}

yup.setLocale({
  mixed: {
    required: () => feedbackInners.required,
    notOneOf: () => feedbackInners.duplicated,
  },
  string: {
    url: () => feedbackInners.incorrectUrl,
  },
})

const initSchema = urls =>
  yup.object().shape({
    url: yup.string().required().url().notOneOf(urls),
  })

const routes = url => `https://allorigins.hexlet.app/get?disableCache=true&url=${url}`

const parseXMLStringToDoc = str => new DOMParser().parseFromString(str, 'application/xml')

const validateRSS = (str) => {
  const doc = parseXMLStringToDoc(str)

  const isErrorFormat = doc.querySelector('parsererror')
  const isRSSFormat = doc.querySelector('rss')
  if (isErrorFormat && !isRSSFormat) throw new Error(feedbackInners.fail)
}

const createFeedObject = (str) => {
  const doc = parseXMLStringToDoc(str)

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

const updatePosts = (watchedState) => {
  const links = watchedState.fields.posts.map(({ link }) => link)
  const rssLinks = watchedState.form.urls.map(url => routes(url))
  console.log('rssLinks', rssLinks)

  setTimeout(() => {
    const promises = rssLinks.map(rssLink =>
      axios
        .get(rssLink)
        .then(response => createFeedObject(response.data.contents))
        .catch((error) => {
          console.log(error.message)
          return null
        }),
    )
    Promise.all(promises)
      .then((objects) => {
        const correctObjects = objects.filter(Boolean)
        correctObjects.forEach((obj) => {
          const newPosts = obj.posts.filter(({ link }) => !links.includes(link))
          console.log('newPosts', newPosts)
          watchedState.fields.posts = [...newPosts, ...watchedState.fields.posts]
        })
      })
      .catch()
      .finally(() => {
        updatePosts(watchedState)
      })
  }, 5000)
}

export default (watchedState, elements) => {
  const { formElement, modalElement } = elements
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
        validateRSS(xmlString)
        watchedState.processStatus = 'success'
        watchedState.feedback = feedbackInners.success
        urls.push(newUrl.url)

        const obj = createFeedObject(xmlString)
        watchedState.fields.feeds.push(obj.feed)
        watchedState.fields.posts = [...obj.posts, ...watchedState.fields.posts] // корректно ли??

        if (urls.length === 1) updatePosts(watchedState)
      })
      .catch((error) => {
        watchedState.feedback = error.message
        watchedState.processStatus = 'fail'
      })
  })

  if (modalElement) {
    modalElement.addEventListener('show.bs.modal', (event) => {
      const button = event.relatedTarget
      const currentId = Number(button.dataset.id)
      watchedState.uiState.activePost = currentId

      if (watchedState.uiState.visitedPosts.includes(currentId)) return // [...].includes ?
      watchedState.uiState.visitedPosts.push(currentId)
    })
  }
}
