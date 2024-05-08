import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { appConfig } from '../app.config';
import { config } from '../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consulta-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consulta-clientes.component.html',
  styleUrl: './consulta-clientes.component.css'
})
export class ConsultaClientesComponent implements OnInit {

  clientes: any[] = [];

  constructor(
    private httpClient: HttpClient
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

}
