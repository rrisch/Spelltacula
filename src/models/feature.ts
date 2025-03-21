export default class feature {
    title: string;
    description: string;
    iconClass: string;
    actionText: string;
    route?:string;

    constructor(title: string, description: string, iconClass: string, actionText: string,route?:string) {
        this.title = title;
        this.description = description;
        this.iconClass = iconClass;
        this.actionText = actionText;
        this.route=route;
    }

}

