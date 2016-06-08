namespace Luviz.GitHub {
	export class Core {
		static _urlSearch = "https://api.github.com/search/repositories?q=";
		repositories: Search.Items;
		constructor() { };
		GitSearch(q: string) {
			$("#container").empty();
			//Add spin!
			$.getJSON(Core._urlSearch + q, (data) => {
				this.repositories = new Search.Items(data.items);
				//console.log(this.repositories);
				//console.log(data);
				//Clear Containor
				$("#container").append(this.repositories.getCards());
				
			}); 
		}

		static GetDetail(fullName) {
			//console.log("GetDetail " + fullName);	
			var repo = new Repositories(fullName);
		}
	}
}
