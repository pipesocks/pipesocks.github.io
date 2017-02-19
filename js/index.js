'use strict';
((window, $) => {
  const platformList = {
    "linux": {
      "version": "2.2",
      "date": "2017/02/08",
      "package": "zip"
    },
    "macOS": {
      "version": "2.2",
      "date": "2017/02/08",
      "package": "dmg"
    },
    "win": {
      "version": "2.2",
      "date": "2017/02/08",
      "package": "exe"
    },
    "iOS": {
      "version": "×",
      "date": "×",
      "url": "https://github.com/pipesocks/pipesocks-iOS"
    },
    "github-desktop": {
      "url": "https://github.com/pipesocks/pipesocks"
    },
    "github-iOS": {
      "url": "https://github.com/pipesocks/pipesocks-iOS"
    }
  }
  const baseUrl = "https://coding.net/u/yvbbrjdr/p/pipesocks-release/git/raw/master/pipesocks-";

  function hookListener() {
    $("#nav_menu a[data-locate]").click(function (e) {
      e.preventDefault();
      navTo($(this).data("locate"));
    });
    $("tr[data-gotod]").each((n, c) => {
      const $c = $(c);
      const p = $c.data("gotod");
      var url;
      if (platformList[p]["url"] == null) {
        url = `${baseUrl}${platformList[p]["version"]}-${p}.${platformList[p]["package"]}`;
      } else {
        url = platformList[p]["url"];
      }
      $c.children('td').click(e => {
        e.preventDefault();
        window.location.href = url;
      });
      $c.children()[2].innerText = platformList[p]["version"] || "Latest";
      $c.children()[3].innerText = platformList[p]["date"] || "";
    });
    $("#openmenu").click(e => {
      e.preventDefault();
      const $nav = $('#nav');
      if ($nav.hasClass("nav-expanded")) {
        $('#nav_menu').fadeOut(300, () => $('#nav_menu').css('display', ''));
        $nav.removeClass('nav-expanded').css("height", "");
      } else {
        $('#nav_menu').delay(300).fadeIn(300);
        $nav.addClass('nav-expanded');
      }
    });
  }

  let scrollTriggered = false;
  window.document.onscroll = e => {
    if (scrollTriggered) return;
    scrollTriggered = true;
    setTimeout(() => {
      scrollTriggered = false;
      navSet()
    }, 300);
  };

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

  $(() => {
    hookListener();
  });
})(window, jQuery);