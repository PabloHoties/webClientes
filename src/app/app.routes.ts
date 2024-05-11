import { Routes } from '@angular/router';
import { CadastroClientesComponent } from './cadastro-clientes/cadastro-clientes.component';
import { ConsultaClientesComponent } from './consulta-clientes/consulta-clientes.component';
import { EdicaoClientesComponent } from './edicao-clientes/edicao-clientes.component';
import { ConsultaEnderecosComponent } from './consulta-enderecos/consulta-enderecos.component';

export const routes: Routes = [
    {
        path: 'clientes-cadastro',
        component: CadastroClientesComponent
    },
    {
        path: 'clientes-consulta',
        component: ConsultaClientesComponent
    },
    {
        path: 'clientes-edicao/:id',
        component: EdicaoClientesComponent
    },
    {
        path: 'consulta-enderecos/:id',
        component: ConsultaEnderecosComponent
    }
];
