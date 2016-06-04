namespace Luviz.GitHub.Search {
	export class Item {
		name: string;
		fullName: string;
		owner: string;
		url: string;
		language: string;
		watchers: number;
		forks: number;
		lastUpdate: Date;

		monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Novr", "Dec"];

		constructor(item:any) {
			this.name = item.name;
			this.fullName = item.full_name;
			this.owner = item.owner;
			this.url = item.clone_url;
			this.language = item.language;
			this.watchers = item.watchers_count;
			this.forks = item.forks;
			this.lastUpdate = new Date(item.updated_at);
		}
		getCard() {
			var $card = $('<li class="ms-ListItem is-selectable" >');
			
			var $namePlate = $('<span class="ms-ListItem-primaryText">');
			$namePlate.text(this.name);
			$namePlate.appendTo($card);

			//Owner
			var $ownerPlate = $('<span class="ms-ListItem-secondaryText">');
			var ImgUrl = this.owner["avatar_url"];
			var $ownerImg = $('<img src="' + ImgUrl+ '" style="max-height:1em; margin-right:1px" />');
			$ownerImg.appendTo($ownerPlate);
			$ownerPlate.append(this.owner["login"]);
			$ownerPlate.appendTo($card);

			//Lang
			var $lang = $('<span class="ms-ListItem-tertiaryText" >');
			$lang.text(this.language);
			$lang.appendTo($card);

			//Update date
			var $update = $('<span class="ms-ListItem-metaText" >');
			var date: string = this.lastUpdate.getFullYear() + "-" +
				this.monthNames[this.lastUpdate.getMonth()] + "-" +
				this.lastUpdate.getDate();
			$update.text(date);
			$update.appendTo($card);

			//ActionBar
			var $ActionBar = $('<div class="ms-ListItem-actions">');
			$ActionBar.append('<div class="ms-ListItem-action"><img src="http://pritishc.com/images/social/github.png" style="height:1.75em"/></div>');
			$ActionBar.appendTo($card);

			return $card;

		}
	}
}