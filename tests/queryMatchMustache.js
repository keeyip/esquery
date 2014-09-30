
define([
    "esquery",
    "jstestr/assert",
    "jstestr/test",
    "./fixtures/conditional",
], function (esquery, assert, test, conditional) {
    esquery.matchMustache = function(node, selector, ancestry) {
        var parts = selector.expr.split(/\s+/);
        var predicateParts = parts.shift().split('.');
        var args = parts;
        var moduleName = predicateParts.shift();
        var objectPath = predicateParts;
        if (moduleName === 'util' && objectPath.join('.') === 'es.isGood') {
            return true;
        } else {
            return false;
        }
    };

    test.defineSuite("matchMustache", {
        "calls custom matchMustache if `util.es.isGood blah.blah`": function () {
            var matches = esquery(conditional, "Program:{util.es.isGood blah.blah}");
            assert.contains([conditional], matches);
        },
        "calls custom matchMustache if `util.es.isGood`": function () {
            var matches = esquery(conditional, "Program:{util.es.isGood}");
            assert.contains([conditional], matches);
        },
        "calls custom matchMustache if `util.es.isBad blah.blah`": function () {
            var matches = esquery(conditional, "Program:{util.es.isBad blah.blah}");
            assert.contains([], matches);
        },
        "calls custom matchMustache if `util.es.isBad`": function () {
            var matches = esquery(conditional, "Program:{util.es.isBad}");
            assert.contains([], matches);
        },
        "calls custom matchMustache if empty mustache": function () {
            var matches = esquery(conditional, "Program");
            assert.contains([conditional], matches);
        },
        "calls custom matchMustache if no mustache": function () {
            var matches = esquery(conditional, "");
            assert.contains([], matches);
        }
    });
});
