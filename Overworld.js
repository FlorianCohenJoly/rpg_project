class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop() {
        const step = () => {

            // Clear the canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Establish the camera position
            const cameraPerson = this.map.gameObjects.hero;


            // Update all objects
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,

                });
            });

            // Draw Lower layer
            this.map.drawLowerImage(this.ctx, cameraPerson);

            // Draw Game Objects
            Object.values(this.map.gameObjects).sort((a, b) => {
                return a.y - b.y;
            }).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson);
            });

            // Draw Upper layer
            this.map.drawUpperImage(this.ctx, cameraPerson);

            requestAnimationFrame(() => {
                step();
            });
        };
        step();
    }

    bindActionInput() {
        new KeyPressListener("Enter", () => {
            // Is there a person here to talk to?
            this.map.checkForActionCutscene()
        })
    }

    bindHeroPositionCheck() {
        document.addEventListener("PersonWalkingComplete", e => {
            if (e.detail.whoId === "hero") {
                this.map.checkForFootstepCutscene();
            }
        });
    }

    startMap(mapConfig) {
        this.map = new OverworldMap(mapConfig);
        this.map.overworld = this;
        this.map.mountObjects();
    }

    init() {
        this.startMap(window.OverworldMap.DemoRoom);

        this.bindActionInput();
        this.bindHeroPositionCheck();

        this.directionInput = new DirectionInput();
        this.directionInput.init();

        this.startGameLoop();

        this.map.startCutscene([

            { type: "battle" }

            // { who: "hero", type: "walk", direction: "down" },
            // { who: "hero", type: "walk", direction: "down" },
            // { who: "npcA", type: "walk", direction: "up" },
            // { who: "npcA", type: "walk", direction: "left" },
            // { who: "hero", type: "stand", direction: "right", time: 200 },
            // { type: "textMessage", text: "Salut mec, Appuie sur les flèches de ton clavier pour te déplacer, et appuis sur la touche Entrer pour passer au dialogue suivant" },
            // { type: "textMessage", text: "Tu peux prend la porte du haut pour te manger un giga refus" },
            // { type: "textMessage", text: "ou prendre la porte du bas pour disparaitre" },


        ])

    }
}
