import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { PostagemService } from 'src/app/Service/postagem.service';
import { TemaService } from 'src/app/Service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPost: number
 
  


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

  this.idPost = this.route.snapshot.params['id']
  this.findByIdPostagem(this.idPost)
  
  }

  findByIdPostagem(id: number){
    this.prostagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })

   
  }





  apagar(){
      this.prostagemService.deletePostagem(this.idPost).subscribe(()=>{
        alert('postagem apagada com sucesso!')
        this.router.navigate(['/incio'])
      })
  }
}

