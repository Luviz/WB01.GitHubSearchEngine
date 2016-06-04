var Luviz;
(function (Luviz) {
    var GitHub;
    (function (GitHub) {
        var Search;
        (function (Search) {
            var Item = (function () {
                function Item(item) {
                    this.name = item.name;
                    this.fullName = item.full_name;
                    this.owner = item.owner;
                    this.url = item.clone_url;
                    this.language = item.language;
                    this.watchers = item.watchers_count;
                    this.forks = item.forks;
                }
                return Item;
            }());
            Search.Item = Item;
        })(Search = GitHub.Search || (GitHub.Search = {}));
    })(GitHub = Luviz.GitHub || (Luviz.GitHub = {}));
})(Luviz || (Luviz = {}));
var Luviz;
(function (Luviz) {
    var GitHub;
    (function (GitHub) {
        var Search;
        (function (Search) {
            var Items = (function () {
                function Items(items) {
                    var _this = this;
                    $.each(items, function (ix, data) {
                        _this._items[ix] = new Search.Item(data);
                    });
                }
                return Items;
            }());
            Search.Items = Items;
        })(Search = GitHub.Search || (GitHub.Search = {}));
    })(GitHub = Luviz.GitHub || (Luviz.GitHub = {}));
})(Luviz || (Luviz = {}));
var Luviz;
(function (Luviz) {
    var GitHub;
    (function (GitHub) {
        var Core = (function () {
            function Core() {
            }
            Core.GitSearch = function (q) {
                $.getJSON(this._urlSearch + q, function () {
                });
            };
            Core._urlSearch = "https://api.github.com/search/repositories?q=";
            return Core;
        }());
        GitHub.Core = Core;
    })(GitHub = Luviz.GitHub || (Luviz.GitHub = {}));
})(Luviz || (Luviz = {}));
//# sourceMappingURL=Luviz.Core.js.map