console.log("Game script loaded!");

// Wait for DOM to be fully loaded
window.addEventListener('load', () => {
    console.log("Window loaded, initializing game...");
    
    // Initialize the game
    kaboom({
        width: 800,
        height: 600,
        background: [ 0, 0, 255 ],  // Blue background to make it obvious if it's working
    });
    
    console.log("Kaboom initialized!");

    // Add the player
    const player = add([
        rect(32, 32),  // smaller rectangle for player
        pos(center()),
        area(),
        body(),
        color(255, 0, 0),  // red color
    ]);

    // Add a platform
    add([
        rect(width(), 48),
        pos(0, height() - 48),
        area(),
        solid(),
        color(0, 255, 0),  // green color
    ]);

    // Movement controls
    onKeyDown("left", () => {
        player.move(-200, 0)
    });

    onKeyDown("right", () => {
        player.move(200, 0)
    });

    onKeyPress("space", () => {
        if (player.isGrounded()) {
            player.jump(400)
        }
    });

    // Keep player in bounds
    player.onUpdate(() => {
        // Wrap horizontally
        if (player.pos.x < 0) {
            player.pos.x = width();
        }
        if (player.pos.x > width()) {
            player.pos.x = 0;
        }
        
        // Reset if fallen
        if (player.pos.y > height() + 100) {
            player.pos = vec2(center());
        }
    });
}); 