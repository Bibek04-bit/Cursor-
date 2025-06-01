console.log("Game script loaded!");

// Wait for DOM to be fully loaded
window.addEventListener('load', () => {
    console.log("Window loaded, initializing game...");
    
    // Initialize the game
    const k = kaboom({
        width: 800,
        height: 600,
        background: [74, 74, 74],    // Gray background
        gravity: 980,               // Add gravity
    })

    // add player
    const player = add([
        rect(40, 40),                // Bigger rectangle for better visibility
        pos(120, 80),               // Start position
        color(255, 0, 0),           // Red color
        area(),                     // For collisions
        body(),                     // For physics
    ])

    // add ground
    add([
        rect(width(), 48),
        pos(0, height() - 48),
        color(0, 255, 0),
        area(),
        "platform"
    ])

    // add platforms
    add([
        rect(200, 20),
        pos(300, height() - 200),
        color(0, 255, 0),
        area(),
        "platform"
    ])

    add([
        rect(200, 20),
        pos(100, height() - 300),
        color(0, 255, 0),
        area(),
        "platform"
    ])

    // handle collisions
    player.onCollide("platform", () => {
        player.isGrounded = true
    })

    // movement
    const SPEED = 200

    onKeyDown("left", () => {
        player.move(-SPEED, 0)
    })

    onKeyDown("right", () => {
        player.move(SPEED, 0)
    })

    onKeyPress("space", () => {
        if (player.isGrounded) {
            player.jump(350)
            player.isGrounded = false
        }
    })

    // reset if fall
    player.onUpdate(() => {
        if (player.pos.y > height() + 100) {
            player.pos = vec2(120, 80)
            player.isGrounded = false
        }
    })
}); 