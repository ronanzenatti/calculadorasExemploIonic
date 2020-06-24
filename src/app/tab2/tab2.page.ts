import { Component } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { evaluate } from 'mathjs';

import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public calculo = '';
  public resultado: string;

  public ponto = false;

  private operacoes = ['+', '-', '*', '/'];

  constructor(public alertController: AlertController) {
    registerLocaleData(localePtBr);
  }

  public adicionarNumero(valor) {
    if (this.resultado) {
      this.calculo = '';
      this.resultado = null;
      this.ponto = false;
    }

    this.calculo += valor;
  }

  public adicionarPonto() {
    if (this.ponto) {
      return;
    }
    this.ponto = true;
    this.calculo += '.';
  }

  public adicionaOperacao(operador: string) {
    if (this.resultado) {
      this.calculo = this.resultado.toString();
      this.resultado = null;
    }

    const ultimo = this.calculo.slice(this.calculo.length - 1);
    if (this.operacoes.indexOf(ultimo) > -1) {
      return;
    }

    this.calculo += operador;
    this.ponto = false;
  }

  calculaResultado() {
    try {
      this.resultado = evaluate(this.calculo);
    } catch (e) {
      this.resultado = '';
      this.presentAlert('ERRO!', 'Cálculo inválido!')
    }
  }

  public apagarTudo() {
    this.calculo = '';
    this.resultado = null;
    this.ponto = false;
  }

  apagarUltimo() {
    const ultimo = this.calculo.slice(this.calculo.length - 1);

    if (ultimo == '.') {
      this.ponto = false;
    }

    this.calculo = this.calculo.slice(0, -1);
  }

  async presentAlert(titulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }

}
