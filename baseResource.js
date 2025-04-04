import resources from "./src/constants/allowedResources.js";

export default class BaseResource {
    constructor(resourceType, id) {
        if (!resources.has(resourceType)) {
            throw new Error(`Invalid resourceType: ${resourceType}. Must be one of: ${[...ALLOWED_RESOURCES].join(", ")}`);
        }
        this.resourceType = resourceType;
        this.data = { resourceType };
        this.addData({ id: id || undefined });
    }

    addData(data) {
        Object.assign(this.data, data);
    }

    serialize() {
        return BaseResource._clean(this.data);
    }

    static _clean(data) {
        if (Array.isArray(data)) {
            return data.map(BaseResource._clean)
                .filter(item => Boolean(item) && !(typeof item === 'object' && Object.keys(item).length === 0));
        } else if (typeof data === 'object' && data !== null) {
            let cleanedObj = Object.fromEntries(
                Object.entries(data)
                    .map(([key, value]) => [key, BaseResource._clean(value)])
                    .filter(([_, value]) => Boolean(value) && !(typeof value === 'object' && Object.keys(value).length === 0))
            );
            return Object.keys(cleanedObj).length ? cleanedObj : null;
        }
        return data;
    }
}
