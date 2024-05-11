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
