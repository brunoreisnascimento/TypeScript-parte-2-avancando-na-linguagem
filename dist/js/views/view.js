export class View {
    constructor(selector) {
        this.element = document.querySelector(selector);
    }
    updated(model) {
        const template = this.template(model);
        this.element.innerHTML = template;
    }
}
