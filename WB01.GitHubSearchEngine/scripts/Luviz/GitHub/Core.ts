namespace Luviz.GitHub {
	export class Core {
		static _urlSearch = "https://api.github.com/search/repositories?q=";
		repositories: Search.Items;

		static GitSearch(q: string) {
			$.getJSON(this._urlSearch + q, () => {
				
			}); 
		}
	}
}