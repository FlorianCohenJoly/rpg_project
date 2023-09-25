class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector('.game-canvas');
        this.ctx = this.canvas.getContext('2d');
    }


    init() {

        // ------- Le premier element sera en arriere plan, le dernier en premier plan --------- // 


        // Create background image
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0);
        };
        image.src = '/images/maps/DemoLower.png';


        // Create hero 

        const x = 5;
        const y = 6;


        const shadow = new Image();
        shadow.onload = () => {
            this.ctx.drawImage(
                shadow,
                0, // left cut 
                0, // top cut
                32, // width of cut
                32, // height of cut
                x * 16 - 8,
                y * 16 - 18,
                32, // taille 
                32, // taille 
            );

        }
        shadow.src = '/images/characters/shadow.png';



        const hero = new Image();
        hero.onload = () => {
            this.ctx.drawImage(
                hero,
                0, // left cut 
                0, // top cut
                32, // width of cut
                32, // height of cut
                x * 16 - 8,
                y * 16 - 18,
                32, // taille 
                32, // taille 
            );
        };
        hero.src = '/images/characters/people/hero.png';




    }


}


