import Barba from 'barba.js';
import slickOption from './slickOption';

require('../../node_modules/jquery-migrate/dist/jquery-migrate.min');
require('slick-carousel');

Barba.Dispatcher.on('newPageReady', (currentStatus) => {
  if (currentStatus.url.split('/').pop() === 'ridaisai2016.html') {
    $('#slider').slick(slickOption);
  }
});

$(() => Barba.Pjax.start());
