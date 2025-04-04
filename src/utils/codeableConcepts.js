export default class CodeableConcept {
    /**
     * @param {Array<{ system: string, code: string, display?: string }>} coding - The coding array.
     * @param {string} [text] - Optional human-readable text.
     */
    constructor(coding = [], text = "") {
        if (!Array.isArray(coding)) {
            throw new Error("Coding must be an array.");
        }
        this.coding = coding;
        this.text = text;
    }
}
