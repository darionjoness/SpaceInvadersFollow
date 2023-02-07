const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let currentShooterIndex = 202;
let width = 15;
let direction = 1
let invadersId
let goingRight = true;
let aliensRemoved = []
let results = 0

// Loop through 225 times
for(let i = 0; i < 225; i++){
    // Create a div
    const square = document.createElement('div');
    // append div to grid
    grid.appendChild(square)
}

// get array of divs and set it to const squares
const squares = Array.from(document.querySelectorAll('.grid div'))

// AlienInvaders index
const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15, 16, 17, 18, 19, 20, 21, 22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

// Create draw function
function draw(){
    // Loop through alienInvaders
    for(let i = 0; i < alienInvaders.length; i++){
        // Check if i is in aliensRemoved array
        if(!aliensRemoved.includes(i)){
            // Add class of invader to items
        squares[alienInvaders[i]].classList.add('invader')
        }
    }
}

draw()

function remove(){
    // Loop through alienInvaders
    for(let i = 0; i < alienInvaders.length; i++){
        // Add class of invader to items
        squares[alienInvaders[i]].classList.remove('invader')
    }
}

// Add class of shooter to the square in the currentShooterIndex
squares[currentShooterIndex].classList.add('shooter')

// Create moveShooter func
function moveShooter(e){
    // Remove shooter class from square at index currentShooterIndex
    squares[currentShooterIndex].classList.remove('shooter')
    // Pass in key pressed
    switch(e.key){
        // Check if ArrowLeft is pressed
        case 'ArrowLeft': 
            // Check if currentShooterIndex is at the end on the left
            if(currentShooterIndex % width !== 0){
                currentShooterIndex -= 1
            }
            break
        // Check if ArrowRight is pressed
        case 'ArrowRight':
            // Check if currentShooterIndex is at the end on the right
            if(currentShooterIndex % width < width - 1){
                currentShooterIndex += 1
            }
            break
    }

    // Add class of shooter to currentShooterIndex
    squares[currentShooterIndex].classList.add('shooter')
}
// Add keydown event to the document that runs moveShooter
document.addEventListener('keydown', moveShooter)

// Create moveInvaders function
function moveInvaders(){
    // get left edge, sets const to bool
    const leftEdge = alienInvaders[0] % width === 0;
    // get right edge, sets const to bool
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
    remove();

    // rightEdge and goingRight are true
    if(rightEdge && goingRight){
        // Loop through alienInvaders
        for(let i = 0; i < alienInvaders.length; i++){
            // add width + 1 to alienInvaders in current index, causing it to move down
            alienInvaders[i] += width + 1
            // set direction to -1 causing it to move left
            direction = -1
            // Set goingRight to false
            goingRight = false
        }
    }

    // Check if leftEdge is true and if goingRight is false
    if(leftEdge && !goingRight) {
        // Loop through alienInvaders
        for(let i = 0; i < alienInvaders.length; i++){
            // Add width - 1 to current index, causing it to move down 1
            alienInvaders[i] += width - 1
            // set direction to 1 causing it to move right
            direction = 1
            // Change goingRight to true
            goingRight = true
        }
    }

    // Loop through alienInvaders and increment index
    for(let i = 0; i < alienInvaders.length; i++){
        alienInvaders[i] += direction
    }

    draw()

    // Check if squares at the currentShooterIndex has a class of invader and shooter
    if(squares[currentShooterIndex].classList.contains('invader', 'shooter')){
        // set innerHTML of resultsDisplay to GAME OVER
        resultsDisplay.innerHTML = 'GAME OVER'
        // Clear Interval invadersId
        clearInterval(invadersId)
    }

    // Loop through alienInvaders
    for(let i = 0; i < alienInvaders.length; i++){
        // If alienInvaders[i] is at the bottom of grid
        if(alienInvaders[i] > squares.length){
            // set innerHTML of resultsDisplay to 'GAME OVER'
            resultsDisplay.innerHTML = 'GAME OVER'
            // ClearInterval
            clearInterval(invadersId)
        }
    }
    // Check if all aliens are removed
    if(results == alienInvaders.length){
        resultsDisplay.innerHTML = 'YOU WIN'
        clearInterval(invadersId)
    }
}

invadersId = setInterval(moveInvaders, 500)

// Create shoot function
function shoot(e){
    let laserId
    let currentLaserIndex = currentShooterIndex

    // Create moveLaser function
    function moveLaser() {
        // Remove laser class
        squares[currentLaserIndex].classList.remove('laser')
        // Move laser up a square
        currentLaserIndex -= width
        // Add laser class
        squares[currentLaserIndex].classList.add('laser')

        // check if square at currentLaserIndex has class of invader
        if(squares[currentLaserIndex].classList.contains('invader')){
            // Remove class of laser
            squares[currentLaserIndex].classList.remove('laser')
            // Remove class of invader
            squares[currentLaserIndex].classList.remove('invader')
            // Add class of boom
            squares[currentLaserIndex].classList.add('boom')

            // Remove class of boom after 300ms
            setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300)
            // Clear interval laserId
            clearInterval(laserId)

            // Get indexOf currentLaserIndex in alienInvaders
            const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
            // Push alienRemoved onto aliensRemoved
            aliensRemoved.push(alienRemoved)
            results++;
            resultsDisplay.innerHTML = results
        }
    }

    // Pass in key pressed
    switch(e.key){
        // If key pressed is ArrowUp, run moveLaser every 100 ms
        case 'ArrowUp':
            laserId = setInterval(moveLaser, 100)
    }
}

// Add event listener to document that runs shoot
document.addEventListener('keydown', shoot)


