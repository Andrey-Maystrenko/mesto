export class Section {
    constructor({ items, renderer }, elementsSelector) {
        this.items = items;
        this.renderer = renderer;
        this.elementsSelector = elementsSelector;
        this._container = document.querySelector(this.elementsSelector)
    }
    renderSection() {
        this.items.forEach((card) => {
            const renderedCard = this.renderer(card);
            this._container.append(renderedCard);
        });
    }

    addItem(renderedNewCard) {
        //вставляю разметку добавленной карточкои в elements
        this._container.prepend(renderedNewCard);
    }
}