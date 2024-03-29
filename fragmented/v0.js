  /*
Author: M Nabeel
Date: August 21, 2023
Description: This JavaScript file contains utility functions for handling fragments merging.
*/
// Fragment should be in order
// Example script: var fragment_names = ["frag1", "frag2"];
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
script.type = 'text/javascript';
function findElementsWithToken() {
  const elementsWithSquareBrackets = [];
  const allTextNodes = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  while (allTextNodes.nextNode()) {
    const node = allTextNodes.currentNode;
    const regex = /insertEmailFragments\[\s*(\d+)\s*,\s*(\d+)\s*\]/g;
    if (regex.test(node.textContent)) {
      const parentElement = node.parentElement;
      parentElement.id = "fragments";
      const textContent = parentElement.textContent;
      parentElement.textContent = "";
      const bracket_values = /\[\s*(\d+)\s*,\s*(\d+)\s*\]/g;
      const matches = [...textContent.matchAll(bracket_values)];
      const extractedValues = matches.map((match) => ({
        startIndex: parseInt(match[1]),
        endIndex: parseInt(match[2]),
      }));
      for (
        var i = 1;
        i <= fragment_names.length;
        i++
      ) { 
        (function (currentI) {
    var container = $(`<div class='fragment${currentI}'></div>`);
    $("#fragments").append(container);
    container.load(
      `../Fragments/Fragment_0${currentI}/` + encodeURIComponent(fragment_names[currentI - 1]) + ".html",
      function () {
        $(this)
          .find("img")
          .each(function () {
            var currentSrc = $(this).attr("src");
            console.log(`../Fragments/Fragment_0${currentI}/` + currentSrc, currentI);
            $(this).attr(
              "src",
              `../Fragments/Fragment_0${currentI}/` + currentSrc
            );
          });
      }
    );
  })(i);
      }
    }
  }

  return elementsWithSquareBrackets;
}

window.onload = function dropdown() {
  script.onload = function() {
    $(document).ready(function () {

      findElementsWithToken();
    });
    }
    document.head.appendChild(script);
};
