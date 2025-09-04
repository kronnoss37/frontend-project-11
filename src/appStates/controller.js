import * as yup from 'yup'

// setLocale (без вызова i18n.t()a)

yup.setLocale({
  mixed: {
    required: () => 'errors.validation.required',
    notOneOf: () => 'errors.validation.duplicated',
  },
  string: {
    url: () => 'errors.validation.incorrecredUrl',
  },
})

const validateUrl = (currentUrl, feeds) => {
  const schema = yup.object().shape({
    // url??
    url: yup.string().required().url().notOneOf(feeds),
  })

  schema
    .validate(currentUrl)
    .then((data) => {
      console.log('valid url', data.url)
    })
    .catch((error) => {
      // console.log('error', error)
      console.log('message', error.message)
    })
}

export default (watchedState) => {
  console.log(watchedState)
  const urlValue = {
    url: 'invalid-url',
  }
  const feeds = ['invalid-url', 'https://www.google.com/', '']
  validateUrl(urlValue, feeds)
}
