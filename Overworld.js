class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.maps = null;
    }

    startGameLoop() {
        const step = () => {

            // Clear the canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Draw Lower layer
            this.maps.drawLowerImage(this.ctx);

            // Draw Game Objects
            Object.values(this.maps.gameObjects).forEach(object => {
                object.sprite.draw(this.ctx);
            });

            // Draw Upper layer
            this.maps.drawUpperImage(this.ctx);

            requestAnimationFrame(() => {
                step();
            });
        };
        step();
    }

    init() {
        this.maps = new OverworldMap(window.OverworldMap.Kitchen);
        this.startGameLoop();
    }
}