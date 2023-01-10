function addHeadlineForFavCats() {
  const headlineText = `<div class="homepage-group-title h4">NEJPRODÁVANĚJŠÍ KATEGORIE</div>`;
  const favCatObj = jQuery('.fav-cat');
  if (favCatObj) {
    console.log('Fav categories exists.');
    jQuery(headlineText).prependTo(favCatObj);
  }
}

function unSlick(targetObj) {
  if (targetObj.hasClass('slick-initialized')) {
    jQuery(targetObj).slick('destroy');
  }
}

$(function () {
  if (jQuery('body').hasClass('type-index')) {
    addHeadlineForFavCats();
    unSlick(jQuery('.fav-cat ul'));
    $(window).resize(function () {
      unSlick(jQuery('.fav-cat ul'));
    });
  }
});
