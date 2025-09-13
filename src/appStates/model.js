// create state

export default () => {
  // ?? something else?
  return {
    form: {
      urls: [],
    },
    fields: {
      feeds: [],
      posts: [],
    },
    uiState: {
      // visitedPost: null,
      visitedPosts: [],
      activePost: null,
    },
    processStatus: '', // 'default', 'sending', 'fail', 'success'
    feedback: null,
  }
}
