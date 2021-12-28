export class Section {
    constructor({ items, renderer }, elementsSelector) {
        this.items = items;
        this.renderer = renderer;
        this.elementsSelector = elementsSelector;
    }
    renderSection() {
        this.items.forEach((card) => {
            const renderedCard = this.renderer(card);
            document.querySelector(this.elementsSelector).append(renderedCard);
        });
    }

    addItem(renderedNewCard) {
        //вставляю разметку добавленной карточкои в elements
        document.querySelector(this.elementsSelector).prepend(renderedNewCard);
    }
}