import testTemplate from "../models/templates/test-template.ts"
import {browserStorageKeys} from "../constants/browser-storage-keys.ts";

export class TestTemplateStorageUtility {

    public static findTestTemplate(id: string, storageObj?: Storage): testTemplate | undefined {
        return this.getTestTemplates(storageObj).find(x => x.id === id);
    }

    private static getTestTemplates(storageObj?: Storage): testTemplate[] {
        const templates = (storageObj ? storageObj : localStorage).getItem(browserStorageKeys.templateKey);

        if (!templates) return [];

        return JSON.parse(templates);
    }

    private static setTestTemplates(testTemplates: testTemplate[], storageProvider?: Storage): boolean {
        (storageProvider ? storageProvider.persistance : localStorage).setItem(browserStorageKeys.templateKey, JSON.stringify(testTemplates));

        return this.getTestTemplates(storageProvider) === testTemplates;
    }

    public static insertTestTemplate(template: testTemplate, storageObj?: Storage): testTemplate | undefined {
        let updatedTemplates = this.getTestTemplates(storageObj);

        updatedTemplates.push(template);

        if (this.setTestTemplates(updatedTemplates)) return template;

        return undefined;
    }

    public static updateTestTemplate(template: testTemplate, storageObj?: Storage): testTemplate | undefined {
        let existingTemplate = this.findTestTemplate(template.id, storageObj);

        if (existingTemplate) return undefined;

        const currentTemplates: testTemplate[] = this.getTestTemplates(storageObj);
        const index = existingTemplate ? currentTemplates.indexOf(existingTemplate) : -1;

        if (index > -1) {
            currentTemplates[index] = template;
            if (this.setTestTemplates(currentTemplates, storageObj)) return template;
        }
        return undefined;
    }

    public static deleteTestTemplate(id: string, storageObj?: Storage): boolean {
        if (id.length == 0) return false;

        let existingTemplate = this.findTestTemplate(id, storageObj);
        const currentTemplates: testTemplate[] = this.getTestTemplates(storageObj);
        const index = existingTemplate ? currentTemplates.indexOf(existingTemplate) : -1;

        if (index > -1) {
            currentTemplates.splice(index, 1);
            if (this.setTestTemplates(currentTemplates, storageObj)) return true;
        }
        return false;
    }
}
