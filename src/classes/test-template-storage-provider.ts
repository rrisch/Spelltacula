import testTemplate from "../models/templates/test-template.ts"
import {browserStorageKeys} from "../constants/browser-storage-keys.ts";
import {safeJsonParse} from "./safeJSONParser.ts";

export class TestTemplateStorageUtility {

    public static findTestTemplate(id: string, storageObj?: Storage): testTemplate | undefined {
        return this.getTestTemplates(storageObj).find(x => x.id === id);
    }

    private static getTestTemplates(storageObj?: Storage): testTemplate[] {
        const templates = (storageObj ? storageObj : localStorage).getItem(browserStorageKeys.templateKey);

        if (!templates) return [];

        let result = safeJsonParse<testTemplate[]>(templates);
        return result ? result : [];
    }

    private static setTestTemplates(testTemplates: testTemplate[], storageProvider?: Storage): boolean {
        (storageProvider ? storageProvider : localStorage).setItem(browserStorageKeys.templateKey, JSON.stringify(testTemplates));

        return this.getTestTemplates(storageProvider).length == testTemplates.length;
    }

    public static insertTestTemplate(template: testTemplate, storageObj?: Storage): testTemplate | undefined {
        let updatedTemplates = this.getTestTemplates(storageObj);

        updatedTemplates.push(template);

        if (this.setTestTemplates(updatedTemplates)) return template;

        return undefined;
    }

    public static updateTestTemplate(template: testTemplate, storageObj?: Storage): testTemplate | undefined {
        const currentTemplates: testTemplate[] = this.getTestTemplates(storageObj);
        const existing = currentTemplates.find(x => x.id === template.id);
        const index = existing ? currentTemplates.indexOf(existing) : -1;

        if (index > -1) {
            currentTemplates[index] = template;
            if (this.setTestTemplates(currentTemplates, storageObj)) return template;
        }
        return undefined;
    }

    public static deleteTestTemplate(id: string, storageObj?: Storage): boolean {
        if (id.length == 0) return false;

        const currentTemplates: testTemplate[] = this.getTestTemplates(storageObj);
        const existing = currentTemplates.find(x => x.id === id);
        const index = existing ? currentTemplates.indexOf(existing) : -1;

        if (index > -1) {
            currentTemplates.splice(index, 1);
            if (this.setTestTemplates(currentTemplates, storageObj)) return true;
        }
        return false;
    }
}
