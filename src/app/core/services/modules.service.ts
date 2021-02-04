import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HTTPService } from './http.service';
import { APIConfig } from 'src/app/configurations/api.config';
import { environment } from 'src/environments/environment';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  constructor(private http: HTTPService) {

  }
  createModule(payload) {
    const dataURL = environment.baseAPI + APIConfig.API.createModule;
    return this.http.httpPost(dataURL, payload);
  }
  updateModule(payload) {
    const dataURL = environment.baseAPI + APIConfig.API.updateModule;
    return this.http.httpPut(dataURL, payload);
  }
  deleteModule(id) {
    const dataURL = environment.baseAPI + APIConfig.API.deleteModule + id;
    return this.http.httpDelete(dataURL);
  }

  getAllModule(page, size) {
    const dataURL = environment.baseAPI + APIConfig.API.getAllModules + '?page=' + page + '&size=' + size;
    return this.http.httpGet(dataURL);
  }
  getModule(moduleId) {
    const dataURL = environment.baseAPI + APIConfig.API.getModule + moduleId;
    return this.http.httpGet(dataURL);
  }
  checkModule(moduleName) {
    const dataURL = environment.baseAPI + APIConfig.API.checkModule + moduleName;
    return this.http.httpGet(dataURL);
  }

  createHierarchy(payload) {
    const dataURL = environment.baseAPI + APIConfig.API.createHierarchy;
    return this.http.httpPost(dataURL, payload);
  }

  getHierarchies(page, size) {
    const dataURL = environment.baseAPI + APIConfig.API.getHierarchies;
    // const dataURL = environment.baseAPI + APIConfig.API.getHierarchies+'?page='+page+'&size='+size;
    return this.http.httpGet(dataURL);
  }
  getHierarchyByID(hierarchyId) {
    const dataURL = environment.baseAPI + APIConfig.API.getHierarchyByID + hierarchyId;
    return this.http.httpGet(dataURL);
  }
  updateModuleHierarchy(hierarchy) {
    const dataURL = environment.baseAPI + APIConfig.API.updateModuleHierarchy;
    return this.http.httpPut(dataURL, hierarchy);
  }

  deleteHierarchy(id) {
    const dataURL = environment.baseAPI + APIConfig.API.deleteHierarchy + id;
    return this.http.httpDelete(dataURL);
  }

  searchModule(moduleName) {
    const dataURL = environment.baseAPI + APIConfig.API.searchModule + moduleName;
    return this.http.httpGet(dataURL);
  }
  getModuleToCreateHierarchy() {
    const dataURL = environment.baseAPI + APIConfig.API.getModuleToCreateHierarchy;
    return this.http.httpGet(dataURL);
  }
  searchModuleToCreateHierarchy(moduleName) {
    const dataURL = environment.baseAPI + APIConfig.API.searchModuleToCreateHierarchy + moduleName;
    return this.http.httpGet(dataURL);
  }
  getModuleToCreateHierarchyRelation(relationId) {
    const dataURL = environment.baseAPI + APIConfig.API.getModuleToCreateHierarchyRelation + relationId;
    return this.http.httpGet(dataURL);
  }
  searchModuleToCreateHierarchyRelation(moduleName, relationId) {
    const dataURL = environment.baseAPI + APIConfig.API.searchModuleToCreateHierarchyRelation + moduleName + '/' + relationId;
    return this.http.httpGet(dataURL);
  }
  deleteHierarchyRelation(relationId) {
    const dataURL = environment.baseAPI + APIConfig.API.deleteHierarchyRelation + relationId;
    return this.http.httpDelete(dataURL);
  }
  searchHierarchies(hierarchName) {
    const dataURL = environment.baseAPI + APIConfig.API.searchHierarchies + hierarchName;
    return this.http.httpGet(dataURL);
  }

  checkTopLevelModule(moduleId) {
    const dataURL = environment.baseAPI + APIConfig.API.checkTopLevelModule + moduleId;
    return this.http.httpGet(dataURL);
  }
  getModuleDescription(moduleId) {
    const dataURL = environment.baseAPI + APIConfig.API.getModuleDescription + moduleId;
    return this.http.httpGet(dataURL);
  }
}
