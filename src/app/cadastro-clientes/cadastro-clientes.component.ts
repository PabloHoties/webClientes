import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Directive, ElementRef, HostListener } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { config } from '../../environments/environment';

@Component({
  selector: 'app-cadastro-clientes',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './cadastro-clientes.component.html',
  styleUrl: './cadastro-clientes.component.css'
})
export class CadastroClientesComponent {

  uf: string[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  mensagem: string = '';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  //estrutura de formulário
  form = new FormGroup({
    nome: new FormControl('', [
      Validators.required, Validators.minLength(8),
      Validators.maxLength(100)
    ]),
    email: new FormControl('', [
      Validators.required, Validators.email
    ]),
    cpf: new FormControl('', [
      Validators.required, Validators.pattern(/^[0-9]{11}$/)
    ]),
    dataNascimento: new FormControl('', [
      Validators.required
    ]),
    logradouro: new FormControl('', [
      Validators.required, Validators.minLength(10),
      Validators.maxLength(100)
    ]),
    complemento: new FormControl('', [
      Validators.required, Validators.minLength(5),
      Validators.maxLength(25)
    ]),
    numero: new FormControl('', [
      Validators.required, Validators.pattern(/^[0-9]{1,5}$/)
    ]),
    bairro: new FormControl('', [
      Validators.required, Validators.minLength(3),
      Validators.maxLength(25)
    ]),
    cidade: new FormControl('', [
      Validators.required, Validators.minLength(3),
      Validators.maxLength(25)
    ]),
    uf: new FormControl('', [
      Validators.required
    ]),
    cep: new FormControl('', [
      Validators.required, Validators.pattern(/^[0-9]{5}-[0-9]{3}$/)
    ]),
  });

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    if (this.form && this.form.valid) {
      const formControls = this.form.controls;
      if (formControls) {
        const requestBody = {
          nome: formControls['nome'].value,
          email: formControls['email'].value,
          cpf: formControls['cpf'].value,
          dataNascimento: formControls['dataNascimento'].value,
          endereco: {
            logradouro: formControls['logradouro'].value,
            complemento: formControls['complemento'].value,
            numero: formControls['numero'].value,
            bairro: formControls['bairro'].value,
            cidade: formControls['cidade'].value,
            uf: formControls['uf'].value,
            cep: formControls['cep'].value
          }
        };

        this.httpClient.post(config.apiUrl + '/criar', requestBody, { responseType: 'text' })
          .subscribe({
            next: (data) => {
              this.mensagem = 'Cliente cadastrado com sucesso. Um email foi enviado para confirmar o registro.';
              this.form.reset();
            },
            error: (e) => {
              this.mensagem = 'Ocorreu um erro ao cadastrar o cliente: ' + e.error;
            }
          });
      }
    } else {
      this.markFormGroupTouched(this.form);
    }
  }

  // Método auxiliar para marcar todos os campos como "touched" para exibir mensagens de erro
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

}