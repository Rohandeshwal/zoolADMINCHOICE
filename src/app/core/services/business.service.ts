import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { APIConfig } from 'src/app/configurations/api.config';
import { HTTPService } from './http.service';

@Injectable({
    providedIn: 'root'
})

export class BusinessService {
    constructor(private http: HTTPService) { }

    // Get All Business Components Data
    getAllBusinessComponents(page, size) {
        const dataURL = environment.baseAPI + APIConfig.API.getAllBusinessComponents + '?page=' + page + '&size=' + size;
        return this.http.httpGet(dataURL);
    }

    createBusinessComponent(payload) {
        const dataURL = environment.baseAPI + APIConfig.API.createBusinessComponent;
        return this.http.httpPost(dataURL, payload);
    }

    getBusinessComponent(businessComponentId) {
        const dataURL = environment.baseAPI + APIConfig.API.getBusinessComponent + businessComponentId;
        return this.http.httpGet(dataURL);
    }

    updateBusinessComponent(payload) {
        const dataURL = environment.baseAPI + APIConfig.API.updateBusinessComponent;
        return this.http.httpPut(dataURL, payload);
    }

    deleteBusinessComponent(id) {
        const dataURL = environment.baseAPI + APIConfig.API.deleteBusinessComponent + id;
        return this.http.httpDelete(dataURL);
    }
    getHierarchiesForBusinessComponent() {
        const dataURL = environment.baseAPI + APIConfig.API.getHierarchiesForBusinessComponent;
        return this.http.httpGet(dataURL);
    }
    getLeastModulesForBusinessComponent(relationId, businessId) {
        const dataURL = environment.baseAPI + APIConfig.API.getLeastModulesForBusinessComponent + relationId + '/' + businessId;
        return this.http.httpGet(dataURL);
    }

    checkBusinessComponent(businessComponentName) {
        const dataURL = environment.baseAPI + APIConfig.API.checkBusinessComponent + businessComponentName;
        return this.http.httpGet(dataURL);
    }

    createHierarchyRelations(payload) {
        const dataURL = environment.baseAPI + APIConfig.API.createHierarchyRelations;
        return this.http.httpPost(dataURL, payload);
    }
    searchBusinessComponent(businessComponentName) {
        const dataURL = environment.baseAPI + APIConfig.API.searchBusinessComponent + businessComponentName;
        return this.http.httpGet(dataURL);
    }
    addBulkBusinessComponents(payload) {
        const dataURL = environment.baseAPI + APIConfig.API.addBulkBusinessComponents;
        return this.http.httpPut(dataURL, payload);
    }
    getBusinessComponentsDescription(id) {
        const dataURL = environment.baseAPI + APIConfig.API.getBusinessComponentsDescription + id;
        return this.http.httpGet(dataURL);
    }
}