import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

const API_URL: string = 'https://fragrant-heady-globe.glitch.me';

@Injectable({
    providedIn: 'root'
})
export class DataBaseService {

    constructor(private http: HttpClient) {
    }

    getRivers() {
        return this.http.get(API_URL + '/rivers');
    }

    addNewRiver(body: any) {
        return this.http.post(API_URL + '/rivers', body)
    }

    deleteRiver(id: number) {
        return this.http.delete(API_URL + '/rivers/' + id)
    }

    saveResults(id: number, body: any) {
        return this.http.put(API_URL + '/rivers/' + id, body)
    }
}


