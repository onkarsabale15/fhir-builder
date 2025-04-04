import resources from "./src/constants/allowedResources.js";
export default class Bundle {
    constructor() {
        this.bundle = {
            resourceType: "Bundle",
            type: "collection",
            entry: []
        };
    }

    addResource(resourceInstance) {
        const cleanResource = resourceInstance.serialize();
        if (!resources.has(cleanResource.resourceType)) {
            throw new Error(`Invalid resourceType: ${cleanResource.resourceType}. Must be one of: ${[...resources].join(", ")}`);
        }
        this.bundle.entry.push({ resource: resourceInstance.serialize() });
    }

    getBundle() {
        return this.bundle;
    }
}