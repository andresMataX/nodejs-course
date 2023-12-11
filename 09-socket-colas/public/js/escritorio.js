const btnAtender = document.querySelector('button')
const lblEscritorio = document.querySelector('h1')
const lblTicket = document.querySelector('small')
const lblPendientes = document.querySelector('#lblPendientes')
const divAlerta = document.querySelector('.alert')

const searchParams = new URLSearchParams(window.location.search)
if (!searchParams.has('escritorio')) {
  window.location = 'index.html'
  throw new Error('El escritorio es obligatorio')
}

const escritorio = searchParams.get('escritorio')
lblEscritorio.innerText = escritorio

divAlerta.style.display = 'none'

const socket = io()

socket.on('connect', () => {
  btnAtender.disabled = false
})

socket.on('disconnect', () => {
  btnAtender.disabled = true
})

socket.on('tickets-pendientes', (cola) => {
  lblPendientes.innerText = cola
})

btnAtender.addEventListener('click', () => {
  socket.emit('atender-ticket', { escritorio }, ({ ok, ticket, msg }) => {
    if (!ok) {
      lblTicket.innerText = 'Nadie.'

      return (divAlerta.style.display = '')
    }

    divAlerta.style.display = 'none'
    lblTicket.innerText = 'Ticket ' + ticket.numero
  })
})
