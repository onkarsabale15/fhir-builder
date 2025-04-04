import BaseResource from "../../baseResource.js";
import CodeableConcept from "../utils/codeableConcepts.js";
import { IdentifierMixin } from "../mixins/identifier.js";
const ALLOWED_MEDICATION_STATUS = new Set(["active", "completed", "entered-in-error", "intended", "stopped", "on-hold", "unknown"])

export default class MedicationStatement extends IdentifierMixin(BaseResource) {
    constructor(id) {
        super("MedicationStatement", id);
        this.data.subject = null;
        this.data.identifier = [];
        this.data.status = null;
        this.data.valueCodeableConcept = {
            coding: [],
            text: null
        };
        this.data.statusReason = [];
        this.data.medicationCodeableConcept = null;
        this.data.reasonCode = [];

    }


    /**
     * Sets the status of the resource.
     * @param {"active" | "completed" | "entered-in-error" | "intended" | "stopped" | "on-hold" | "unknown"} status - The status to set.
     * @throws {Error} If the status is not allowed.
    */
    setStatus(status) {
        if (!ALLOWED_MEDICATION_STATUS.has(status)) {
            throw new Error(`Invalid status: ${status}. Allowed statuses are: ${[...ALLOWED_MEDICATION_STATUS].join(", ")}`);
        }
        this.data.status = status;
    }

    /**
     * Sets the category of the medication statement.
     * @param {CodeableConcept} category - The category to set.
     */
    setCategory(category) {
        if (!(category instanceof CodeableConcept)) {
            throw new Error("Category must be an instance of CodeableConcept.");
        }
        this.data.category = category;
    }

    /**
     * Sets the category of the medication statement.
     * @param {CodeableConcept} category - The category to set.
     */
    addStatusReason(category) {
        if (!(category instanceof CodeableConcept)) {
            throw new Error("Category must be an instance of CodeableConcept.");
        }
        this.data.statusReason.push(category);
    }

    /**
     * Sets the medication codeable concept of the medication statement.
     * @param {CodeableConcept} medicationCodeableConcept - The medication codeable concept to set.
     */
    addMedicationCodeableConcept(medicationCodeableConcept) {
        if (!(medicationCodeableConcept instanceof CodeableConcept)) {
            throw new Error("MedicationCodeableConcept must be an instance of CodeableConcept.");
        }
        this.data.medicationCodeableConcept = medicationCodeableConcept;
    }

    /**
     * Sets the category of the medication statement.
     * @param {CodeableConcept} reasonCode - The category to set.
     */
    addReasonCode(reasonCode) {
        if (!(reasonCode instanceof CodeableConcept)) {
            throw new Error("reasonCode must be an instance of CodeableConcept.");
        }
        this.data.statusReason.push(reasonCode);
    }

    /**
     * Sets the subject of the medication statement.
     * @param patient - The subject patient to set.
     */
    addSubject(patient) {
        if(!patient) {
            throw new Error("Subject must have a patient id.");
        }
        this.data.subject = {
            reference: `Patient/${patient}`
        };
    }
}