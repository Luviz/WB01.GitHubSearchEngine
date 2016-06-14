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
                    var $card = $('<li class="ms-ListItem is-selectable" data-toggle="modal" data-target="#dModal" onclick="Luviz.GitHub.Core.GetDetail(\'' + this.fullName + '\')" >');
                    var $namePlate = $('<span class="ms-ListItem-primaryText">');
                    $namePlate.text(this.name);
                    $namePlate.appendTo($card);
                    //Owner
                    var $ownerPlate = $('<span class="ms-ListItem-secondaryText">');
                    var ImgUrl = this.owner["avatar_url"];
                    var $ownerImg = $('<img src="' + ImgUrl + '"/>');
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
                    var url = "http://github.com/" + this.fullName;
                    var $ActionBar = $('<div class="ms-ListItem-actions">');
                    $ActionBar.append('<div class="ms-ListItem-action"><img onclick="window.open(\'' + url + '\')" src="http://pritishc.com/images/social/github.png" style="height:1.75em"/></div>');
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
        var Repositories = (function () {
            function Repositories(fullName) {
                var _this = this;
                this.ApiUrl = "https://api.github.com/repos/";
                this.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Novr", "Dec"];
                //console.log("ctor.fullName: " + fullName);
                $.getJSON(this.ApiUrl + fullName, function (data) {
                    //console.log(data);
                    //console.log(data.owner.login);
                    _this.Repo = data;
                    $('#mRepoTitle').text(data.name);
                    _this.UpdateCard();
                });
            }
            Repositories.prototype.UpdateCard = function () {
                var _this = this;
                //Setting the the new url for the model
                $(".modal-footer > a").attr("href", this.Repo.html_url);
                $("#IOwner").text(this.Repo.owner.login);
                $("#IFork>span").text(this.Repo.forks);
                $("#IWatc>span").text(this.Repo.watchers);
                $("#ILang>span").text(this.Repo.language);
                $("#ISubs>span").text(this.Repo.subscribers_count);
                //bind callout with user
                GitHub.User.BindCallOut("calloutUser");
                //Collaborators
                $.getJSON(this.Repo.contributors_url, function (data) {
                    //console.log(data);
                    var $clabList = $('#clabList');
                    $clabList.empty();
                    if (data != null) {
                        $.each(data, function (i, user) {
                            $clabList.append(_this.GetUserCard(user));
                        });
                    }
                    else {
                        $clabList.text("No body Found :(");
                    }
                });
                //Issues
                $.getJSON(this.Repo.url + "/issues", function (data) {
                    //console.log(data);
                    var $issuList = $('#issuList');
                    $issuList.empty();
                    //console.log(this.Repo.has_issues);
                    if (data.length > 0) {
                        $.each(data, function (i, issue) {
                            $issuList.append(_this.GetIssueCard(issue));
                        });
                    }
                    else {
                        $issuList.text("No ISSUES Here!!!!!");
                    }
                });
            };
            Repositories.prototype.GetUserCard = function (user) {
                var $card = $("");
                var onclickHref = user.html_url;
                //User
                var $card = $('<span class="ms-ListItem-secondaryText user">');
                var ImgUrl = user["avatar_url"];
                var $userImg = $('<img class="user-img" src="' + ImgUrl + '" />');
                $userImg.appendTo($card);
                $card.append(user["login"]);
                $card.appendTo($card);
                $card.click(function () { window.open(onclickHref); });
                //contributions
                var $tribut = $('<div class="ms-ListItem-tertiaryText">');
                $tribut.hide();
                $tribut.append("Contributions: " + user.contributions);
                $tribut.append("<br>");
                $tribut.append("Is an Admin: " + user.site_admin);
                $tribut.appendTo($card);
                //onhover
                $card.on("mouseenter", function () { $tribut.show("fast"); });
                $card.on("mouseleave", function () { $tribut.hide("fast"); });
                return $card;
            };
            Repositories.prototype.GetIssueCard = function (issue) {
                var $card = $('<span class="ms-ListItem-secondaryText issue">');
                $card.append(issue.title);
                //contributions
                var $info = $('<div class="ms-ListItem-tertiaryText">');
                $info.hide();
                var createdAt = new Date(issue.created_at);
                var date = createdAt.getFullYear() + "-" +
                    this.monthNames[createdAt.getMonth()] + "-" +
                    createdAt.getDate();
                $info.append("User: " + issue.user.login);
                $info.append("<br>");
                $info.append("Created At: " + date);
                $info.appendTo($card);
                //onhover
                $card.on("mouseenter", function () { $info.show("fast"); });
                $card.on("mouseleave", function () { $info.hide("fast"); });
                //onClick
                $card.click(function () { window.open(issue.html_url); });
                return $card;
            };
            return Repositories;
        }());
        GitHub.Repositories = Repositories;
    })(GitHub = Luviz.GitHub || (Luviz.GitHub = {}));
})(Luviz || (Luviz = {}));
var Luviz;
(function (Luviz) {
    var GitHub;
    (function (GitHub) {
        var User = (function () {
            function User(login) {
                var _this = this;
                //Look for user in session storage
                var storedUser = sessionStorage.getItem("Luviz.GitHub.User." + login);
                User.clearCallOut();
                if (storedUser == null) {
                    console.log("getting " + login + " from gitHub");
                    $.getJSON("https://api.github.com/users/" + login, function (user) {
                        _this.Name = user.name;
                        _this.Avatar = user.avatar_url;
                        _this.PubRepos = user.public_repos;
                        _this.Type = user.type;
                        _this.Location = user.location;
                        //write to Session storege
                        sessionStorage.setItem("Luviz.GitHub.User." + login, JSON.stringify(_this));
                    }).then(function () { User.updateCallOut(_this); });
                }
                else {
                    //handle the stored User
                    //parse User to User Obj
                    console.log("Geting user from storage");
                    storedUser = JSON.parse(storedUser);
                    this.Name = storedUser.Name;
                    this.Avatar = storedUser.Avatar;
                    this.PubRepos = storedUser.PubRepos;
                    this.Type = storedUser.Type;
                    this.Location = storedUser.Location;
                    User.updateCallOut(this);
                }
            }
            User.BindCallOut = function (id) {
                var $co = $("#" + id);
                var $Owner = $("#IOwner");
                $co.hide();
                $co.attr("data-login", $Owner.text().toString());
                $co.attr("data-updated", "false");
                $Owner.hover(function () {
                    $co.fadeIn("slow");
                    if ($co.attr("data-updated") == "false") {
                        $co.attr("data-updated", "true");
                        console.log("updateing calloutUser");
                        new User($("#IOwner").text());
                    }
                }, function () { $co.fadeOut("fast"); });
            };
            User.updateCallOut = function (user) {
                console.log(user);
                user.Name;
                if (user.Name != null) {
                    $("#COName").text(user.Name);
                }
                if (user.Avatar != null) {
                    $("#COAvatar").attr("src", user.Avatar);
                }
                if (user.Location != null) {
                    $("#COLocation").text("location: " + user.Location);
                }
                if (user.PubRepos != null) {
                    $("#COPubRepos").text("Public repos: " + user.PubRepos);
                }
                if (user.Type != null) {
                    $("#COType").text("type: " + user.Type);
                }
            };
            User.clearCallOut = function () {
                $("#COAvatar").attr("src", "http://ahmed-badawy.com/blog/wp-content/uploads/2015/03/github-logo-160x160.jpg");
                $("#COName").text("Unkown");
                $("#COLocation").text("location: unkown");
                $("#COPubRepos").text("Public repos: unkown");
                $("#COType").text("type: unkown");
            };
            return User;
        }());
        GitHub.User = User;
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
                    //console.log(this.repositories);
                    //console.log(data);
                    //Clear Containor
                    $("#container").append(_this.repositories.getCards());
                });
            };
            Core.GetDetail = function (fullName) {
                //console.log("GetDetail " + fullName);	
                var repo = new GitHub.Repositories(fullName);
            };
            Core._urlSearch = "https://api.github.com/search/repositories?q=";
            return Core;
        }());
        GitHub.Core = Core;
    })(GitHub = Luviz.GitHub || (Luviz.GitHub = {}));
})(Luviz || (Luviz = {}));
//# sourceMappingURL=Luviz.Core.js.map