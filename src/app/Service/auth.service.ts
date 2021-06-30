
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  entrar(userLogin: UserLogin): Observable<UserLogin>{
    //return this.http.post<UserLogin>('https://backendthiagofaccipieri.herokuapp.com/usuarios/logar', userLogin)
    return this.http.post<UserLogin>('https://gmmsbp.herokuapp.com/usuarios/logar', userLogin)
  }

  cadastrar(user: User): Observable<User>{
    return this.http.post<User>('https://gmmsbp.herokuapp.com/usuarios/cadastrar', user)
   //return this.http.post<User>('https://backendthiagofaccipieri.herokuapp.com/usuarios/cadastrar',user)

  }

  logado(){
    let ok: boolean = false

    if(environment.token != ''){
      ok = true 
    }

    return ok
  }
}
