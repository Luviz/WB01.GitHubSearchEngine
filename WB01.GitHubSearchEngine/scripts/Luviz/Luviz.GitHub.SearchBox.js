'use strict';
var Luviz;
(function (Luviz) {
    var GitHub;
    (function (GitHub) {
        var SearchBox;
        (function (SearchBox) {
            var $SearchBox = $("#SearchBar-Input");
            SearchBox.repos = ko.observableArray();
            var Search = (function () {
                function Search() {
                    var _this = this;
                    console.log($SearchBox.val());
                    $SearchBox.on("input", function () {
                        if ($SearchBox.val().length > 2) {
                            console.log($SearchBox.val());
                            _this.GetLight($SearchBox.val());
                        }
                    });
                }
                Search.prototype.GetLight = function (q) {
                    var url = "https://api.github.com/search/repositories?q=";
                    var repositories = [];
                    $.getJSON(url + q, function (data) {
                        $.each(data.items, function (ix, value) {
                            repositories.push({
                                //debug: value, 
                                name: value.name,
                                fullName: value.full_name,
                                owner: value.owner,
                                url: value.clone_url,
                                language: value.language,
                                watchers: value.watchers_count,
                                forks: value.forks
                            });
                        });
                        console.log(repositories);
                        return repositories;
                    });
                };
                return Search;
            }());
            SearchBox.Search = Search;
        })(SearchBox = GitHub.SearchBox || (GitHub.SearchBox = {}));
    })(GitHub = Luviz.GitHub || (Luviz.GitHub = {}));
})(Luviz || (Luviz = {}));
//# sourceMappingURL=Luviz.GitHub.SearchBox.js.map