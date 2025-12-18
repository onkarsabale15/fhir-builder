import BaseResource from '../baseResource';
import CodeableConcept from '../utils/codeableConcepts';
import { IdentifierMixin } from '../mixins/identifier';
import {
  MedicationStatement as FHIRMedicationStatement,
  MedicationStatementStatus,
  Reference,
  Identifier
} from '../../types/fhir-types';

const ALLOWED_MEDICATION_STATUS: Set<MedicationStatementStatus> = new Set([
  "active",
  "completed",
  "entered-in-error",
  "intended",
  "stopped",
  "on-hold",
  "unknown"
]);

export default class MedicationStatement extends IdentifierMixin(BaseResource) {
  public data: FHIRMedicationStatement;

  constructor(id?: string) {
    super("MedicationStatement", id);
    this.data = {
      resourceType: "MedicationStatement",
      status: "active", // Default status
      subject: { reference: "" }, // Will be set by addSubject
      identifier: []
    };
  }

  /**
   * Sets the status of the resource.
   * @param status - The status to set.
   * @throws Error if the status is not allowed.
   */
  setStatus(status: MedicationStatementStatus): void {
    if (!ALLOWED_MEDICATION_STATUS.has(status)) {
      throw new Error(
        `Invalid status: ${status}. Allowed statuses are: ${Array.from(ALLOWED_MEDICATION_STATUS).join(", ")}`
      );
    }
    this.data.status = status;
  }

  /**
   * Sets the category of the medication statement.
   * @param category - The category to set.
   */
  setCategory(category: CodeableConcept): void {
    if (!(category instanceof CodeableConcept)) {
      throw new Error("Category must be an instance of CodeableConcept.");
    }
    this.data.category = category;
  }

  /**
   * Adds a status reason to the medication statement.
   * @param statusReason - The status reason to add.
   */
  addStatusReason(statusReason: CodeableConcept): void {
    if (!(statusReason instanceof CodeableConcept)) {
      throw new Error("StatusReason must be an instance of CodeableConcept.");
    }
    if (!this.data.statusReason) {
      this.data.statusReason = [];
    }
    this.data.statusReason.push(statusReason);
  }

  /**
   * Sets the medication codeable concept of the medication statement.
   * @param medicationCodeableConcept - The medication codeable concept to set.
   */
  addMedicationCodeableConcept(medicationCodeableConcept: CodeableConcept): void {
    if (!(medicationCodeableConcept instanceof CodeableConcept)) {
      throw new Error("MedicationCodeableConcept must be an instance of CodeableConcept.");
    }
    this.data.medicationCodeableConcept = medicationCodeableConcept;
  }

  /**
   * Adds a reason code to the medication statement.
   * @param reasonCode - The reason code to add.
   */
  addReasonCode(reasonCode: CodeableConcept): void {
    if (!(reasonCode instanceof CodeableConcept)) {
      throw new Error("ReasonCode must be an instance of CodeableConcept.");
    }
    if (!this.data.reasonCode) {
      this.data.reasonCode = [];
    }
    this.data.reasonCode.push(reasonCode);
  }

  /**
   * Sets the subject of the medication statement.
   * @param patientId - The subject patient ID to set.
   */
  addSubject(patientId: string): void {
    if (!patientId) {
      throw new Error("Subject must have a patient id.");
    }
    this.data.subject = {
      reference: `Patient/${patientId}`
    };
  }
}
