// import i18next from 'i18next'
import onChange from 'on-change'

const fillTextFields = (i18n, fields) => {
  const fieldsNames = Object.keys(fields)
  fieldsNames.forEach((fieldName) => {
    fields[fieldName].textContent = i18n.t(`appItems.${fieldName}`)
  })
}

const handleFeedback = (elements, path, i18n) => {
  const { feedbackElement } = elements
  feedbackElement.textContent = i18n.t(path)
}

const handleFailState = (elements) => {
  const { inputElement, feedbackElement } = elements
  inputElement.classList.add('is-invalid')
  feedbackElement.classList.add('text-danger')
  feedbackElement.classList.remove('text-success')
}

const handleSuccessState = (elements) => {
  const { inputElement, feedbackElement } = elements
  inputElement.classList.remove('is-invalid')
  feedbackElement.classList.remove('text-danger')
  feedbackElement.classList.add('text-success')
}

const handleProcessStatus = (i18n, elements, value) => {
  const { textFields, formElement, inputElement } = elements
  const { submitButton } = textFields
  switch (value) {
    case 'default':
      fillTextFields(i18n, textFields)
      break
    case 'sending':
      submitButton.disabled = true // ??
      break
    case 'fail':
      submitButton.disabled = false
      handleFailState(elements)
      break
    case 'success':
      submitButton.disabled = false
      formElement.reset()
      inputElement.focus()
      handleSuccessState(elements)
      break
    default:
      break
  }
}

export default (state, i18n, elements) => {
  //
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'processStatus':
        handleProcessStatus(i18n, elements, value)
        console.log('status', value)
        break
      case 'feedback':
        handleFeedback(elements, value, i18n)
        break
      default:
        break
    }
  })
  return watchedState
}
