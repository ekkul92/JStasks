'use strict';

import $ from './../node_modules/jquery';
import Figure from './figure';

export default class Rectangle extends Figure {
    constructor (x, y, width, height) {

        super(x, y);
        this.width = width;
        this.height = height;

    }

    render () {

        let canvas = document.getElementById("canvas");

        if (canvas.getContext) {

            canvas.width = this.width + 50;
            canvas.height = this.height + 50;
            $('#canvas1').css('width', `${this.width + 80}`).
                css('height', `${this.height + 80}`);
            let ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let rectangle = new Path2D();

            rectangle.rect(this.x, this.y, this.width, this.height);
            ctx.stroke(rectangle);

            document.getElementById('area').innerHTML = '';

        }

    }

    increase (times) {

        this.width = this.width * times;
        this.height = this.height * times;

        this.render();

    }

    decrease (times) {

        this.width = this.width / times;
        this.height = this.height / times;

        this.render();

    }

    getArea () {

        return (this.width * this.height).toFixed(3);

    }

}
