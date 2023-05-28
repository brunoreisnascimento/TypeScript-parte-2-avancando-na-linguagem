import { DiaDaSemana } from "../enums/dia-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";


export  class NegociacaoController {
   
        private inputData: HTMLInputElement;
        private inputQuanitdade : HTMLInputElement;
        private inputValor: HTMLInputElement;
        private negociacoes = new Negociacoes();
        private negociacoesView = new NegociacoesView("#negociacoesView", true);
        private mensagemView = new MensagemView("#mensagemView");

        constructor() {
            //as HTMLInputElement colocamos isso pra forcar a validação do 
            // query slector forçar a receber um HTML, não podendo receber um nulo
            //tendo duas formas de fazer abaixo
           this.inputData = <HTMLInputElement>document.querySelector("#data");
           //esse modo abaixo pode ser do jeito aciam ou abaixo
           this.inputQuanitdade = document.querySelector("#quantidade") as HTMLInputElement;
           this.inputValor = document.querySelector("#valor") as HTMLInputElement;
           this.negociacoesView.updated(this.negociacoes);
        }

        public adiciona(): void {
            //onst negociacaoTemp = new Negociacao(null, 0, 0);
            const negociacao = Negociacao.criaDe(
                this.inputData.value,
                this.inputQuanitdade.value,
                this.inputValor.value,
            );

            if(!this.ehDiaUtil(negociacao.data)){
                this.mensagemView.updated("Apenas negocicações em dias úteis são aceitas!");
                return;
            }

            this.negociacoes.adiciona(negociacao);
            console.log(this.negociacoes.lista());
            this.limparForm();
            this.atualizaView();    
        }

        private ehDiaUtil(data: Date){
            return  data.getDay() > DiaDaSemana.DOMINGO && data.getDay() < DiaDaSemana.SABADO
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