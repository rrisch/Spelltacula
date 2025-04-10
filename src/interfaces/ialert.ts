import type {alertType} from "../constants/alert-type.ts";

export interface iAlert {
    alertType: alertType;
    title: string;
    details: string;
    duration: number;
    icon: string;
}