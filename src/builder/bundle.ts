import { ALLOWED_RESOURCES } from './constants/allowedResources';
import { Bundle as FHIRBundle, BundleType, Resource } from '../types/fhir-types';
import BaseResource from './baseResource';

export default class Bundle {
  private bundle: FHIRBundle;

  constructor(type: BundleType = "collection") {
    this.bundle = {
      resourceType: "Bundle",
      type,
      entry: [] // Always initialize entry array
    };
  }

  addResource(resourceInstance: BaseResource): void {
    const cleanResource = resourceInstance.serialize();
    if (!ALLOWED_RESOURCES.has(cleanResource.resourceType)) {
      throw new Error(
        `Invalid resourceType: ${cleanResource.resourceType}. Must be one of: ${Array.from(ALLOWED_RESOURCES).join(", ")}`
      );
    }
    // Non-null assertion is safe because we always initialize entry in constructor
    this.bundle.entry!.push({ resource: cleanResource });
  }

  getBundle(): FHIRBundle {
    return this.bundle;
  }
}
