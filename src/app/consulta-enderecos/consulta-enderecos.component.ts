import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { config } from '../../environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-consulta-enderecos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consulta-enderecos.component.html',
  styleUrl: './consulta-enderecos.component.css'
})
export class ConsultaEnderecosComponent {

  cliente: any;

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
    // Captura o ID da rota
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    // Faz a solicitação GET à API para obter os detalhes do cliente
    this.httpClient.get<any>(config.apiUrl + '/obter/' + id)
      .subscribe({
        next: (data) => {
          this.cliente = data; // Salva os detalhes do cliente no atributo cliente
          console.log(this.cliente);
        },
        error: (error) => {
          console.log('Erro ao obter os detalhes do cliente:', error);
        }
      });
  }
}
