document.addEventListener('DOMContentLoaded', () => {
	let squares = document.querySelectorAll('.grid div')
	let indexInvader = 0
	let positionShooter = 202
	let width = 15
	let goingRigth = true
	let direction = 1
	let moveDown = false
	let aliensRemoved = []
	let blockResult = document.querySelector('.result')
	let points = 0

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

	function moveInvaders(){
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
			if (!aliensRemoved.includes(i)){
				squares[alienInvaders[i]].classList.add('invader')
			}
		}

		if (alienInvaders.includes(positionShooter)){
			clearInterval(invadersId)
			squares[positionShooter].classList.remove('shooter')
			squares[positionShooter].classList.add('boom')
		}

		if (alienInvaders.length ===  aliensRemoved.length){
			blockResult.innerHTML = 'YOU WIN'
			clearInterval(shootId)
		}

		if (alienInvaders.contains())
	}
	invadersId = setInterval(moveInvaders, 600)

	function shoot(e){
		let laserLastPosition = -1
		let laserCurPosition = positionShooter - width
		let boom = false

		function moveLaser(){
			if (!boom){
				if (alienInvaders.includes(laserCurPosition) & (!aliensRemoved.includes(alienInvaders.indexOf(laserCurPosition)))){
					boom = true
					squares[laserCurPosition].classList.add('boom')
					const alienRemoved = alienInvaders.indexOf(laserCurPosition)
					aliensRemoved.push(alienRemoved)
					points++
					blockResult.innerHTML = points
				}
				else {
					squares[laserCurPosition].classList.add('laser')
					if (laserLastPosition !== -1)
						squares[laserLastPosition].classList.remove('laser')

					laserLastPosition = laserCurPosition
					if (laserCurPosition >= width)
						laserCurPosition = laserCurPosition - width
				}
			}
			else {
				if (squares[laserCurPosition].classList.contains('boom')){
					squares[laserCurPosition].classList.remove('boom')
					squares[laserLastPosition].classList.remove('laser')
				}
			}
		} 
		if (e.keyCode == 32){
			shootId = setInterval(moveLaser, 300)
		}
	}

	document.addEventListener('keydown', shoot)
})