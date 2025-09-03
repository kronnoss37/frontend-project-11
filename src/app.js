export default () => {
  const mainEl = document.querySelector('.main')
  const mainContainer = document.createElement('div')
  mainContainer.classList.add('.container')

  const formEl = document.createElement('form')
  const inputEl = document.createElement('input')
  inputEl.type = 'text'
  inputEl.placeholder = 'Ссылка RSS'

  const resetBtn = document.createElement('button')
  resetBtn.type = 'reset'
  resetBtn.classList.add('btn', 'btn-primary')
  resetBtn.textContent = 'Добавить'
  formEl.append(inputEl, resetBtn)
  mainContainer.append(formEl)
  mainEl.append(mainContainer)
}
