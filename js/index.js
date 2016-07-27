'use strict';

import * as func from './click.js';
import $ from './../node_modules/jquery';

$('#square').click(func.showFigure1);

$('#square1').click(func.showSquare);

$('#square_inc').click(func.incSquare);

$('#square_dec').click(func.decSquare);

$('#square_getArea').click(func.showAreaSquare);

$('#rectangle').click(func.showFigure2);

$('#rectangle1').click(func.showRectangle);

$('#rectangle_inc').click(func.incRectangle);

$('#rectangle_dec').click(func.decRectangle);

$('#rectangle_getArea').click(func.showAreaRectangle);

$('#circle').click(func.showFigure3);

$('#circle1').click(func.showCircle);

$('#circle_inc').click(func.incCircle);

$('#circle_dec').click(func.decCircle);

$('#circle_getArea').click(func.showAreaCircle);

$('.save').click(func.saveInfo);

$('#showContent').click(func.showInfo);
