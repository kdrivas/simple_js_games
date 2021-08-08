document.addEventListener('DOMContentLoaded', () => {
	let squares = document.querySelectorAll('.grid div')
	let indexInvader = 0
	let positionShooter = 202
	let width = 15
	let goingRigth = true
	let direction = 1
	let moveDown = false
	let moveDownOnce = false

	const alienInvaders = [
		0,1,2,3,4,5,6,7,8,9,
		15,16,17,18,19,20,21,22,23,24,
		30,31,32,33,34,35,36,37,38,39
	]
	alienInvaders.forEach(invader => squares[invader + indexInvader].classList.add('invader'))

	squares[positionShooter].classList.add('shooter')
	function moveShip(e){
		squares[positionShooter].classList.remove('shooter')
		if (e.keyCode == 37 & positionShooter % width !== 0) 
			positionShooter -= 1
		else if (e.keyCode == 39 & positionShooter % width < width - 1)
			positionShooter += 1
		else if (e.keyCode == 38 & positionShooter > width - 1)
			positionShooter -= 15
		else if (e.keyCode == 40 & positionShooter < width * 14)
			positionShooter += 15
		squares[positionShooter].classList.add('shooter')
	}
	document.addEventListener('keydown', moveShip)

	function moveInvaders(e){
		if ((alienInvaders[0] % width == 0 & alienInvaders[0] !== 0 & !goingRigth) | ((alienInvaders[9] + 1) % width == 0 & goingRigth)){
			moveDown = true
			console.log('hola')
		}

		if (alienInvaders[0] === 0 | alienInvaders[0] % width === 0){
			goingRigth = true
		}
		else if ((alienInvaders[9] + 1) % width === 0){
			goingRigth = false
		}

		console.log('Iter')
		console.log(alienInvaders[0] % 15 == 0)
		console.log(alienInvaders[9] % 14 == 0, alienInvaders[9] % 14, alienInvaders[9])


		console.log(moveDown)
		if (moveDown){
			direction = 15
		} else if (goingRigth){
			direction = 1
		} else if (!goingRigth) {
			direction = -1
		}
		moveDown = false

		for (let i=0; i<alienInvaders.length; i++){
			squares[alienInvaders[i]].classList.remove('invader')
		}
		for (let i=0; i<alienInvaders.length; i++){
			alienInvaders[i] += direction
		}
		for (let i=0; i<alienInvaders.length; i++){
			squares[alienInvaders[i]].classList.add('invader')
		}
		//clearInterval(invadersId)
	}
	invadersId = setInterval(moveInvaders, 600)
})