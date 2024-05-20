/* global hexo */

'use strict';

hexo.extend.tag.register('litever', function() {
    const { dependencies } = require('./../../../../package.json');
    var allPkg = Object.keys(dependencies);
    var str = '';
    allPkg.forEach((depname) => {str += `<a href="https://www.npmjs.com/package/${depname}">${depname}</a>: ${dependencies[depname]}\n`});
    return `<pre class="language-none"><code class="language-none">${str}</code></pre>`;
}, true);

hexo.extend.tag.register('note', function(args, content) {
    content = hexo.render.renderSync({text: content, engine: 'markdown'});
    return `<div class="note ${args[0]}">${content}</div>`
}, true);

// from theme next
hexo.extend.tag.register('tabs', function(args, content) {
    const tabBlock = /<!--\s*tab (.*?)\s*-->\n([\w\W\s\S]*?)<!--\s*endtab\s*-->/g;

    args = args.join(' ').split(',');
    const tabName = args[0];
    const tabActive = Number(args[1]) || 0;

    let tabId = 0;
    let tabNav = '';
    let tabContent = '';

    if (!tabName) hexo.log.warn('Tabs block must have unique name!');
    const matches = content.matchAll(tabBlock);

    for (const match of matches) {
        let [caption = '', icon = ''] = match[1].split('@');
        let postContent = match[2];

        postContent = hexo.render.renderSync({ text: postContent, engine: 'markdown' }).trim();

        const abbr = tabName + ' ' + ++tabId;
        const href = abbr.toLowerCase().split(' ').join('-');

        icon = icon.trim();
        if (icon.length > 0) {
            if (!icon.startsWith('fa')) icon = 'fa fa-' + icon;
            icon = `<i class="${icon}"></i>`;
        }

        caption = icon + caption.trim();

        const isActive = (tabActive > 0 && tabActive === tabId) || (tabActive === 0 && tabId === 1) ? ' active' : '';
        tabNav += `<li class="tab${isActive}"><a href="#${href}">${caption || abbr}</a></li>`;
        tabContent += `<div class="tab-pane${isActive}" id="${href}">${postContent}</div>`;
    }

    tabNav = `<ul class="nav-tabs">${tabNav}</ul>`;
    tabContent = `<div class="tab-content">${tabContent}</div>`;

    return `<div class="tabs" id="${tabName.toLowerCase().split(' ').join('-')}">${tabNav + tabContent}</div>`;
}, true);