# 🔗 FHIR Serializer | Healthcare Utility NPM Package

A lightweight and type-safe TypeScript library to help developers generate valid **FHIR R4** resources with ease.

## 🚀 Features

- ⚕️ Build valid **FHIR R4** resources effortlessly
- 🔒 **Type-safe** with full TypeScript support
- 📦 **Modular package structure** - install only what you need
- ♻️ Reusable architecture using TypeScript mixins
- 🧩 Designed for composability and maintainability
- ✨ **No `any` types** - fully typed FHIR R4 compliant

## 📦 Installation

### For JavaScript Projects (Builder only)

```bash
npm install fhir-serializer
```

Or if you want to use subpath imports:

```bash
npm install fhir-serializer
# Then import from 'fhir-serializer/builder'
```

### For TypeScript Projects (Types + Builder)

```bash
npm install fhir-serializer
# Both types and builder are available
```

## 📖 Usage

### JavaScript Usage (Builder)

```javascript
const { Bundle, MedicationStatement, CodeableConcept } = require('fhir-serializer/builder');

// Create a CodeableConcept
const medicationCode = new CodeableConcept(
  [
    {
      system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
      code: '1049502',
      display: 'Acetaminophen 325 MG Oral Tablet'
    }
  ],
  'Acetaminophen'
);

// Create a MedicationStatement
const medStatement = new MedicationStatement('med-123');
medStatement.setStatus('active');
medStatement.addSubject('patient-456');
medStatement.addMedicationCodeableConcept(medicationCode);
medStatement.addIdentifier('http://example.org/fhir/identifier', 'med-id-789');

// Create a Bundle and add the resource
const bundle = new Bundle('collection');
bundle.addResource(medStatement);

// Get serialized output
const serializedMed = medStatement.serialize();
const bundleData = bundle.getBundle();

console.log(JSON.stringify(bundleData, null, 2));
```

### TypeScript Usage (Types + Builder)

```typescript
// Using type definitions
import { 
  MedicationStatement as IMedicationStatement,
  CodeableConcept as ICodeableConcept,
  Bundle as IBundle,
  Coding 
} from 'fhir-serializer/types';

// Using builder classes
import { 
  Bundle, 
  MedicationStatement, 
  CodeableConcept 
} from 'fhir-serializer/builder';

// Type-safe FHIR resource creation
const coding: Coding = {
  system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
  code: '1049502',
  display: 'Acetaminophen 325 MG Oral Tablet'
};

const medicationConcept: ICodeableConcept = {
  coding: [coding],
  text: 'Acetaminophen'
};

// Or use the builder for easier construction
const medStatement = new MedicationStatement('med-123');
medStatement.setStatus('active');
medStatement.addSubject('patient-456');

const bundle = new Bundle('collection');
bundle.addResource(medStatement);
```

## 🏗️ Package Structure

The package is organized into two main subpaths:

- **`fhir-serializer/types`** - FHIR R4 TypeScript type definitions (types only, no runtime code)
- **`fhir-serializer/builder`** - Builder classes for creating FHIR resources (runtime code with types)

### Subpath Exports

```javascript
// Types only (TypeScript projects)
import type { MedicationStatement, Bundle } from 'fhir-serializer/types';

// Builder classes (JavaScript/TypeScript projects)
import { MedicationStatement, Bundle } from 'fhir-serializer/builder';
```

## 🔧 Supported Resources

Currently supported FHIR R4 resources:

- MedicationStatement
- Bundle
- Patient (type definition)
- Coverage (type definition)
- Condition (type definition)
- AllergyIntolerance (type definition)
- Observation (type definition)
- DocumentReference (type definition)
- Appointment (type definition)
- Encounter (type definition)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT

## 🔗 Links

- [FHIR R4 Specification](https://www.hl7.org/fhir/R4/)
- [GitHub Repository](https://github.com/onkarsabale15/fhir-builder)
