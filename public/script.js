console.log('hello from the browser JavaScript')

const emptyCheck = () => {
  const inputs = document.querySelectorAll('.form-input')

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === '') {
      alert('input fields cannot be blank')
      return false
    }
  }
}
