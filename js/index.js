'use strict';
((window, $) => {
  const platformList = {
    "linux": {
      "version": "2.3",
      "date": "2017/02/26",
      "package": "tar.xz"
    },
    "macOS": {
      "version": "2.3",
      "date": "2017/02/26",
      "package": "dmg"
    },
    "win": {
      "version": "2.3",
      "date": "2017/02/26",
      "package": "exe"
    },
    "iOS": {
      "version": "×",
      "date": "×",
      "url": "https://itunes.apple.com/us/app/pipesocks/id1201534301?l=zh&ls=1&mt=8"
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
      $('#nav').toggleClass('nav-expanded');
    });
  }

  window.document.onscroll = e => {
    window.requestAnimationFrame(navSet);
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
