import { Injectable } from '@angular/core';
import { config } from "../dotenv/config";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private cfg = config;

    getConfig() {
        return this.cfg;
    }
}