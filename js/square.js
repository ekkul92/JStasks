'use strict';

import $ from './../node_modules/jquery';
import Figure from './figure';

export default class Square extends Figure {

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
            let square = new Path2D();

            square.rect(this.x, this.y, this.width, this.height);
            ctx.stroke(square);

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

        return (this.width * this.width).toFixed(3);

    }

}
