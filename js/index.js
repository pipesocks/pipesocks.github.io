'use strict';
((window, $) => {
  let $navTabs = $('#nav_menu a[data-nav]');

  function hookListener() {
    // Navbar click
    $navTabs.click(function (e) {
      e.preventDefault();
      navTo($(this).attr('href'));
    });

    // Navbar auto switch
    let navSetting = false;
    $(window).scroll(e => {
      !navSetting && window.requestAnimationFrame(() => {
        navSet();
        navSetting = false;
      });
      navSetting = true;
    });

    // Toggle menu
    $("#openmenu").click(e => {
      e.preventDefault();
      $('#nav').toggleClass('nav-expanded');
    });
  }

  function navTo(n) {
    $("body").animate({ scrollTop: $(n).offset().top }, 1e3);
  }

  function navSet() {
    const aHeight = window.pageYOffset;
    $("#nav").css("background-color", `rgba(0,0,0,${
      (aHeight / 500) > 0.8
      ? 0.8
      : (aHeight / 500)})`);

    let isset = false;
    $navTabs.each((n, c) => {
      const $c = $(c);
      const $navTarget = $($c.attr('href'));
      if (isset) {
        $c.parent().removeClass("active");
      } else {
        const partOffsetY = $navTarget.offset().top + ($navTarget.height() / 3 * 2);
        if (aHeight <= partOffsetY) {
          $c.parent().addClass("active");
          isset = true;
        } else {
          $c.parent().removeClass("active");
        }
      }
    });
  }

  function loadFont(url) {
    const el = window.document.createElement('link');
    el.rel = 'stylesheet';
    el.type = 'text/css';
    el.href = url;
    window.document.head.appendChild(el);
  }

  function loadFonts() {
    loadFont('//fonts.lug.ustc.edu.cn/css?family=Roboto');
    loadFont('//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css');
  }

  function loadPlatforms() {
    $.getJSON('dist.json').then(res => {
      const { baseUrl, platform } = res;
      $("tr[data-gotod]").each((n, c) => {
        const $c = $(c);
        const p = $c.data("gotod");
        const url = platform[p]["url"]
          || `${baseUrl}${platform[p]["version"]}-${p}.${platform[p]["package"]}`;

        $c.children('td').click(e => {
          e.preventDefault();
          window.location.href = url;
        });
        $c.children().eq(2).text(platform[p]["version"] || "Latest");
        $c.children().eq(3).text(platform[p]["date"] || "");
      });
    });
  }

  $(() => {
    loadPlatforms();
    hookListener();
    loadFonts();
  });
})(window, jQuery);
