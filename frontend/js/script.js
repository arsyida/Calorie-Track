// Reset button
document.addEventListener('click', event => {
  if (event.target.classList.contains('btn-reset')) {
    location.reload()
  }
});
