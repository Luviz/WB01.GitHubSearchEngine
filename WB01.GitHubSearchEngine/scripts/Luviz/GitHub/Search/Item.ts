namespace Luviz.GitHub.Search {
	export class Item {
		name: string;
		fullName: string;
		owner: string;
		url: string;
		language: string;
		watchers: number;
		forks: number;

		constructor(item:any) {
			this.name = item.name;
			this.fullName = item.full_name;
			this.owner = item.owner;
			this.url = item.clone_url;
			this.language = item.language;
			this.watchers = item.watchers_count;
			this.forks = item.forks;
		}
	}
}