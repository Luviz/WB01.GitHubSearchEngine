
namespace Luviz.GitHub.Search {
	export class Items {
		_items: Item[];
		constructor(items) {
			this._items = []
			$.each(items, (ix, data) => {
				this._items[ix] = new Item(data);
			});
		}
		log() {
			console.log(this._items);
		}
		getCard() {
			
		}
	}
}