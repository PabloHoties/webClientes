import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConsultaClientesComponent } from './consulta-clientes/consulta-clientes.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConsultaClientesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = "webClientes"
}
