// import i18next from 'i18next'
import onChange from 'on-change'

const fillTextFields = (i18n, fields) => {
  const fieldsNames = Object.keys(fields)
  fieldsNames.forEach((fieldName) => {
    fields[fieldName].textContent = i18n.t(`appItems.${fieldName}`)
  })
}

const handleErrors = (elements, error, i18n) => {
  const { inputElement, feedbackElement } = elements

  if (!error) {
    inputElement.classList.remove('is-invalid')
    feedbackElement.classList.remove('text-danger')
    feedbackElement.classList.add('text-success') // ??
    feedbackElement.textContent = ''
  }
  else {
    inputElement.classList.add('is-invalid')
    feedbackElement.classList.add('text-danger')
    feedbackElement.classList.remove('text-success') // ??
    feedbackElement.textContent = i18n.t(error)
  }
}

export default (state, i18n, elements) => {
  //
  const { textFields } = elements
  fillTextFields(i18n, textFields)

  const watchedState = onChange(state, (path, value) => {
    console.log(path)
    console.log(value)

    switch (path) {
      case 'process.status':
        console.log('status', value)
        break
      case 'form.error':
        console.log('error', value)
        handleErrors(elements, value, i18n)
        break
      default:
        break
    }
  })
  return watchedState
}

export { fillTextFields }
