function getMarkdownPath() {
    let path = window.location.pathname;
    path = path.replace(/^\/+|\/+$/g, '');

    if (path.startsWith('static/')) {
      path = path.substring('static/'.length); 
    }
    if (path === '' || path === '/') {
      path = 'index.html';
    }

    const markdownPath = path.replace(/\.html$/, '.md');
    return `/static/markdown/${markdownPath}`;
}

function toggleSource() {
  const sourceDiv = document.getElementById('source');
  if (sourceDiv.style.display === 'none') {
    sourceDiv.style.display = 'block'; // Show it
  } else {
    sourceDiv.style.display = 'none';  // Hide it
  }
}

function loadMarkdownPage() 
{
    const markdownPath = getMarkdownPath();
    const zeroMdElement = document.createElement('zero-md');
    zeroMdElement.setAttribute('src', markdownPath);

    console.log(markdownPath);

    const contentDiv = document.getElementById('content');
    
    if (contentDiv) {
      contentDiv.appendChild(zeroMdElement);
      console.log(zeroMdElement.bodyClass);
      const noteElement = contentDiv.querySelector('div.note');
      if (noteElement) {
        noteElement.remove();
      }
    } else {
      console.error('Could not find element with id="content"');
    }
}

function changeEditTime()
{
    let oLastModif = new Date(document.lastModified);
    let nFullDate = "This page was last modified on ".concat("", oLastModif.toLocaleDateString().concat(" at ", oLastModif.toLocaleTimeString()));

    document.getElementById("footer-info-lastmod").innerHTML = nFullDate;
}

if (!document.title.startsWith('HL2GMed - ')) {
  document.title = 'HL2GMed - ' + document.title;
}

document.addEventListener("DOMContentLoaded", function () {
    changeEditTime();
    loadMarkdownPage();
})
