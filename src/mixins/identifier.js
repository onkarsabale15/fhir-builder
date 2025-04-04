export const IdentifierMixin = Base =>
    class extends Base {
        constructor(...args) {
            super(...args);
            this.data.identifier = [];
        }

        /**
         * Sets the identifier for the resource.
         * @param {string} system - The system of the identifier.
         * @param {string} value - The value of the identifier.
         */
        addIdentifier(system, value) {
            if (typeof system !== "string" || typeof value !== "string") {
                throw new Error("Identifier system and value must be non-empty strings.");
            }
            this.data.identifier.push({ system, value });
        }
    };
