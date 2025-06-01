// Initialize kaboom context
kaboom({
    width: 800,
    height: 600,
    background: [0, 0, 0],
})

// Define game constants
const PLAYER_SPEED = 400
const JUMP_FORCE = 800
const GRAVITY = 2400

// Add game objects
const player = add([
    rect(40, 40),
    pos(120, 80),
    area(),
    body(),
    color(0, 255, 255),
])

// Add platforms
function addPlatform(x, y, width) {
    return add([
        rect(width, 20),
        pos(x, y),
        area(),
        solid(),
        color(255, 255, 255),
    ])
}

// Create some platforms
addPlatform(0, 550, 800)      // Ground
addPlatform(300, 400, 200)    // Middle platform
addPlatform(100, 250, 200)    // Upper left platform
addPlatform(500, 250, 200)    // Upper right platform

// Player controls
onKeyDown("left", () => {
    player.move(-PLAYER_SPEED, 0)
})

onKeyDown("right", () => {
    player.move(PLAYER_SPEED, 0)
})

onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump(JUMP_FORCE)
    }
})

// Keep player in bounds
player.onUpdate(() => {
    // Wrap horizontally
    if (player.pos.x < 0) {
        player.pos.x = width()
    }
    if (player.pos.x > width()) {
        player.pos.x = 0
    }
    
    // Reset if fallen
    if (player.pos.y > height() + 100) {
        player.pos = vec2(120, 80)
    }
}) 