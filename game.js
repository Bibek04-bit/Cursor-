console.log("Game script loaded!");

// Wait for DOM to be fully loaded
window.addEventListener('load', () => {
    console.log("Window loaded, initializing game...");
    
    // Initialize the game
    const k = kaboom({
        width: 800,
        height: 600,
        background: [74, 74, 74],    // Gray background
    })

    // add a character to screen
    const player = add([
        rect(40, 40),                // Bigger rectangle for better visibility
        pos(center()),               // Start in center of screen
        color(255, 0, 0),           // Red color
        area(),                     // For collisions
        body(),                     // For physics
    ])

    // Function to create a platform
    function addPlatform(xPos, yPos, width) {
        add([
            rect(width, 20),         // Platform size (height is 20)
            pos(xPos, yPos),         // Position
            color(0, 255, 0),       // Green color
            area(),                 // For collisions
            "platform",             // Tag for collision
        ])
    }

    // Add multiple platforms
    // Ground platform
    addPlatform(0, height() - 20, width())

    // Floating platforms
    addPlatform(100, height() - 150, 200)    // Left platform
    addPlatform(500, height() - 150, 200)    // Right platform
    addPlatform(300, height() - 250, 200)    // Middle platform
    addPlatform(100, height() - 350, 200)    // Upper left platform
    addPlatform(500, height() - 350, 200)    // Upper right platform

    // Make platforms solid
    player.onCollide("platform", () => {
        player.isGrounded = true
    })

    // Movement controls with velocity for smoother movement
    const SPEED = 200
    const JUMP_FORCE = 400

    onKeyDown("left", () => {
        player.move(-SPEED, 0)
    })

    onKeyDown("right", () => {
        player.move(SPEED, 0)
    })

    onKeyPress("space", () => {
        if (player.isGrounded) {
            player.jump(JUMP_FORCE)
            player.isGrounded = false
        }
    })

    // Reset player position if they fall off
    player.onUpdate(() => {
        if (player.pos.y > height() + 100) {
            player.pos = vec2(width()/2, height()/2)
            player.isGrounded = false
        }
    })
}); 