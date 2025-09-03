import onChange from 'on-change'

export default (state) => {
  //

  const watchedState = onChange(state, (path, value) => {
    console.log(path)
    console.log(value)

    // changed props in state(logic)
  })
  return watchedState
}
