import Barba from 'barba.js';

const wait = time => new Promise(resolve => setTimeout(() => resolve(), time));
const cover = animCover => new Promise((resolve) => {
  $('#cover1').addClass(animCover);
  setTimeout(resolve, 1150);
});

const movePage = async (transition, coverAnim1, coverAnim2, codeAnim) => {
  $('#cover1').addClass(codeAnim);
  await Promise.all([
    transition.newContainerLoading,
    cover(coverAnim1),
    wait(((Math.random() * 2) + 1) * 1000),
  ]);
  transition.done();
  await cover(coverAnim2);
  $('#cover1').removeClass(`${coverAnim1} ${coverAnim2} ${codeAnim}`);
};

export default Barba.BaseTransition.extend({
  start() {
    const currentFile = Barba.HistoryManager.currentStatus().url.split('/').pop();
    if (currentFile === this.oldContainer.dataset.next) {
      movePage(this, 'left-in', 'left-out', 'code-left');
    } else if (currentFile === this.oldContainer.dataset.prev) {
      movePage(this, 'right-in', 'right-out', 'code-right');
    } else {
      movePage(this, 'down-in', 'up-out', '');
    }
  },
});
