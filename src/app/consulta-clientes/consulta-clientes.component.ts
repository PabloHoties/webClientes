import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { appConfig } from '../app.config';
import { config } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConsultaEnderecosComponent } from '../consulta-enderecos/consulta-enderecos.component';

@Component({
  selector: 'app-consulta-clientes',
  standalone: true,
  imports: [CommonModule, ConsultaEnderecosComponent],
  templateUrl: './consulta-clientes.component.html',
  styleUrl: './consulta-clientes.component.css'
})
export class ConsultaClientesComponent implements OnInit {

  clientes: any[] = [];
  mensagem: string = '';
  enderecoVisivel: boolean = false;


  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.httpClient.get(config.apiUrl + '/consultar')
      .subscribe({
        next: (data) => {
          this.clientes = data as any[];
        },
        error: (e) => {
          console.log(e.error);
        }
      });
  }

  onDelete(id: string): void {

    if (confirm('Deseja realmente excluir o cliente selecionado?')) {

      this.httpClient.delete(config.apiUrl + "/deletar/" + id,
        { responseType: 'text' }
      ).subscribe({
        next: (data) => {
          this.mensagem = 'Cliente excluído com sucesso.';
          this.ngOnInit();
        },
        error: (e) => {
          console.log(e.error);
        }
      })
    }
  }

  onEdit(id: string): void {
    this.router.navigate(['/clientes-edicao', id]);
  }

  exibirEndereco(id: string) {
    this.router.navigate(['/consulta-enderecos', id]);
  }
}
