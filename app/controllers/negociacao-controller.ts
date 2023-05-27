import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export  class NegociacaoController {
   
        private inputData: HTMLInputElement;
        private inputQuanitdade : HTMLInputElement;
        private inputValor: HTMLInputElement;
        private negociacoes = new Negociacoes();
        private negociacoesView = new NegociacoesView("#negociacoesView");
        private mensagemView = new MensagemView("#mensagemView");

        constructor() {
           this.inputData = document.querySelector("#data");
           this.inputQuanitdade = document.querySelector("#quantidade");
           this.inputValor = document.querySelector("#valor");
           this.negociacoesView.updated(this.negociacoes);
        }

        adiciona(): void{
            const negociacao = this.criaNegociacao(); 
            this.negociacoes.adiciona(negociacao);
            this.negociacoesView.updated(this.negociacoes);
            this.mensagemView.updated("Negociação Adicionada com sucesso!");
            console.log(this.negociacoes.lista());

            this.limparForm();
        }

        criaNegociacao(): Negociacao{
            const  exp = /-/g;
            const date = new Date(this.inputData.value.replace(exp, ","));
            const quantidade = parseInt(this.inputQuanitdade.value);
            const valor = parseFloat(this.inputValor.value);
            return new Negociacao( date, quantidade, valor);
        }

    limparForm(): void{
        this.inputData.value = "";
        this.inputQuanitdade.value = "";
        this.inputValor.value = "";
        this.inputData.focus();
    }

}