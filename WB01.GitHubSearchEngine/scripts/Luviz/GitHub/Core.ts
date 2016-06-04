namespace Luviz.GitHub {
	export class Core {
		static _urlSearch = "https://api.github.com/search/repositories?q=";
		repositories: Search.Items;
		constructor() { };
		GitSearch(q: string) {
			$.getJSON(Core._urlSearch + q, (data) => {
				this.repositories = new Search.Items(data.items);
				console.log(this.repositories);
				console.log(data);
			}); 
		}
	}
}