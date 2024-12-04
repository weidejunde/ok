document.addEventListener('DOMContentLoaded', () => {
  const svgContainer = document.getElementById('svgContainer');

  fetch('svg')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.text();
      })
      .then(data => {
          const parser = new DOMParser();
          const svgFiles = parser.parseFromString(data, 'text/html').getElementsByTagName('a');
          
          for (let file of svgFiles) {
              if (file.href.endsWith('.svg')) {
                  fetch(`svg/${file.text}`)
                      .then(response => {
                          if (!response.ok) {
                              throw new Error('Network response was not ok');
                          }
                          return response.text();
                      })
                      .then(svgContent => {
                          const div = document.createElement('div');
                          div.innerHTML = svgContent;
                          svgContainer.appendChild(div.firstChild);
                      })
                      .catch(error => console.error('Error fetching SVG content:', error));
              }
          }
      })
      .catch(error => console.error('Error fetching SVG files:', error));
});
