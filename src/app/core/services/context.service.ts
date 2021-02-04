import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { APIConfig } from "src/app/configurations/api.config";
import { HTTPService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class ContextService {
  constructor(private http: HTTPService) {}
  getAllContext(page,size) {
    const dataURL = environment.baseAPI + APIConfig.API.getAllContext+'?page='+page+'&size='+size;
    return this.http.httpGet(dataURL);
  }

  getAllContextGroups(page,size) {
    const dataURL = environment.baseAPI + APIConfig.API.getAllContextGroups+'?page='+page+'&size='+size;
      return this.http.httpGet(dataURL);
  }

  getAllContextGroupsForDropdown(){
    const dataURL = environment.baseAPI + APIConfig.API.getAllContextGroupsForDropdown;
    return this.http.httpGet(dataURL);
  }

  checkContextValue(contextId,value){
    const dataURL = environment.baseAPI + APIConfig.API.checkContextValue+contextId+'/'+value;
    return this.http.httpGet(dataURL);
  }

  checkContextName(name,groupId?){
    console.log('---groupId--',groupId);
    const dataURL = environment.baseAPI+APIConfig.API.checkContextName+groupId+'/'+name;
    // const dataURL = environment.baseAPI+APIConfig.API.checkContextName+name;
    return this.http.httpGet(dataURL);
  }

  createContext(payload) {
    const dataURL = environment.baseAPI + APIConfig.API.createContext;
    return this.http.httpPost(dataURL, payload);
  }

  getContextById(contextId) {
    const dataURL =
      environment.baseAPI + APIConfig.API.getContextById + contextId;
    return this.http.httpGet(dataURL);
  }

  updateContext(payload){
    const dataURL = environment.baseAPI +APIConfig.API.updateContext;
    return this.http.httpPut(dataURL,payload);
  }

  updateContextValue(payload){
    const dataURL = environment.baseAPI + APIConfig.API.updateContextValue;
    return this.http.httpPut(dataURL,payload);
  }

  deleteContextValue(id:string){
    const dataURL = environment.baseAPI + APIConfig.API.deleteContextValue+id;
    return this.http.httpDelete(dataURL);
  }

  deleteContext(id:string){
    const dataURL = environment.baseAPI +APIConfig.API.deleteContext+id;
    return this.http.httpDelete(dataURL);
  }

  getContextForHierarchy(){
    const dataURL = environment.baseAPI+APIConfig.API.getContextForHierarchy;
    return this.http.httpGet(dataURL);
  } 
  getContextForHierarchyByGroupId(groupId,contextId){
    const dataURL = environment.baseAPI +APIConfig.API.getContextForHierarchyByGroupId+groupId+'/'+contextId;
    return this.http.httpGet(dataURL);
  }

  getContextValueForHierarchy(contextId){
    const dataURL = environment.baseAPI + APIConfig.API.getContextValueForHierarchy+contextId;
    return this.http.httpGet(dataURL);
  }

  getContextValueForHierarchyExceptSelected(contextId,valueId){
    const dataURL = environment.baseAPI + APIConfig.API.getContextValueForHierarchyExceptSelected+contextId+'/'+valueId;
    return this.http.httpGet(dataURL);
  }

  getContextValueById(contextId,page,size){
    const dataURL = environment.baseAPI + APIConfig.API.getContextValueById+contextId+'?page='+page+'&size='+size;
    return this.http.httpGet(dataURL);
  }
  getContextValueByIdUnpaged(contextId){
    const dataURL = environment.baseAPI + APIConfig.API.getContextValueByIdUnpaged+contextId;
    return this.http.httpGet(dataURL);
  }

  getContextWithChild(page,size){
    const dataURL = environment.baseAPI +APIConfig.API.getContextWithChild+'?page='+page+'&size='+size;
    return this.http.httpGet(dataURL);
  }

  searchContextWithChild(name,page,size){
    const dataURL = environment.baseAPI + APIConfig.API.searchContextWithChild+name+'?page='+page+'&size='+size;
    return this.http.httpGet(dataURL);
  }

  searchContext(page,size,contextName){
    const dataURL = environment.baseAPI + APIConfig.API.searchContext+contextName+'?page='+page+'&size='+size;
    return this.http.httpGet(dataURL);
  }

  getContextValueForEdit(id){
    const dataURL = environment.baseAPI + APIConfig.API.getContextValueForEdit+id;
    return this.http.httpGet(dataURL);
  }

  getChildContextValuesForParent(contextId,parentId){
    const dataURL = environment.baseAPI + APIConfig.API.getChildContextValuesForParent+contextId+'/'+parentId;
    return this.http.httpGet(dataURL);
  }

  createContextGroup(payload){
    const dataURL =environment.baseAPI + APIConfig.API.createContextGroup;
    return this.http.httpPost(dataURL,payload);
  }

  getContextGroupById(id){
    const dataURL =environment.baseAPI + APIConfig.API.getContextGroupById+id;
    return this.http.httpGet(dataURL);
  }

  updateContextGroup(payload){
    const dataURL =environment.baseAPI + APIConfig.API.updateContextGroup;
    return this.http.httpPut(dataURL,payload);
  }

  deleteContextGroup(id){
    const dataURL =environment.baseAPI + APIConfig.API.deleteContextGroup+id;
    return this.http.httpDelete(dataURL);
  }

  checkContextGroupName(name){
    const dataURL =environment.baseAPI + APIConfig.API.checkContextGroupName+name;
    return this.http.httpGet(dataURL);
  }
  searchContextGroupName(page,size,name){
    const dataURL =environment.baseAPI + APIConfig.API.searchContextGroupName+name+'?page='+page+'&size='+size;
    return this.http.httpGet(dataURL);
  }

  getContextDescription(id){
    const dataURL =environment.baseAPI + APIConfig.API.getContextDescription+id;
    return this.http.httpGet(dataURL);
  }
}
