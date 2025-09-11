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
    visitedPost: null,
    processStatus: '', // 'default', 'sending', 'fail', 'success'
    feedback: null,
  }
}
