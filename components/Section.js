export class Section {
    constructor({ items, renderer }, elementsSelector) {
        this._items = items;
        this._renderer = renderer;
        this._elementsSelector = elementsSelector;
        this._container = document.querySelector(this._elementsSelector)
    }
    renderSection() {
        this._items.forEach((card) => {
            this._renderer(card)
            // const renderedCard = this._renderer(card);
            // this._container.append(renderedCard);
        });
    }

    addItem(renderedNewCard) {
        //вставляю разметку добавленной карточкои в elements
        this._container.prepend(renderedNewCard);
    }
}