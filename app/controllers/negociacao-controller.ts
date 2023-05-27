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
        private readonly SABADO = 6;
        private readonly DOMINGO = 0;

        constructor() {
           this.inputData = document.querySelector("#data");
           this.inputQuanitdade = document.querySelector("#quantidade");
           this.inputValor = document.querySelector("#valor");
           this.negociacoesView.updated(this.negociacoes);
        }

        public adiciona(): void {
            const negociacao = this.criaNegociacao(); 
            if(!this.ehDiaUtil(negociacao.data)){
                this.mensagemView.updated("Apenas negocicações em dias úteis são aceitas!");
                return;
            }
            this.negociacoes.adiciona(negociacao);
            console.log(this.negociacoes.lista());
            this.limparForm();
            this.atualizaView();    
        }

        public criaNegociacao(): Negociacao {
            const  exp = /-/g;
            const date = new Date(this.inputData.value.replace(exp, ","));
            const quantidade = parseInt(this.inputQuanitdade.value);
            const valor = parseFloat(this.inputValor.value);
            return new Negociacao( date, quantidade, valor);
        }

        private ehDiaUtil(data: Date){
            return  data.getDay() > this.DOMINGO && data.getDay() < this.SABADO
        }

        private limparForm(): void{
            this.inputData.value = "";
            this.inputQuanitdade.value = "";
            this.inputValor.value = "";
            this.inputData.focus();
        }

        private atualizaView(): void {
            this.negociacoesView.updated(this.negociacoes);
            this.mensagemView.updated("Negociação Adicionada com sucesso!");
        }

}