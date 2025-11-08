/* global hexo */
'use strict';

hexo.extend.tag.register("cdnimg", function(args) {
    const config = hexo.config.cdnimg;
    args = args.join("").split(",");
    var imgAlt = args[0];
    var imgName = args[1];
    var urlName = config.prefix.join(config.prefix_char).replace(":title", this.slug.replace("-","")/* 这是文章文件名去掉扩展名的 */) + config.prefix_char + imgName;
    var wholeUrl = config.cdn + urlName;

    var imgAttr = [];
    if(args[2] != undefined) imgAttr = args[2].split(";");
    imgAttr = imgAttr.map((attr) => {
        attr.trim();
        attr = attr.replace("=", "=\"");
        attr += "\"";
        return attr;
    });
    imgAttr = imgAttr.join(" ");

    // console.log(JSON.stringify(Object.keys(this), null, 2));
    // console.log(typeof this);
    console.log(`<img src="${wholeUrl}" alt="${imgAlt}" ${imgAttr}>`);
    return `<img src="${wholeUrl}" alt="${imgAlt}" ${imgAttr}>`;
});