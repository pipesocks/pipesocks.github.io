window.onload = () => {
    $("a[locate]").each((n,c) => {
        $(c).on("click", () => {
            navTo($(c).attr("locate"));
        });
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
