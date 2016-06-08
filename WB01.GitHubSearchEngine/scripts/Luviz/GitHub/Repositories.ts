namespace Luviz.GitHub {
	export class Repositories {
		Repo: any;
		ApiUrl = "https://api.github.com/repos/";
		constructor(fullName) {
			//console.log("ctor.fullName: " + fullName);
			$.getJSON(this.ApiUrl + fullName, (data) => {
				//console.log(data);
				//console.log(data.owner.login);
				this.Repo = data;
				$('#mRepoTitle').text(data.name);
				this.UpdateCard();
			});
		}

		UpdateCard() {
			//Setting the the new url for the model
			$(".modal-footer > a").attr("href", this.Repo.html_url);

			$("#IOwner").text(this.Repo.owner.login);
			$("#IFork>span").text(this.Repo.forks);
			$("#IWatc>span").text(this.Repo.watchers);
			$("#ILang>span").text(this.Repo.language);
			$("#ISubs>span").text(this.Repo.subscribers_count);
			//Collaborators
			$.getJSON(this.Repo.contributors_url, (data) => {
				//console.log(data);
				var $clabList = $('#clabList');
				$clabList.empty();
				if (data != null) {
					$.each(data, (i, user) => {
						$clabList.append(this.GetUserCard(user));
					});

				} else {

					$clabList.text("No body Found :(")
				}
			});
			//Issues
			$.getJSON(this.Repo.url + "/issues", (data) => {
				//console.log(data);
				var $issuList = $('#issuList');
				$issuList.empty();
				//console.log(this.Repo.has_issues);
				if (data.length > 0) {
					$.each(data, (i, issue) => {

						$issuList.append('<span class="ms-ListItem-secondaryText">' + issue.title + '</span>')
					});
				} else {
					$issuList.text("No ISSUES Here!!!!!")
				}
			});

		}

		GetUserCard(user) {
			var $card = $("")
			var onclickHref = user.html_url

			//Owner
			var $card = $('<span class="ms-ListItem-secondaryText user">');
			var ImgUrl = user["avatar_url"];
			var $userImg = $('<img class="user-img" src="' + ImgUrl + '" />');
			$userImg.appendTo($card);
			$card.append(user["login"]);
			$card.appendTo($card);
			$card.click(() => { window.open(onclickHref); });
			return $card;
		}

		GetIssueCard(issue) {

		}


	}
}