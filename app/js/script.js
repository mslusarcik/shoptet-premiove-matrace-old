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

function activateCoupons() {
  if (!jQuery('.discount-coupon').hasClass('otevreny')) {
    jQuery('.kupon-odkaz').click();
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

      jQuery(btnObj).attr('href', btnObj.attr('href').split('?')[0] + paramsString + '#products');
    }
  }

  setActiveBox();
}

function makeDetailParametersCollapsible() {
  var extendedDescriptionObj = jQuery('.extended-description');
  // Set default toggle
  jQuery(extendedDescriptionObj).find('.detail-parameters').fadeToggle();

  // Set toggle on click
  jQuery(extendedDescriptionObj)
    .find('> h3')
    .click(function (e) {
      e.preventDefault();
      jQuery(this).toggleClass('active');
      jQuery(extendedDescriptionObj).find('.detail-parameters').fadeToggle();
    });
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

function setCustomBodyClass() {
  if (jQuery('input[name=priceId]').val() == 22605 && jQuery('body').hasClass('admin-logged')) {
    jQuery('body').addClass('price-id-22605');
    makeDetailParametersCollapsible();
  }
}

function elementLoaded(el, cb) {
  var maxAttempts = 15;
  var currAttempts = 0;
  if (jQuery(el).length) {
    // Element is now loaded.
    cb(jQuery(el));
  } else {
    // Repeat every 250ms.
    if (currAttempts <= maxAttempts) {
      setTimeout(function () {
        currAttempts++;
        elementLoaded(el, cb);
      }, 250);
    }
  }
}

function moveEl(target, el) {
  console.log('moveEl is running.');
  if (jQuery(el).length && jQuery(target).length) {
    console.log('Element or target has been found.');
    jQuery(el).insertAfter(target);
  } else console.log('Element or target hasnt been found!');
}

function handleRatingsPage() {
  var ratingsObj = ratingsSetup;
  var mobileBanner = false;
  const target = jQuery('main#content');

  function showDescription() {
    if (ratingsObj.description !== '') {
      let descriptionHtml = `<p>${ratingsObj.description}</p>`;
      jQuery(descriptionHtml).insertAfter(jQuery(target).find('.content-inner > h1'));
    } else {
      console.warn('Description is empty.');
    }
  }

  function showBanner(bannerURL) {
    if (ratingsObj.bannerImg !== '') {
      const target = jQuery('main#content');
      let bannerHtml = `<img src="${bannerURL}" class="ratings-banner">`;
      if (ratingsObj.bannerLink !== '') {
        bannerHtml = `<a href="${ratingsObj.bannerLink}">${bannerHtml}</a>`;
      }
      jQuery(target).prepend(bannerHtml);
    } else {
      console.warn('Banner URL is empty.');
    }
  }

  if (Object.keys(ratingsObj).length && ratingsObj.status === 'on') {
    showDescription();
    if (window.matchMedia('(max-width: 767px)').matches && ratingsObj.bannerMobImg !== '') {
      showBanner(ratingsObj.bannerMobImg);
    } else {
      showBanner(ratingsObj.bannerImg);
    }
  } else {
    console.warn('Edit of ratings page has been turned off');
  }
}

function handleFaqs() {
  const questionWrapper = jQuery('.question-wrapper');
  questionWrapper.click(function () {
    var container = jQuery(this).parents('.accordion');
    var answer = container.find('.answer-wrapper');
    var trigger = container.find('.submenu-arrow');
    var state = container.find('.question-wrapper');

    answer.animate({ height: 'toggle' }, 100);

    if (trigger.hasClass('icon-expend')) {
      trigger.removeClass('icon-expend');
      // state.removeClass("active");
    } else {
      trigger.addClass('icon-expend');
      // state.addClass("active");
    }

    if (container.hasClass('expanded')) {
      container.removeClass('expanded');
    } else {
      container.addClass('expanded');
    }
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
  if (jQuery('body').hasClass('type-product')) {
    makeDetailParametersCollapsible();
  }
  if (jQuery('body').hasClass('in-kosik')) {
    activateCoupons();
  }
  if (jQuery('body').hasClass('in-hodnoceni-obchodu')) {
    handleRatingsPage();
  }
  if (jQuery('body').hasClass('in-krok-1')) {
    console.log('in-krok-1 found');
    elementLoaded('#HcCalculater', function (elm) {
      console.log('Homecredit button loaded');
      moveEl(jQuery('#billingId-114 + label .shipping-billing-name'), jQuery(elm));
    });
  }
  if (jQuery('body').hasClass('type-product')) {
    setCustomBodyClass();
    elementLoaded('.p-gift', function () {
      console.log('Gift button exists');
      jQuery('body').addClass('has-gift');
      //jQuery('.p-gift-image').clone().appendTo('.product-top .p-image-wrapper');
    });
    if (jQuery(window).width() < 768) {
      moveEl(jQuery('.buy-box .bottom'), jQuery('#HcCalculater'));
    }
  }
  if (jQuery('.mattress-selection-guide').length) {
    console.log('Mattress selection guide is working');
    handleMattressSelectionGuide();
  }
  handleFaqs();
});
