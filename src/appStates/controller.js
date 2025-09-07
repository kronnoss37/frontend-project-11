import * as yup from 'yup'

yup.setLocale({
  mixed: {
    required: () => 'errors.validation.required',
    notOneOf: () => 'errors.validation.duplicated',
  },
  string: {
    url: () => 'errors.validation.incorrecredUrl',
  },
})

const initSchema = feeds => yup.object().shape({
  url: yup.string().required().url().notOneOf(feeds),
})

export default (watchedState, elements) => {
  const { formElement, inputElement } = elements
  inputElement.focus() // autofocus??

  formElement.addEventListener('submit', (event) => {
    event.preventDefault()
    const { feeds } = watchedState.form
    const formData = new FormData(formElement)
    const newUrl = Object.fromEntries(formData)

    const schema = initSchema(feeds)
    schema
      .validate(newUrl)
      .then(() => {
        watchedState.form.error = ''
        feeds.push(newUrl.url)
      })
      .catch((error) => {
        watchedState.form.error = error.message
      })
  })
}
