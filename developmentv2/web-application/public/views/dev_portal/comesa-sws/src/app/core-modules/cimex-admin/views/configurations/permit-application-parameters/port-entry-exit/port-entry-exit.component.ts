import { Component } from '@angular/core';

@Component({
  selector: 'app-port-entry-exit',
  templateUrl: './port-entry-exit.component.html',
  styleUrl: './port-entry-exit.component.css'
})
export class PortEntryExitComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_entryexit_port';
    this.parameter_name = "entry_exit_port";
  }
}
