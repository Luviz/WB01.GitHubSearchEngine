/// <reference path="../jquery-2.2.3.js" />
/// <reference path="../knockout-3.4.0.debug.js" />
/// <reference path="../jquery-2.2.3.intellisense.js" />
'use strict'
var Luviz = {};
Luviz.GitHub = {};
Luviz.GitHub.Search = function () {
	var repos = ko.observableArray(),
		GitSearch = function (q) {
			var url = "https://api.github.com/search/repositories?q=";
			var repositories = [];
			if (q) {
				$.getJSON(url + q, function (data) {
					$.each(data.items, function (ix, value) {
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
					console.log(repositories);
					repos(repositories);
					return repositories;
				});
			}
		};
	return {
		GitSearch: GitSearch,
		repos: repos
	}
}