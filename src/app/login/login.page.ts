import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UiService } from '../services/ui.service';
import { Router } from '@angular/router';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private auth: AuthService,
    private ui: UiService,
    private router: Router,
    private nativeAudio: NativeAudio) { }

  ngOnInit() {

  }

  public async loginGoogle() {
    this.ui.presentLoading();
    const r: boolean = await this.auth.loginGoogle();
    this.ui.hideLoading();
    if (r) {
      this.nativeAudio.preloadSimple('uniqueId1', '../assets/sounds/Glitch-02.mp3').then(

      );
      this.nativeAudio.play('uniqueId1', () => console.log('uniqueId1 is done playing'));
      setTimeout( () =>{
        this.router.navigate(['/tabs']);
      }, 3000);
      
    }
    //OCULTAR
  }
}
