
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
        var i = extractedValues[0].startIndex;
        i <= extractedValues[0].endIndex;
        i++
      ) {
        console.log(fragment_names[i - 1]);
        var container = $(`<div class='fragment${i}'></div>`);
        $("#fragments").append(container);
        container.load(
          `../fragments/fragment_0${i}/` + fragment_names[i - 1] + ".html",
          function () {
            $(this)
              .find("img")
              .each(function () {
                var currentSrc = $(this).attr("src");
                $(this).attr(
                  "src",
                  `../fragments/fragment_0${i - 1}/` + currentSrc
                );
              });
          }
        );
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

