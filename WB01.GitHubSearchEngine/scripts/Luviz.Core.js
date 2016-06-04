var Luviz;
(function (Luviz) {
    var GitHub;
    (function (GitHub) {
        var Search;
        (function (Search) {
            var Item = (function () {
                function Item(item) {
                    this.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Novr", "Dec"];
                    this.name = item.name;
                    this.fullName = item.full_name;
                    this.owner = item.owner;
                    this.url = item.clone_url;
                    this.language = item.language;
                    this.watchers = item.watchers_count;
                    this.forks = item.forks;
                    this.lastUpdate = new Date(item.updated_at);
                }
                Item.prototype.getCard = function () {
                    var $card = $('<li class="ms-ListItem is-selectable" >');
                    var $namePlate = $('<span class="ms-ListItem-primaryText">');
                    $namePlate.text(this.name);
                    $namePlate.appendTo($card);
                    //Owner
                    var $ownerPlate = $('<span class="ms-ListItem-secondaryText">');
                    var ImgUrl = this.owner["avatar_url"];
                    var $ownerImg = $('<img src="' + ImgUrl + '" style="max-height:1em; margin-right:1px" />');
                    $ownerImg.appendTo($ownerPlate);
                    $ownerPlate.append(this.owner["login"]);
                    $ownerPlate.appendTo($card);
                    //Lang
                    var $lang = $('<span class="ms-ListItem-tertiaryText" >');
                    $lang.text(this.language);
                    $lang.appendTo($card);
                    //Update date
                    var $update = $('<span class="ms-ListItem-metaText" >');
                    var date = this.lastUpdate.getFullYear() + "-" +
                        this.monthNames[this.lastUpdate.getMonth()] + "-" +
                        this.lastUpdate.getDate();
                    $update.text(date);
                    $update.appendTo($card);
                    //ActionBar
                    var $ActionBar = $('<div class="ms-ListItem-actions">');
                    $ActionBar.append('<div class="ms-ListItem-action"><img src="http://pritishc.com/images/social/github.png" style="height:1.75em"/></div>');
                    $ActionBar.appendTo($card);
                    return $card;
                };
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
                    this._items = [];
                    $.each(items, function (ix, data) {
                        _this._items[ix] = new Search.Item(data);
                    });
                }
                Items.prototype.log = function () {
                    console.log(this._items);
                };
                Items.prototype.getCards = function () {
                    var $card = $('<ul class="ms-List" id="debug">');
                    $.each(this._items, function (ix, item) {
                        item.getCard().appendTo($card);
                    });
                    return $card;
                };
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
            ;
            Core.prototype.GitSearch = function (q) {
                var _this = this;
                $("#container").empty();
                //Add spin!
                $.getJSON(Core._urlSearch + q, function (data) {
                    _this.repositories = new GitHub.Search.Items(data.items);
                    console.log(_this.repositories);
                    console.log(data);
                    //Clear Containor
                    $("#container").append(_this.repositories.getCards());
                });
            };
            Core._urlSearch = "https://api.github.com/search/repositories?q=";
            return Core;
        }());
        GitHub.Core = Core;
    })(GitHub = Luviz.GitHub || (Luviz.GitHub = {}));
})(Luviz || (Luviz = {}));
//# sourceMappingURL=Luviz.Core.js.map