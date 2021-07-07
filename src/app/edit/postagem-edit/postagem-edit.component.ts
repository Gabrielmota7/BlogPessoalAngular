import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { PostagemService } from 'src/app/Service/postagem.service';
import { TemaService } from 'src/app/Service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem()

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number





  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private prostagemService: PostagemService,
    private temaService: TemaService
  ) { }

  ngOnInit() {

    window.scroll(0,0)


    if(environment.token == ''){
      alert('Sua seção expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
  }

  let id= this.route.snapshot.params['id']
  this.findByIdPostagem(id)
  this.getAllTema()
  }

  findByIdPostagem(id: number){
    this.prostagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })

   
  }

findByIdTema(){
  this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
    this.tema = resp
  })
}

getAllTema(){
  this.temaService.getAllTema().subscribe((resp: Tema[]) => {
    this.listaTemas = resp
  })
}



  atualizar(){
      this.tema.id = this.idTema
      this.postagem.tema = this.tema


      this.prostagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
        this.postagem = resp
        alert('Postagem atualizada atualizada com sucesso')
        this.router.navigate(['/inicio'])
      })
  }
}
