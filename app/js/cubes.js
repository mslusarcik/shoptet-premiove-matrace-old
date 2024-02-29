function hideUnpopularVariants() {
  const cubesObj = jQuery('.detail-parameters .cubes').first();
  let hiddenVariants = false;

  function handleCubes() {
    jQuery(cubesObj)
      .find('.cube:not(.fake)')
      .each(function () {
        if (jQuery(this).find('.cube-heading').text().indexOf('x200') < 1) {
          jQuery(this).addClass('collapsed');
          hiddenVariants = true;
        }
      });

    if (hiddenVariants) {
      jQuery(
        '<div class="cube fake hidden-variants-button hidden"><span class="cube-heading">Další rozměry</span></div><div style="flex-basis: 100%; height: 0;"></div>'
      ).insertBefore(jQuery(cubesObj).find('.cube.collapsed').first());
      jQuery('.hidden-variants-button').removeClass('hidden');
      jQuery(
        '<div class="cube fake ask-custom-dismension collapsed"><span class="cube-heading">Rozměr na míru</span></div>'
      ).appendTo(jQuery(cubesObj));
    }
  }

  function handleForm() {
    jQuery('.ask-custom-dismension').on('click', function () {
      jQuery('a.link-icon.chat').click();
      setTimeout(() => {
        const textareaObj = jQuery('#formProductQuestion #message');
        if (textareaObj.length > 0) {
          jQuery(textareaObj).text(
            'Dobrý den, rád/a bych od vás poptal/a matraci v rozměru na míru: Šířka x Délka'
          );
        }
      }, 800);
    });
  }

  function toggleHandler() {
    jQuery('.hidden-variants-button').on('click', function () {
      let headingText =
        jQuery(this).find('.cube-heading').text() == 'Další rozměry'
          ? 'Skrýt další rozměry'
          : 'Další rozměry';
      jQuery(this).find('.cube-heading').text(headingText);
      jQuery('.cube.collapsed').toggleClass('in');
    });
  }

  /* HANDLES CUBES AND DATA */
  handleCubes();

  /* CONNECTS FAKE BUTTON WITH FORM */
  handleForm();

  /* MAKES TOGGLE BUTTON INTERACTIVE */
  toggleHandler();
}

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

waitForElm('.cubes').then(() => {
  if (
    jQuery('body').hasClass('in-matrace-curem') ||
    jQuery('body').hasClass('in-matrace-spirit-superior') ||
    jQuery('body').hasClass('in-matrace-tropico-guard') ||
    jQuery('body').hasClass('in-matrace-slumberland') ||
    jQuery('body').hasClass('in-ortopedicke-matrace') ||
    jQuery('body').hasClass('in-akce-1-1') ||
    jQuery('body').hasClass('in-matrace')
  ) {
    hideUnpopularVariants();
  }
});
