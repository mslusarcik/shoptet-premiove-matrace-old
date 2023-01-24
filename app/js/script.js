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

function handleMattressSelectionGuide() {
  var guideObject = jQuery('.mattress-selection-guide');
  if (guideObject) {
    guideObject.removeClass('hidden');
    jQuery('#content-wrapper').css('overflow', 'visible');
    var tiles = jQuery('.tiles .tile-wrapper');
    var tileTypes = [];

    function setActiveBox() {
      jQuery(tiles).each(function () {
        var thus = this;
        tileTypes.push(jQuery(thus).data('type'));
        jQuery(thus)
          .find('.tile-list .tile-detail')
          .click(function () {
            jQuery(this).addClass('active');
            jQuery(this).siblings().removeClass('active');
            handleParams(jQuery(thus).data('type'), jQuery(this).data('param'));
          });
      });
    }
  }

  function handleParams(type, param) {
    console.log(type);
    console.log(param);
    console.log(tileTypes);
    sessionStorage.setItem(type, param);
    editButtonUrl();
  }

  function editButtonUrl() {
    var btnObj = jQuery('.btn-result');
    if (btnObj) {
      var paramsString = '';
      var i;

      for (i = 0; i < tileTypes.length; ++i) {
        if (i === 0) {
          paramsString += '?' + sessionStorage.getItem(tileTypes[i]);
        } else {
          paramsString += '&' + sessionStorage.getItem(tileTypes[i]);
        }
      }

      jQuery(btnObj).attr('href', btnObj.attr('href').split('?')[0] + paramsString);
    }
  }

  setActiveBox();
}

function loadJS(FILE_URL, async = true, fileName) {
  let scriptEle = document.createElement('script');

  scriptEle.setAttribute('src', FILE_URL);
  scriptEle.setAttribute('type', 'text/javascript');
  scriptEle.setAttribute('async', async);

  document.body.appendChild(scriptEle);

  // success event
  scriptEle.addEventListener('load', () => {
    console.warn(fileName + ' has been loaded.');
  });
  // error event
  scriptEle.addEventListener('error', (ev) => {
    console.warn('Error on loading file called' + fileName, ev);
  });
}

$(function () {
  if (jQuery('body').hasClass('type-index')) {
    addHeadlineForFavCats();
    unSlick(jQuery('.fav-cat ul'));
    $(window).resize(function () {
      unSlick(jQuery('.fav-cat ul'));
    });
  }
  if (jQuery('.mattress-selection-guide').length) {
    console.log('Mattress selection guide is working');
    handleMattressSelectionGuide();
  }
});
