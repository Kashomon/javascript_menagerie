(function() {
var displaybox = '#display-box';
var jsmenagerie = {
  cgroup: function() {
    $(displaybox).empty();
    $(displaybox).attr({type: "hidden"})
    $(displaybox).attr({type: "visible"})
  },

  hashChange: function(inhash) {
    var hash = inhash || window.location.hash.slice(1);
    if (hash === undefined || hash === "") hash = "home";
    jsmenagerie.loadContent(hash);
  },

  loadContent: function(hash) {
    $
  }
}

if (("onhashchange" in window) && !($.browser.msie)) {
  window.onhashchange = function() {
    jsmenagerie.hashChange();
  }
} else {
  var prevHash = window.location.hash;
  window.setInterval(function () {
    if (window.location.hash !== prevHash) {
      prevHash = window.location.hash;
      getContent(window.location.hash.slice(1));
    }
  }, 300);
};


})();
