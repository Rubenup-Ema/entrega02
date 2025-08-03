import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesLogin } from '../../shared/services/services.login';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {

    form!: FormGroup;
    procesando = false;
    constructor(private router:Router, private fb: FormBuilder, private _services: ServicesLogin, private snackBar: MatSnackBar) {

         this.form =  this.fb.group({

          username: new FormControl('', [Validators.required,  Validators.email]),
          password: new FormControl('', [Validators.required, Validators.minLength(5)])
      })

    }


    ngOnInit(): void {
      
      sessionStorage.setItem("user","");

    }

     onSubmit() {

      this.procesando = true;

      this._services.validarLogin(this.form.get("username")?.value,this.form.get("password")?.value).subscribe(

        (data:any) => {

          if (data.ok.toString()==="true") {

            const result = data.result[0];
            sessionStorage.setItem("user",result.name);
            this.router.navigate(['/home']);

          } else {
            this.procesando = false;
            this.messageBox(data.msg);

          }

        }

      )
    

    }


    messageBox(texto: string) {

    this.snackBar.open(texto + ' ✅', 'Cerrar', {
    duration: 3000, // ms
    verticalPosition: 'top',  // 'top' | 'bottom'
    horizontalPosition: 'right' // 'start' | 'center' | 'end' | 'left' | 'right'
    
    });

  }

}
