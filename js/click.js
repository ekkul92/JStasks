'use strict';

import $ from './../node_modules/jquery';
import Circle from './circle';
import Rectangle from './rectangle';
import Square from './square';
import workers from './workers';


let square = new Square(10, 10, 100, 100);

let rectangle = new Rectangle(10, 10, 100, 50);

let circle = new Circle(0, 0, 25);


let showFigure1 = () => {

    $('.figure1').slideToggle(300);

};

let showSquare = () => {

    square.render();

};


let incSquare = () => {

    square.increase(2);

};


let decSquare = () => {

    square.decrease(4);

};

let showAreaSquare = () => {

    $('#area').text(`Area is ${square.getArea()}`);

};

let showFigure2 = () => {

    $('.figure2').slideToggle(300);

};

let showRectangle = () => {

    rectangle.render();

};

let incRectangle = () => {

    rectangle.increase(2);

};


let decRectangle = () => {

    rectangle.decrease(4);

};

let showAreaRectangle = () => {

    $('#area').text(`Area is ${rectangle.getArea()}`);

};


let showFigure3 = () => {

    $('.figure3').slideToggle(300);

};

let showCircle = () => {

    circle.render();

};


let incCircle = () => {

    circle.increase(2);

};


let decCircle = () => {

    circle.decrease(4);

};

let showAreaCircle = () => {

    $('#area').text(`Area is ${circle.getArea()}`);

};

let saveInfo = () => {

    let saveData = (() => {

        let a = document.createElement("a");

        document.body.appendChild(a);
        a.style = "display: none";

        return (data, fileName) => {

            let json = JSON.stringify(data);

            let blob = new Blob([json], {"type": "octet/stream"});

            let url = window.URL.createObjectURL(blob);

            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);

        };

    })();

    let data = workers;

    let fileName = "workers.json";

    saveData(data, fileName);

};

let showInfo = () => {

    let selectedFile = $('#input')[0].files[0];

    let parts = selectedFile.name.split('.');

    if (parts.pop() !== 'json') {

        $('#result').text("Incorrect file's extension. Use *.json");

        return;

    }

    let reader = new FileReader();

    reader.onload = (event) => {

        let contents = event.target.result;

        $('#result').text(contents);

    };

    reader.readAsText(selectedFile);

};

export {showFigure1, showSquare, incSquare, decSquare, showAreaSquare};
export {showFigure2, showRectangle, incRectangle, decRectangle, showAreaRectangle};
export {showFigure3, showCircle, incCircle, decCircle, showAreaCircle};
export {saveInfo, showInfo};

