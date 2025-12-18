import { Identifier, Resource } from '../../types/fhir-types';
import BaseResource from '../baseResource';

// Note: Using any[] for mixin constructor is a TypeScript limitation
// See: https://www.typescriptlang.org/docs/handbook/mixins.html
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = {}> = new (...args: any[]) => T;

export interface IdentifierMixinInterface {
  data: Resource & { identifier?: Identifier[] };
  addIdentifier(system: string, value: string): void;
}

export function IdentifierMixin<TBase extends Constructor<BaseResource>>(Base: TBase) {
  return class extends Base implements IdentifierMixinInterface {
    public data!: Resource & { identifier?: Identifier[] };
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args);
      // Initialize identifier array in the data
      if (!this.data.identifier) {
        this.data.identifier = [];
      }
    }

    /**
     * Sets the identifier for the resource.
     * @param system - The system of the identifier.
     * @param value - The value of the identifier.
     */
    addIdentifier(system: string, value: string): void {
      if (typeof system !== "string" || typeof value !== "string") {
        throw new Error("Identifier system and value must be non-empty strings.");
      }
      if (!this.data.identifier) {
        this.data.identifier = [];
      }
      this.data.identifier.push({ system, value });
    }
  };
}
