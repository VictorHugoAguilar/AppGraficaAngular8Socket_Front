import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81], label: 'Ventas' },
    { data: [28, 48, 40, 19], label: 'Compras' }
  ];
  public lineChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril'];

  constructor(
    private http: HttpClient,
    public wsService: WebsocketService
  ) { }

  ngOnInit() {

    // obtenemos los datos desde un servicio rest
    this.getData();

    // escuchamos el socket
    this.escucharSocket();

    // setInterval(() => {
    //  const newData = [
    // Math.round(Math.random() * 100),
    // Math.round(Math.random() * 100),
    // Math.round(Math.random() * 100),
    // Math.round(Math.random() * 100)
    // ];
    // this.lineChartData = [{
    // data: newData,
    // label: 'Ventas'
    // }];
    // }, 3000);

  }


  getData() {

    this.http.get('http://localhost:5000/grafica').subscribe((data: any) => {
      // console.log(data)
      this.lineChartData = data;
    });

  }

  escucharSocket() {
    this.wsService.listen('cambio-grafica').subscribe((data: any) => {
      console.log('socket', data);
      this.lineChartData = data;
    });
  }

}
