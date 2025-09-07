// create state

export default () => {
  // ?? something else?
  return {
    form: {
      feeds: [],
      error: null,
    },
    process: {
      status: 'default', // default, fail, success //??
      // valid: '',
      state: '',
    },
  }
}
