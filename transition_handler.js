(function() {
var displaybox = '.content-box';

// dumb cache of web content so we don't load more than we need.
var webcontent = {};

var jsmenagerie = {
  // Allow manual overriding of the hash value
  hashChange: function(inhash) {
    var hash = inhash || window.location.hash.slice(1);
    if (hash === undefined || hash === "") hash = "home";
    jsmenagerie.getContent(hash + ".html");
  },

  getContent: function(location) {
    // load content from the cache if it exists.
    if (webcontent[location] === undefined) {
      $.get(location, function(data) {
        webcontent[location] = data;
        jsmenagerie.replaceContent(data);
      });
    } else {
      jsmenagerie.replaceContent(webcontent[location]);
    }
  },

  // Actually replace the content on the website
  replaceContent: function(content) {
    jmJsFuncs = undefined;
    $(displaybox).attr({type: "hidden"})
    $(displaybox).empty();
    $(displaybox).append(content);

    $('.jm_html').each(function(i) {
      var func = undefined;
      if (jmJsFuncs !== undefined && jmJsFuncs[i] !== undefined) {
        func = jmJsFuncs[i];
        var contents = func.toString()
          .replace(/\s*function \(\) {/, "")
          .replace(/^\s*/, "")
          .replace(/\s*}$/, "");
        $(this).after(
            '<div class="display_jm_js">' +
            '<pre class="prettyprint language-javascript">' +
            contents + '</pre>' +
            '</div>');
      }
      var contents = $(this).html();
      contents = contents.replace(/</g, "&lt;");
      contents = contents.replace(/>/g, "&gt;");
      contents = contents.replace(/^\s*/g, "");
      $(this).after(
          '<div class="display_jm_html">' +
          '<pre class="prettyprint language-html">\n' +
          contents +
          '</pre>' +
          '</div>');
      func();
    });
    prettyPrint();
    $(displaybox).attr({type: "visible"});
  },

  callAll: function(funcArr) {
    for (var i = 0; i < funcArr.length; i++) {
      funcArr[i]();
    }
  }
};

// Initialize hash-listener.
if (("onhashchange" in window) && !($.browser.msie)) {
  window.onhashchange = function() {
    jsmenagerie.hashChange();
  }
} else {
  var prevHash = window.location.hash;
  window.setInterval(function () {
    if (window.location.hash !== prevHash) {
      prevHash = window.location.hash;
      jsmenagerie.getContent(window.location.hash.slice(1));
    }
  }, 300);
};

$(document).ready(function() {
  var defaultPage = "home";
  $("li").each(function() {
    var that = this;
    if (!$(this).hasClass('nav-header')) {
      $(this).click(function() {
        $('li.active').attr('class', 'inactive');
        $(that).attr('class', 'active');
      });
    }
  });

  if (window.location.hash) {
    defaultPage = window.location.hash.slice(1);
    if (defaultPage !== 'home') {
      $('li.active').attr('class', 'inactive');
      $('a[href="#' + defaultPage + '"]').parent()
          .attr('class', 'active');
    }
  }
  jsmenagerie.hashChange(defaultPage);
});

window.jsmenagerie = jsmenagerie;
})();
