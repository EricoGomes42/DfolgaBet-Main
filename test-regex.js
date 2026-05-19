const content = `data-font-colour="#e67e22" 
data-colour="#ffffff" 
data-button-label="Pesquisar">
></div>
<script src="https://widgets.skyscanner.net/widget-server/js/loader.js" async></script>`;

let htmlContent = content.replace(/data-button-label="([^"]*)">\s*><\/div>/gi, 'data-button-label="$1"></div>');
console.log(htmlContent);
