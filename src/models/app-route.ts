import type {Component } from "vue";
import type {routeNames} from "../constants/current-features.ts";

export  class appRoute{
    route: routeNames;
    name:string ="";
    description:string="";
    url:string="";
    component:Component;

    constructor(route:routeNames,name:string,description:string,url:string,component:Component) {
        if(!this.isValid(name,description,url,component)){
            throw new Error(`Arguments for the "${name}" route are invalid`);
        }

        this.route=route;
        this.name=name;
        this.description=description;
        this.url=url;
        this.component=component;
    }

    private isValid(name:string,description:string,url:string,component:Component):boolean{
        if (!name || name.length == 0) return false;
        if (!description || description.length == 0) return false;
        if (!url || url.length == 0) return false;
        return component != undefined;

    }

}