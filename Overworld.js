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

            // Establish the camera position
            const cameraPerson = this.maps.gameObjects.hero;

            Object.values(this.maps.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,

                });
            });

            // Draw Lower layer
            this.maps.drawLowerImage(this.ctx, cameraPerson);

            // Draw Game Objects
            Object.values(this.maps.gameObjects).forEach(object => {

                object.sprite.draw(this.ctx, cameraPerson);
            });

            // Draw Upper layer
            this.maps.drawUpperImage(this.ctx, cameraPerson);

            requestAnimationFrame(() => {
                step();
            });
        };
        step();
    }

    init() {
        this.maps = new OverworldMap(window.OverworldMap.DemoRoom);

        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.directionInput.direction;

        this.startGameLoop();
    }
}
