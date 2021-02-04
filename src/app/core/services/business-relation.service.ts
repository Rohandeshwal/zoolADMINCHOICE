import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { APIConfig } from 'src/app/configurations/api.config';
import { HTTPService } from './http.service';

@Injectable({
    providedIn: 'root'
})

export class BusinessRelationService {
    constructor(private http: HTTPService) { }

    // Get All Business Components Relation
    getAllRelationType(page, size) {
        const dataURL = environment.baseAPI + APIConfig.API.getAllRelationType + '?page=' + page + '&size=' + size;
        // const dataURL = environment.baseAPI + APIConfig.API.getAllRelationType;
        return this.http.httpGet(dataURL);
    }
    // Get All Business Components Relation
    getAllBusinessRelationType() {
        const dataURL = environment.baseAPI + APIConfig.API.getAllRelationType;
        return this.http.httpGet(dataURL);
    }

    createRelationType(payload) {
        const dataURL = environment.baseAPI + APIConfig.API.createRelationType;
        return this.http.httpPost(dataURL, payload);
    }

    updateRelationType(payload) {
        const dataURL = environment.baseAPI + APIConfig.API.updateRelationType;
        return this.http.httpPut(dataURL, payload);
    }

    deleteRelationType(id) {
        const dataURL = environment.baseAPI + APIConfig.API.deleteRelationType + id;
        return this.http.httpDelete(dataURL);
    }

    getRelationTypeById(id) {
        const dataURL = environment.baseAPI + APIConfig.API.getRelationTypeById + id;
        return this.http.httpGet(dataURL);
    }
    searchRelationType(relationName) {
        const dataURL = environment.baseAPI + APIConfig.API.searchRelationType + relationName;
        return this.http.httpGet(dataURL);
    }

    getModulesForBusinessComponents(id) {
        const dataURL = environment.baseAPI + APIConfig.API.getModulesForBusinessComponents + id;
        return this.http.httpGet(dataURL);
    }
    getChildForBusinessComponents(id) {
        const dataURL = environment.baseAPI + APIConfig.API.getChildForBusinessComponents + id;
        return this.http.httpGet(dataURL);
    }

    createBusinessComponentRelation(payload) {
        const dataURL = environment.baseAPI + APIConfig.API.createBusinessComponentRelation;
        return this.http.httpPost(dataURL, payload);
    }
    getAllBusinessComponentRelation() {
        const dataURL = environment.baseAPI + APIConfig.API.getAllBusinessComponentRelation;
        return this.http.httpGet(dataURL);
    }
    // Get All Business Relation  Data  
    getAllBusinessRelation(page, size) {
        const dataURL = environment.baseAPI + APIConfig.API.getAllBusinessRelation + '?page=' + page + '&size=' + size;
        return this.http.httpGet(dataURL);
    }
    // search Business Relation  Data  
    searchBusinessRelation(name) {
        const dataURL = environment.baseAPI + APIConfig.API.searchBusinessRelation + name;
        return this.http.httpGet(dataURL);
    }
    // delete Business Relation  Data  
    deleteBusinessRelation(id) {
        const dataURL = environment.baseAPI + APIConfig.API.deleteBusinessRelation + id;
        return this.http.httpDelete(dataURL);
    }
}