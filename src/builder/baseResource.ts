import { ALLOWED_RESOURCES } from './constants/allowedResources';
import { FHIRResourceType, Resource } from '../types/fhir-types';

export default class BaseResource {
  public data: Resource;

  constructor(resourceType: FHIRResourceType, id?: string) {
    if (!ALLOWED_RESOURCES.has(resourceType)) {
      throw new Error(
        `Invalid resourceType: ${resourceType}. Must be one of: ${Array.from(ALLOWED_RESOURCES).join(", ")}`
      );
    }
    this.data = { resourceType };
    if (id !== undefined) {
      this.data.id = id;
    }
  }

  public addData(data: Partial<Resource>): void {
    Object.assign(this.data, data);
  }

  serialize(): Resource {
    return BaseResource._clean(this.data) as Resource;
  }

  private static _clean<T>(data: T): T | null {
    if (Array.isArray(data)) {
      const cleaned = data
        .map(item => BaseResource._clean(item))
        .filter(item => {
          if (item === null || item === undefined) return false;
          if (typeof item === 'object' && Object.keys(item).length === 0) return false;
          return true;
        });
      return cleaned.length > 0 ? (cleaned as T) : null;
    } else if (typeof data === 'object' && data !== null) {
      const cleanedObj: Record<string, unknown> = {};
      
      for (const [key, value] of Object.entries(data)) {
        const cleanedValue = BaseResource._clean(value);
        if (cleanedValue !== null && cleanedValue !== undefined) {
          if (typeof cleanedValue !== 'object' || Object.keys(cleanedValue).length > 0) {
            cleanedObj[key] = cleanedValue;
          }
        }
      }
      
      return Object.keys(cleanedObj).length > 0 ? (cleanedObj as T) : null;
    }
    return data;
  }
}
