const Handlebars = require('handlebars');

function registerViewEngineHelpers() {

    Handlebars.registerHelper('ifeq', function(a, b, options) {
        if (a == b) { return options.fn(this); }
        return options.inverse(this);
    });

    Handlebars.registerHelper('grt_than', function(a, b, options) {
        if (a.length > b) { return options.fn(this); }
        return options.inverse(this);
    });

    Handlebars.registerHelper('each_upto', function(ary, max, options) {
        if (!ary || ary.length == 0)
            return options.inverse(this);

        var result = [];
        for (var i = 0; i < max && i < ary.length; ++i)
            result.push(options.fn(ary[i]));
        return result.join('');
    });

    Handlebars.registerHelper('ifnoteq', function(a, b, options) {
        if (a != b) { return options.fn(this); }
        return options.inverse(this);
    });
    Handlebars.registerHelper('formatCurrency', function(value) {
        return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    });

    Handlebars.registerHelper('returnOnlyZeroindex', function(a) {
        return a[0]
    })

}

module.exports = { registerViewEngineHelpers }