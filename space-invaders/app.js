document.addEventListener('DOMContentLoaded', () => {
	let squares = document.querySelectorAll('.grid div')
	let indexInvader = 0

	const allienInvaders =  [...Array(40).keys()]
	allienInvaders.forEach(invader => squares[invader + indexInvader].classList.add('invader'))
})