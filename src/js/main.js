import slickOption from './slickOption';

require('../../node_modules/jquery-migrate/dist/jquery-migrate.min');
require('slick-carousel');
require('barba.js');

$(() => $('#slider').slick(slickOption));

Barba.Pjax.start();
