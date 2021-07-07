import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
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
  
  listaTemas: Tema[]
  idTema: number
  tema: Tema = new Tema()

  user: User = new User()
  idUser = environment.id

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token == ''){
      alert('Sua seção expirou, faça o login novamente.')
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
    alert('Postagem feita com sucesso!!')
    this.postagem = new Postagem
    this.getAllPostagens()
  })

}

findByIdTema(){
  this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
    this.tema=resp
  })
}
}
