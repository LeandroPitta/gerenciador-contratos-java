import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatButtonToggle } from '@angular/material/button-toggle';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements AfterViewInit {
  @ViewChild('btnInicio', { static: true }) btnInicio!: MatButtonToggle;

  ngAfterViewInit() {
    setTimeout(() => {
      this.btnInicio._buttonElement.nativeElement.click();
      this.btnInicio.checked = true;
    })
  }
}

