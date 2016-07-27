'use strict';

import $ from './../node_modules/jquery';
import Figure from './figure';

export default class Circle extends Figure {
    constructor (x, y, radius) {

        super(x, y);
        this.radius = radius;

    }

    render () {

        let canvas = document.getElementById("canvas");

        if (canvas.getContext) {

            let w = 2 * this.radius;

            let h = 2 * this.radius;

            canvas.width = w + 50;
            canvas.height = h + 50;
            $('#canvas1').css('width', `${w + 80}`).
                css('height', `${h + 80}`);
            let ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let circle = new Path2D();

            circle.moveTo(125, 35);
            circle.arc(canvas.width / 2, canvas.height / 2, this.radius, 0, 2 * Math.PI);
            ctx.fill(circle);

            document.getElementById('area').innerHTML = '';

        }

    }

    increase (times) {

        this.radius = this.radius * times;

        this.render();

    }

    decrease (times) {

        this.radius = this.radius / times;

        this.render();

    }

    getArea () {

        return (Math.PI * this.radius * this.radius).toFixed(3);

    }
}
