import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from "../models/project";
import { Global } from '../services/global';

@Injectable()
export class ProjectService{
  public url:string;

  constructor(
    private _http:HttpClient
  ){
    this.url = Global.url;
  }

  testService(){
    return "Probando el servicio Angular";
  }

  saveProject(project: Project): Observable<any>{
    let params = JSON.stringify(project);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+'save-project', params, {headers: headers});
  }

  getProjects(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'projects', {headers: headers});
  }

  getProject(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this._http.get(this.url+'project/'+id, {headers: headers});
  }
}