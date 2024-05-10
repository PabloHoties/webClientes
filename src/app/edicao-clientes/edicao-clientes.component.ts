import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { config } from '../../environments/environment';

@Component({
  selector: 'app-edicao-clientes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edicao-clientes.component.html',
  styleUrl: './edicao-clientes.component.css'
})
export class EdicaoClientesComponent implements OnInit {

  uf: string[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  mensagem: string = '';

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  form = new FormGroup({
    idCliente: new FormControl(''),
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
    idEndereco: new FormControl(''),
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
  })

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.httpClient.get(config.apiUrl + '/obter/' + id)
      .subscribe({
        next: (data: any) => {
          this.form.patchValue({
            idCliente: data.id,
            nome: data.nome,
            email: data.email,
            cpf: data.cpf,
            dataNascimento: new Date(data.dataNascimento).toISOString().substring(0, 10), // Convertendo o timestamp para uma string no formato 'YYYY-MM-DD'
            idEndereco: data.enderecos[0].id, // Supondo que sempre haja apenas um endereço
            logradouro: data.enderecos[0].logradouro,
            complemento: data.enderecos[0].complemento,
            numero: data.enderecos[0].numero,
            bairro: data.enderecos[0].bairro,
            cidade: data.enderecos[0].cidade,
            uf: data.enderecos[0].uf,
            cep: data.enderecos[0].cep
          });
        },
        error: (e) => {
          console.log(e.erro);
        }
      })
  }

  onSubmit(): void {
    if (this.form && this.form.valid) {
      const formControls = this.form.controls;
      if (formControls) {
        const requestBody = {
          id: formControls['idCliente'].value,
          nome: formControls['nome'].value,
          email: formControls['email'].value,
          cpf: formControls['cpf'].value,
          dataNascimento: formControls['dataNascimento'].value,
          endereco: {
            id: formControls['idEndereco'].value,
            logradouro: formControls['logradouro'].value,
            complemento: formControls['complemento'].value,
            numero: formControls['numero'].value,
            bairro: formControls['bairro'].value,
            cidade: formControls['cidade'].value,
            uf: formControls['uf'].value,
            cep: formControls['cep'].value
          }
        };

        this.httpClient.put(config.apiUrl + '/atualizar', requestBody, { responseType: 'text' })
          .subscribe({
            next: (data) => {
              this.mensagem = 'Cliente atualizado com sucesso.';
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
