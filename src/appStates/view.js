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

const setAttributes = (el, attrs) => {
  Object.keys(attrs).forEach((attr) => {
    el.setAttribute(attr, attrs[attr])
  })
}

const renderFeeds = (elements, feeds, i18n) => {
  const { feedsElement } = elements
  feedsElement.innerHTML = ''
  const feedsContainer = document.createElement('div')
  feedsContainer.classList.add('card', 'border-0')

  const feedsBody = document.createElement('div')
  feedsBody.classList.add('card-body', 'text-center')
  const feedsTitle = document.createElement('h2')
  feedsTitle.classList.add('card-title', 'h3')
  feedsTitle.textContent = i18n.t('fields.feeds.title')
  feedsBody.append(feedsTitle)

  const feedsList = document.createElement('ul')
  feedsList.classList.add('list-group', 'rounded-0')
  feeds.forEach((feed) => {
    const { title, description } = feed
    const feedItem = document.createElement('li')
    feedItem.classList.add('list-group-item', 'border-0')
    const feedTitle = document.createElement('h3')
    feedTitle.classList.add('h6', 'mb-0')
    feedTitle.textContent = title
    const feedDescription = document.createElement('p')
    feedDescription.classList.add('mb-0', 'text-black-50', 'small')
    feedDescription.textContent = description
    feedItem.append(feedTitle, feedDescription)
    feedsList.prepend(feedItem)
  })
  feedsContainer.append(feedsBody, feedsList)
  feedsElement.append(feedsContainer)
}

const setVisitedPost = (id) => {
  console.log('visit')
  const visitedPost = document.querySelector(`a[data-id="${id}"]`)
  visitedPost.classList.remove('fw-bold')
  visitedPost.classList.add('fw-normal', 'text-secondary')
}

const renderPosts = (watchedState, elements, posts, i18n) => {
  const { postsElement } = elements
  postsElement.innerHTML = ''
  const postsContainer = document.createElement('div')
  postsContainer.classList.add('card', 'border-0')

  const postsBody = document.createElement('div')
  postsBody.classList.add('card-body', 'text-center')
  const postsTitle = document.createElement('h2')
  postsTitle.classList.add('card-title', 'h3')
  postsTitle.textContent = i18n.t('fields.posts.title')
  postsBody.append(postsTitle)

  const postsList = document.createElement('ul')
  postsList.classList.add('list-group', 'rounded-0')
  posts.forEach((post) => {
    const { id, title, link } = post
    const postItem = document.createElement('li')
    postItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'border-0')
    const postLink = document.createElement('a')
    setAttributes(postLink, {
      'href': `${link}`,
      'class': 'fw-bold scale-on-hover',
      'target': '_blank',
      'rel': 'noopener noreferrer',
      'data-id': `${id}`,
    })
    postLink.textContent = title
    const postButton = document.createElement('button')
    setAttributes(postButton, {
      'type': 'button',
      'class': 'btn btn-outline-primary fw-semibold',
      'data-id': `${id}`,
      'data-bs-toggle': 'modal',
      'data-bs-target': '#modal',
    })
    postButton.textContent = i18n.t('fields.posts.button')

    postLink.addEventListener('click', () => {
      watchedState.visitedPost = id
    })

    postButton.addEventListener('click', () => {
      // modal state
    })

    postItem.append(postLink, postButton)
    postsList.append(postItem)
  })
  postsContainer.append(postsBody, postsList)
  postsElement.append(postsContainer)
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
      case 'fields.feeds':
        renderFeeds(elements, value, i18n)
        break
      case 'fields.posts':
        renderPosts(watchedState, elements, value, i18n)
        break
      case 'visitedPost':
        setVisitedPost(value)
        break
      default:
        break
    }
  })
  return watchedState
}
