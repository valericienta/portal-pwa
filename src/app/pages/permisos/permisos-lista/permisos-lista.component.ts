import { Component, OnInit } from '@angular/core';
import { Permiso } from 'src/app/interfaces/permiso.interface';
import { PermisosService } from 'src/app/services/permisos.service';

@Component({
  selector: 'app-permisos-lista',
  templateUrl: './permisos-lista.component.html',
  styleUrls: ['./permisos-lista.component.scss'],
})


export class PermisosListaComponent implements OnInit {

  permisos: Permiso[] = [];
  constructor(public permisosService: PermisosService) {
    this.permisos=[]
  }

  ngOnInit() {
    this.permisosService.getPermisos().then((data: Permiso[]) => {
      this.permisos = data
    })
  }

  public getPermisos() {
    this.permisosService.getPermisos().then((data: Permiso[]) => {
      this.permisos = data
    })
  }


  eliminarPermiso(id: any) {
    this.permisosService.eliminar(id)
      .then(() => {
        this.getPermisos();
      })
      .catch((error: any) => { console.log(error) })
  }

}
