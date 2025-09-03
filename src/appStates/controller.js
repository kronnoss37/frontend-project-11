import * as yup from 'yup'

const schema = yup.object().shape({
  // url??
  url: yup.string().required().url(),
})

const feeds = [
  {
    url: 'invalid-url',
  },
  {
    url: 'https://www.google.com/',
  },
]

// validateUrl
// validateCopy

export default (watchedState) => {
  console.log(watchedState)
  feeds.forEach((feed) => {
    schema
      .validate(feed)
      .then((data) => {
        console.log('valid url', data.url)
      })
      .catch((error) => {
        console.log('error', error)
        console.log('message', error.message)
      })
  })
}
