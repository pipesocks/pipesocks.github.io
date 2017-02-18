var platformList = {
  "linux": {
    "version": "2.2",
    "date"   : "2017/02/08",
    "package": "zip"
  },
  "macOS": {
    "version": "2.2",
    "date"   : "2017/02/08",
    "package": "dmg"
  },
  "win": {
    "version": "2.2",
    "date"   : "2017/02/08",
    "package": "exe"
  },
  "github": {
    "package": "",
    "url": "https://github.com/pipesocks/pipesocks"
  }
}
var baseUrl = "https://coding.net/u/yvbbrjdr/p/pipesocks-release/git/raw/master/pipesocks-";

var hookListener = () => {
  $("a[locate]").each((n,c) => {
      $(c).on("click", () => {
          navTo($(c).attr("locate"));
      });
  });
  $("tr[gotod]").each((n,c) => {
      var p = $(c).attr("gotod");
      $(c).on(("click"), () => {
          window.open(platformList[p]["url"] || baseUrl + platformList[p]["version"] + "-" + p + "." + platformList[p]["package"]);
      });
      $(c).children()[2].innerHTML = platformList[p]["version"] || "Latest";
      $(c).children()[3].innerHTML = platformList[p]["date"] || "";
  });
}

document.onscroll = (e) => {
    navSet();
};

var navTo = (n) => {
    $("body").animate({scrollTop:$("#"+n).offset().top}, 1e3);
    navSet(n);
}

var navSet = () => {
    aHeight = window.pageYOffset;
    $("#nav").css("background-color", "rgba(0,0,0," + ((aHeight / 500) > 0.8 ? 0.8 : (aHeight / 500)) + ")");
    var isset = false;
    $("a[locate]").each((n,c) => {
        if (isset) {
          $($(c).children()[0]).removeClass("active");
        } else {
          partOffsetY = $("#"+$(c).attr("locate")).offset().top + ($("#"+$(c).attr("locate")).height() / 3 * 2);
          if (aHeight <= partOffsetY) {
            $($(c).children()[0]).addClass("active");
            isset = true;
          } else {
            $($(c).children()[0]).removeClass("active");
          }
        }
    });

}

window.onload = () => {
    hookListener();
}
