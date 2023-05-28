export abstract class View<T> {

    protected element: HTMLElement;
    private escapar: boolean = false;

    constructor(selector: string, escapar?: boolean){
        const elemento = document.querySelector(selector);

        if (elemento) {
            this.element = elemento as  HTMLElement;
        }else{
            throw new Error(`Selecotr ${selector} não existe no DOM, verifique.`);
        }
        if(escapar){
            this.escapar = escapar;
        }
    }

    protected abstract template(model: T): string;

   public updated(model: T): void{
        let template = this.template(model);
        if(this.escapar){
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        this.element.innerHTML = template;
    }

    // updated(model: Negociacoes): void {
    //     const template = this.template(model);
    //     console.log(template);
    //     this.element.innerHTML = template;
    // }


}