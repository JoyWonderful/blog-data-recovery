/* global hexo */

'use strict';

const moment = require("moment");
hexo.extend.helper.register('post_time', function(momObject, formatStr) {
    return moment(momObject).format(formatStr);
})