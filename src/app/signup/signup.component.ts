import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  msg:string;
  regObj:object;

  constructor(private http: Http) { }

  register=function(e) {
    e.preventDefault();
    console.log(e);
   var email=e.target.elements[0].value;
   var role=e.target.elements[1].value;
   var pass1=e.target.elements[2].value;
   var pass2=e.target.elements[3].value;
    //this.model.pwd=e.target.elements[1].value;
    console.log(email);
    console.log(role);
    console.log(pass1);
    console.log(pass2);
    if(pass1==pass2){

      this.regObj={
        "email":email,
        "role":role,
        "pass1":pass1,
      };
      this.http.post('http://localhost:3000/display/register', this.regObj)
        .subscribe((res:Response) =>{
          console.log(res);
          var temp=res['_body'];
          console.log(temp);
          if(temp=true){
            this.msg="Account created successfully. You can now login";
          }
          else{
            this.msg="Please try again";
          }
    });
  }
  }
  ngOnInit() {
  }

}
