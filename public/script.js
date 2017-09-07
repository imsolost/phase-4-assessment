console.log('hello from the browser JavaScript')

const deletePopup = () => {
  if (confirm('Are you sure you want to delete this review?')) {
    fetch(`/delete/${event.target.id}`, {
      method: 'delete',
      credentials: 'include',
    })
      .then(location.reload())
  }
}

document.querySelectorAll('.trashcan').forEach((button) => {
  button.addEventListener('click', deletePopup)
})
