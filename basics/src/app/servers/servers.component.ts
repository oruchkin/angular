import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  // template: `
  //   <app-server></app-server>
  //   <app-server></app-server>
  //   <app-server></app-server>`,
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {
  allowNewServer = true;
  serverCreationStatus = 'No server was Created!';
  serverName = 'TestServer here';
  serverCreated = false;
  servers = ['Testserver', 'testserver 2']

  constructor() {
    setTimeout(() => {
      this.allowNewServer = false;
    }, 2000);
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server was Created! Name is ' + this.serverName;
  }

  onUpdateServerName(event: any){
    console.log(event)
    this.serverName = (<HTMLInputElement>event.target).value;
  }

}
