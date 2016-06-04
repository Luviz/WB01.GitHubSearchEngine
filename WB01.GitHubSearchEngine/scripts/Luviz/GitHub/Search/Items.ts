
namespace Luviz.GitHub.Search {
	export class Items {
		_items: Item[];
		constructor(items) {
			$.each(items, (ix, data) => {
				this._items[ix] = new Item(data);
			});
		}
	}
}