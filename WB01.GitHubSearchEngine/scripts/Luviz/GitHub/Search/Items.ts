
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
		getCards() {
			var $card = $('<ul class="ms-List" id="debug">');
			$.each(this._items, (ix, item) => {
				item.getCard().appendTo($card);
			});
			return $card;
		}
	}
}