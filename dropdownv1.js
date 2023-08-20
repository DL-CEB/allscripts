/*
Author: M Nabeel
Date: May 22, 2023
Description: This JavaScript file contains utility functions for adding dropdown in veeva token.
*/
function addDropdown(customText) {
  customText.style.border = '1px solid #4483c4';
  const htmlText = customText.innerHTML;
  const sanitizedText = htmlText.replace(/\n/g, ''); // Remove line breaks from the content
  const regex = /\{\{.*?\[(.*?)\].*?\}\}/gs; // Updated regex to match multiline content
  const match = regex.exec(sanitizedText);
  if (match) {
      const str = match[1];
      const arr = str.split('|').map(item => item.trim() || '&nbsp;');
      const dropdown = arr.map(item => `<p>${item}</p>`).join('');
      customText.innerHTML = dropdown;
      const dropdownP = customText.querySelector('p:first-child');
      dropdownP.style.border = '1px solid #4483c4';
      dropdownP.innerHTML += '<span>&#9660;</span>';
      dropdownP.style.display = 'flex';
      dropdownP.style.justifyContent = 'space-between';
      const dropdownSecondP = customText.querySelector('p:nth-child(2)');
      dropdownSecondP.style.backgroundColor = '#4483c4';
      dropdownSecondP.style.color = 'white';
      const paragraphs = customText.querySelectorAll('p');
      for (let i = 0; i < paragraphs.length; i++) {
          paragraphs[i].style.margin = "0px";
          paragraphs[i].style.padding = "2px";
      }
      dropdownSecondP.style.margin = '2px 0 0 0';
  }
}

function findElementsWithSquareBrackets() {
  const elementsWithSquareBrackets = [];
  const allTextNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  
  while (allTextNodes.nextNode()) {
      const node = allTextNodes.currentNode;
      const regex = /\{\{.*?\[(.*?)\].*?\}\}/gs;
      if (regex.test(node.textContent)) {
          const parentElement = node.parentElement;
          parentElement.addEventListener('click', () => addDropdown(parentElement));
          elementsWithSquareBrackets.push(parentElement);
      }
  }

  return elementsWithSquareBrackets;
}

window.onload = function dropdown(){

  findElementsWithSquareBrackets();
}

