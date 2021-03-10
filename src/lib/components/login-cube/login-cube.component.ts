import { Component, OnInit } from '@angular/core';
import { LoginCubeService } from './login-cube.service';
import { MohTranslateService } from "../../services/translate/moh-translate.service";

@Component({
  selector: 'aad-login-cube',
  templateUrl: './login-cube.component.html',
  styleUrls: ['./login-cube.component.scss']
})
export class AADLoginCubeComponent implements OnInit {

  userName: string;
  constructor(private loginCubeService: LoginCubeService, public translate: MohTranslateService) { }

  ngOnInit() {
    this.loginCubeService.getUserName().subscribe(response => {
      console.log("name:", response. name);
      this.userName = response.name;
    });
  }

}
