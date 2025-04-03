// noinspection SpellCheckingInspection

export class classHelpers {
    public static generateUUID(): string { // Public Domain/MIT
        let d = new Date().getTime();//Timestamp
        let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16;//random number between 0 and 16
            if (d > 0) {//Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    public static isDeepEqual(objA:any,objB:any):boolean{
        if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null){
            return objA === objB;
        }

        let objAKeys:string[] =Object.keys(objA);
        let objBKeys:string[] = Object.keys(objB);

        if (objAKeys.length !== objBKeys.length) return false;

        objAKeys.forEach((aKey:string) =>{
            if (!objB.hasOwnProperty(aKey) || this.isDeepEqual(objA[aKey],objB[aKey])) return false;
        });

        return true;
    }
}
