import Barba from 'barba.js';
import slickOption from './slickOption';
import transition from './transition';

require('../../node_modules/jquery-migrate/dist/jquery-migrate.min');
require('slick-carousel');

Barba.Dispatcher.on('newPageReady', (currentStatus) => {
  if (currentStatus.url.split('/').pop() === 'top.html') {
    $('#slider').slick(slickOption);
  }
});

Barba.Pjax.getTransition = () => transition;
$(() => Barba.Pjax.start());
