import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class SiteService {
    private base = 'https://wt-021b7f362991cec68dd62033c2455e46-0.sandbox.auth0-extend.com/uptime-manage';

    constructor(private http: HttpClient) {

    }

    add(site) {
        return this.http.get(`${this.base}/add?site=${site}`);
    }

    list() {
        return this.http.get(`${this.base}/list`);
    }

    stats(key) {
        return this.http.get(`${this.base}/stats/${key}`);
    }
}