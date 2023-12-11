const miFormulario = document.querySelector('form')

const url = 'http://localhost:8080/api/auth/'

miFormulario.addEventListener('submit', (e) => {
  e.preventDefault()

  const formData = {}

  for (let el of miFormulario.elements) {
    if (el.name.length > 0) formData[el.name] = el.value
  }

  fetch(url + 'login', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((resp) => resp.json())
    .then(({ msg, token }) => {
      if (msg) {
        return console.error(msg)
      }

      localStorage.setItem('token', token)
      window.location = 'chat.html'
    })
    .catch((err) => console.log(err))
})

function onSignIn(googleUser) {
  const { credential } = googleUser

  const data = { id_token: credential }

  fetch(url + 'google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then(({ token }) => {
      localStorage.setItem('token', token)
      window.location = 'chat.html'
    })
    .catch(console.log)
}
