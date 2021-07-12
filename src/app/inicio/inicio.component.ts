import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertasService } from '../Service/alertas.service';
import { AuthService } from '../Service/auth.service';
import { PostagemService } from '../Service/postagem.service';
import { TemaService } from '../Service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tituloPost: string
  
  listaTemas: Tema[]
  idTema: number
  tema: Tema = new Tema()
  nomeTema: string

  user: User = new User()
  idUser = environment.id

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token == ''){
      this.alertas.showAlertInfo('Sua seção expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
  }
  this.findAllTemas()
  this.getAllPostagens()

}
findAllTemas(){
  this.temaService.getAllTema().subscribe((resp: Tema[]) => {
    this.listaTemas = resp
  })
}

getAllPostagens(){
  this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=> {
    this.listaPostagens = resp
  })
}

findByIdUser(){
  this.authService.getByIdUser(this.idUser).subscribe((resp: User)=> {
    this.user = resp
  })
}


publicar(){
  this.tema.id = this.idTema
  this.postagem.tema = this.tema

  this.user.id= this.idUser
  this.postagem.usuario = this.user

  this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=> {
    this.postagem = resp
    this.alertas.showAlertSuccess('Postagem feita com sucesso!!')
    this.postagem = new Postagem
    this.getAllPostagens()
  })

}

findByIdTema(){
  this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
    this.tema=resp
  })
}

findByTituloPostagem(){

  if(this.tituloPost == ''){
      this.getAllPostagens()

  }

  else{
    this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[]) =>{
      this.listaPostagens = resp
    }
    )
  }


  
}

findByNomeTema(){
  if(this.nomeTema == ''){
    this.findAllTemas()
  }

  else{
  this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[]) =>{
    this.listaTemas = resp
  })
}
}

}
