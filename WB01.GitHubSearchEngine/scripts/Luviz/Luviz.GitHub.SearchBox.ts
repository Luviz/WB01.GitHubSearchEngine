/// <reference path="../typings/jquery/jquery.d.ts" />
'use strict'
namespace Luviz.GitHub.SearchBox {
	var $SearchBox = $("#SearchBar-Input");
	//export var repos = ko.observableArray();

    export class Search {
		constructor() {
			console.log($SearchBox.val());
			$SearchBox.on("input", () => {
				if ($SearchBox.val().length > 2) {
					console.log($SearchBox.val());
					this.GetLight($SearchBox.val());
				}
			});

		}
		GetLight(q: string) {
			var url = "https://api.github.com/search/repositories?q=";
			var repositories = [];
			$.getJSON(url + q, (data) => {
				$.each(data.items, (ix, value) => {
					repositories.push(
						{
							//debug: value, 
							name: value.name,
							fullName: value.full_name,
							owner: value.owner,
							url: value.clone_url,
							language: value.language,
							watchers: value.watchers_count,
							forks: value.forks
						}
					);
				});
				console.log(repositories)
				return repositories;	
			});
		}

	
    }
	
}