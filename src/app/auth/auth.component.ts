import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoading = false;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.isLoading = true;
    this.authService.login(form.value.username, form.value.password).subscribe(
      ()=>{
        this.isLoading = false;
        this.router.navigate(['/products'])
      }
    );
  }

}
