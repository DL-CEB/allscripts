window.onload = function dropdown(){
    const customTexts = document.querySelectorAll('.drop');
    customTexts.forEach((customText) => {
      const ghtmlText = customText.innerHTML;
      customText.addEventListener('click', addDropdown);
        customText.addEventListener('dblclick', removeDropdown);
      function addDropdown() {
        customText.style.border = '1px solid #4483c4';
        const htmlText = customText.innerHTML;
        const str = htmlText.match(/\[(.*?)\]/g)[0];
        const arr = str.substring(1, str.length - 1).split('|').map(item => item || '&nbsp;');
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
    
      function removeDropdown() {
        customText.style.border = 'none';
        customText.style.padding = '0';
        customText.innerHTML = ghtmlText;
      }
    });
}


