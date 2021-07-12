import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { AlertasService } from '../Service/alertas.service';
import { AuthService } from '../Service/auth.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User ()
  confirmarSenha: string
  tipoUsuario: string
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value

  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value

  }
  cadastrar(){
    this.user.tipo = this.tipoUsuario

    if(this.user.senha != this.confirmarSenha){
        this.alertas.showAlertDanger('A senhas estão incorretas')
    } else {
      environment.id= this.user.id
        environment.tipo= this.user.tipo
        environment.nome= this.user.nome
        environment.senha= this.user.senha
        environment.foto= this.user.foto
        environment.usuario= this.user.usuario
        console.log(this.user)
       
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        
        this.router.navigate(['/entrar'])
        this.alertas.showAlertSuccess('Usúario cadastrado com sucesso')
      })


    }


  }

}
