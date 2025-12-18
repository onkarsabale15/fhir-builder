import { CodeableConcept as FHIRCodeableConcept, Coding } from '../../types/fhir-types';

export default class CodeableConcept implements FHIRCodeableConcept {
  coding?: Coding[];
  text?: string;

  /**
   * Creates a CodeableConcept
   * @param coding - The coding array
   * @param text - Optional human-readable text
   */
  constructor(coding: Coding[] = [], text: string = "") {
    if (!Array.isArray(coding)) {
      throw new Error("Coding must be an array.");
    }
    this.coding = coding;
    this.text = text;
  }
}
