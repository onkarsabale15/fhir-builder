import { FHIRResourceType } from '../../types/fhir-types';

export const ALLOWED_RESOURCES: Set<FHIRResourceType> = new Set([
  "Patient",
  "Coverage",
  "Condition",
  "AllergyIntolerance",
  "Observation",
  "DocumentReference",
  "MedicationStatement",
  "Appointment",
  "Encounter"
]);
