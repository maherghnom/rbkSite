import { Injectable } from '@angular/core';
import { Http , Headers } from '@angular/http';
import { FacebookService } from 'ngx-facebook';
import 'rxjs/add/operator/map';

@Injectable()
export class EAuthService {

  constructor(private http : Http , private fb : FacebookService) { }


    storeInLocalStorage(token,id,name){ //function to store data in the localStorage ...

      localStorage.setItem('id_token', token); //store the user token in the localStorage ... 
      localStorage.setItem('user-id', id); //store the user _id in the localStorage ... 
      localStorage.setItem('user-name', name); //store the user name in the localStorage ... 
    }

    eFacebookLogin(user){

    let headers = new Headers();
    headers.append('Content-Type','application/json'); //add the type of data to the header...
    return this.http.post('api/user/facebookLogin', user, {headers: headers})
    .map(res => res.json());

    }

    eFacebookSignup(user){

      let headers = new Headers();
      headers.append('Content-Type' , 'application/json'); 
      return this.http.post('api/user/facbookSignup',{user:user}, {headers:headers})
      .map(res => res.json()); 

    }
    
    logout(){

      localStorage.clear();
      this.fb.logout().then(() => console.log('Logged out!'));

    }


}
