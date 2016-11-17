import Barba from 'barba.js';
import slickOption from './slickOption';

require('../../node_modules/jquery-migrate/dist/jquery-migrate.min');
require('slick-carousel');

Barba.Dispatcher.on('newPageReady', () => $('#slider').slick(slickOption));

$(() => Barba.Pjax.start());
