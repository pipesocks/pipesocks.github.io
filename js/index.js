'use strict';
((window, $) => {
  function hookListener() {
    // Navbar click
    $("#nav_menu a[data-locate]").click(function (e) {
      e.preventDefault();
      navTo($(this).data("locate"));
    });

    // Navbar auto switch
    $(window).scroll(e => {
      window.requestAnimationFrame(navSet);
    });

    // Toggle menu
    $("#openmenu").click(e => {
      e.preventDefault();
      $('#nav').toggleClass('nav-expanded');
    });
  }

  function navTo(n) {
    $("body").animate({ scrollTop: $("#" + n).offset().top }, 1e3);
    navSet(n);
  }

  function navSet() {
    const aHeight = window.pageYOffset;
    $("#nav").css("background-color", "rgba(0,0,0," + ((aHeight / 500) > 0.8 ? 0.8 : (aHeight / 500)) + ")");
    let isset = false;
    $("a[data-locate]").each((n, c) => {
      const $c = $(c);
      const $navTarget = $(`#${$c.data("locate")}`);
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
  });
})(window, jQuery);
