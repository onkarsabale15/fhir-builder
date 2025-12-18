/**
 * FHIR R4 Type Definitions
 * Based on FHIR R4 specification
 */

/**
 * Base FHIR types
 */
export type FHIRResourceType =
  | "Patient"
  | "Coverage"
  | "Condition"
  | "AllergyIntolerance"
  | "Observation"
  | "DocumentReference"
  | "MedicationStatement"
  | "Appointment"
  | "Encounter"
  | "Bundle";

export type BundleType = "collection" | "document" | "message" | "transaction" | "transaction-response" | "batch" | "batch-response" | "history" | "searchset";

export type MedicationStatementStatus = "active" | "completed" | "entered-in-error" | "intended" | "stopped" | "on-hold" | "unknown";

/**
 * Identifier - An identifier intended for computation
 */
export interface Identifier {
  system?: string;
  value?: string;
  use?: string;
  type?: CodeableConcept;
}

/**
 * Coding - A representation of a defined concept using a symbol from a defined "code system"
 */
export interface Coding {
  system?: string;
  code?: string;
  display?: string;
  version?: string;
  userSelected?: boolean;
}

/**
 * CodeableConcept - A concept that may be defined by a formal reference to a terminology or ontology
 */
export interface CodeableConcept {
  coding?: Coding[];
  text?: string;
}

/**
 * Reference - A reference from one resource to another
 */
export interface Reference {
  reference?: string;
  type?: string;
  identifier?: Identifier;
  display?: string;
}

/**
 * Base Resource interface
 */
export interface Resource {
  resourceType: FHIRResourceType;
  id?: string;
  meta?: Meta;
  implicitRules?: string;
  language?: string;
}

/**
 * Meta - Metadata about a resource
 */
export interface Meta {
  versionId?: string;
  lastUpdated?: string;
  source?: string;
  profile?: string[];
  security?: Coding[];
  tag?: Coding[];
}

/**
 * MedicationStatement Resource
 */
export interface MedicationStatement extends Resource {
  resourceType: "MedicationStatement";
  identifier?: Identifier[];
  status: MedicationStatementStatus;
  statusReason?: CodeableConcept[];
  category?: CodeableConcept;
  medicationCodeableConcept?: CodeableConcept;
  medicationReference?: Reference;
  subject: Reference;
  context?: Reference;
  effectiveDateTime?: string;
  effectivePeriod?: Period;
  dateAsserted?: string;
  informationSource?: Reference;
  derivedFrom?: Reference[];
  reasonCode?: CodeableConcept[];
  reasonReference?: Reference[];
  note?: Annotation[];
  dosage?: Dosage[];
}

/**
 * Period - A time period defined by a start and end date/time
 */
export interface Period {
  start?: string;
  end?: string;
}

/**
 * Annotation - A text note which also contains information about who made the statement
 */
export interface Annotation {
  authorReference?: Reference;
  authorString?: string;
  time?: string;
  text: string;
}

/**
 * Dosage - How medication is/was taken or should be taken
 */
export interface Dosage {
  sequence?: number;
  text?: string;
  additionalInstruction?: CodeableConcept[];
  patientInstruction?: string;
  timing?: Timing;
  asNeededBoolean?: boolean;
  asNeededCodeableConcept?: CodeableConcept;
  site?: CodeableConcept;
  route?: CodeableConcept;
  method?: CodeableConcept;
  doseAndRate?: DoseAndRate[];
  maxDosePerPeriod?: Ratio;
  maxDosePerAdministration?: Quantity;
  maxDosePerLifetime?: Quantity;
}

/**
 * Timing - Specifies an event that may occur multiple times
 */
export interface Timing {
  event?: string[];
  repeat?: TimingRepeat;
  code?: CodeableConcept;
}

/**
 * TimingRepeat - Set of rules about when the event is scheduled
 */
export interface TimingRepeat {
  boundsDuration?: Duration;
  boundsPeriod?: Period;
  boundsRange?: Range;
  count?: number;
  countMax?: number;
  duration?: number;
  durationMax?: number;
  durationUnit?: string;
  frequency?: number;
  frequencyMax?: number;
  period?: number;
  periodMax?: number;
  periodUnit?: string;
  dayOfWeek?: string[];
  timeOfDay?: string[];
  when?: string[];
  offset?: number;
}

/**
 * Duration - A length of time
 */
export interface Duration extends Quantity {
}

/**
 * Range - Set of values bounded by low and high
 */
export interface Range {
  low?: Quantity;
  high?: Quantity;
}

/**
 * Quantity - A measured or measurable amount
 */
export interface Quantity {
  value?: number;
  comparator?: string;
  unit?: string;
  system?: string;
  code?: string;
}

/**
 * DoseAndRate - Dose and rate information
 */
export interface DoseAndRate {
  type?: CodeableConcept;
  doseRange?: Range;
  doseQuantity?: Quantity;
  rateRatio?: Ratio;
  rateRange?: Range;
  rateQuantity?: Quantity;
}

/**
 * Ratio - A ratio of two Quantity values
 */
export interface Ratio {
  numerator?: Quantity;
  denominator?: Quantity;
}

/**
 * Bundle Resource
 */
export interface Bundle extends Resource {
  resourceType: "Bundle";
  type: BundleType;
  identifier?: Identifier;
  timestamp?: string;
  total?: number;
  link?: BundleLink[];
  entry?: BundleEntry[];
  signature?: Signature;
}

/**
 * BundleLink - Links related to this Bundle
 */
export interface BundleLink {
  relation: string;
  url: string;
}

/**
 * BundleEntry - Entry in the bundle
 */
export interface BundleEntry {
  link?: BundleLink[];
  fullUrl?: string;
  resource?: Resource;
  search?: BundleEntrySearch;
  request?: BundleEntryRequest;
  response?: BundleEntryResponse;
}

/**
 * BundleEntrySearch - Search related information
 */
export interface BundleEntrySearch {
  mode?: string;
  score?: number;
}

/**
 * BundleEntryRequest - Additional execution information
 */
export interface BundleEntryRequest {
  method: string;
  url: string;
  ifNoneMatch?: string;
  ifModifiedSince?: string;
  ifMatch?: string;
  ifNoneExist?: string;
}

/**
 * BundleEntryResponse - Results of execution
 */
export interface BundleEntryResponse {
  status: string;
  location?: string;
  etag?: string;
  lastModified?: string;
  outcome?: Resource;
}

/**
 * Signature - A digital signature
 */
export interface Signature {
  type: Coding[];
  when: string;
  who: Reference;
  onBehalfOf?: Reference;
  targetFormat?: string;
  sigFormat?: string;
  data?: string;
}
