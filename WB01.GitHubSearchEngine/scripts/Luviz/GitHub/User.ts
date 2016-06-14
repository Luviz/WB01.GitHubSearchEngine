namespace Luviz.GitHub {
    export class User {
        Name: string;
        Avatar: string;
        PubRepos: string;
        Type: string;
        Location: string;

        constructor(login: string) {
            //Look for user in session storage
            var storedUser = sessionStorage.getItem("Luviz.GitHub.User." + login);
            User.clearCallOut();
            if (storedUser == null) { //get the user from github!
                console.log("getting " + login + " from gitHub");
                $.getJSON("https://api.github.com/users/" + login, (user) => {
                    this.Name = user.name;
                    this.Avatar = user.avatar_url;
                    this.PubRepos = user.public_repos;
                    this.Type = user.type;
                    this.Location = user.location;
                    //write to Session storege
                    sessionStorage.setItem("Luviz.GitHub.User." + login, JSON.stringify(this));
                }).then(() => { User.updateCallOut(this) });
            } else {
                //handle the stored User
                //parse User to User Obj
                console.log("Geting user from storage");
                storedUser = JSON.parse(storedUser);

                this.Name = storedUser.Name
                this.Avatar = storedUser.Avatar
                this.PubRepos = storedUser.PubRepos
                this.Type = storedUser.Type
                this.Location = storedUser.Location

                User.updateCallOut(this);
            }
        }
        static BindCallOut(id: string) {
            var $co = $("#" + id);
            var $Owner = $("#IOwner")

            $co.hide();
            $co.attr("data-login", $Owner.text().toString());
            $co.attr("data-updated", "false");

            $Owner.hover(() => {
                $co.fadeIn("slow");
                if ($co.attr("data-updated") == "false") {
                    $co.attr("data-updated", "true");
                    console.log("updateing calloutUser");
                    new User($("#IOwner").text());
                }
            },
                () => { $co.fadeOut("fast"); })
        }

        static updateCallOut(user: User) {
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



        }

        static clearCallOut() {
            $("#COAvatar").attr("src", "http://ahmed-badawy.com/blog/wp-content/uploads/2015/03/github-logo-160x160.jpg");
            $("#COName").text("Unkown");
            $("#COLocation").text("location: unkown");
            $("#COPubRepos").text("Public repos: unkown");
            $("#COType").text("type: unkown");
        }

    }
}

