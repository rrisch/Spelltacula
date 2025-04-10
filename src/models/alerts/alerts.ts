import type {iAlert} from "../../interfaces/ialert.ts";
import {alertType} from "../../constants/alert-type.ts";

export class infoAlert implements iAlert {
    alertType: alertType = alertType.Information;
    details: string = "";
    duration: number = 5;
    icon: string = "info";
    title: string = "";

    constructor(title: string, details: string) {
        this.title = title;
        this.details = details;
    }
}

export class successAlert implements iAlert {
    alertType: alertType = alertType.Success;
    details: string = "";
    duration: number = 5;
    icon: string = "check";
    title: string = "";

    constructor(title: string, details: string) {
        this.title = title;
        this.details = details;
    }
}

export class errorAlert implements iAlert {
    alertType: alertType = alertType.Error;
    details: string = "";
    duration: number = 10;
    icon: string = "exclamation";
    title: string = "";

    constructor(title: string, details: string) {
        this.title = title;
        this.details = details;
    }
}
