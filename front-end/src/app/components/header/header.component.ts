import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  mensagem: string = '';

  ngOnInit() {
    const hora = new Date().getHours();

    if (hora >= 6 && hora < 12) {
      this.mensagem = "Bom dia";
    } else if (hora >= 12 && hora < 19) {
      this.mensagem = "Boa tarde";
    } else {
      this.mensagem = "Boa noite";
    }
  }
}
