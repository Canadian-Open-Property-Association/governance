# Artifact Types

## 1. JSON Schema (Validation)

**Created by**: Schema Builder
**Published to**: `credentials/schemas/{credential-type}.json`
**Purpose**: Define credential structure and validation rules

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://openpropertyassociation.ca/credentials/schemas/home-credential.json",
  "title": "Home Credential",
  "type": "object",
  "properties": {
    "credentialSubject": {
      "type": "object",
      "properties": {
        "AssessedValue": {
          "type": "number",
          "title": "Assessed Value"
        },
        "UnparsedAddress": {
          "type": "string",
          "title": "Property Address"
        }
      },
      "required": ["AssessedValue", "UnparsedAddress"]
    }
  }
}
```

---

## 2. VCT (Credential Type Definition)

**Created by**: VCT Builder
**Published to**: `credentials/vct/{credential-type}.json`
**Purpose**: Credential branding, claim binding, and evidence requirements

The VCT is the **primary artifact** the issuance service fetches to create a credential offer.

```json
{
  "vct": "https://openpropertyassociation.ca/credentials/vct/home-credential",
  "name": "Home Credential",
  "schema_uri": "https://openpropertyassociation.ca/credentials/schemas/home-credential.json",
  "display": {
    "card": {
      "title": "Home Credential",
      "backgroundColor": "#2E7D32"
    }
  },
  "claims": {
    "AssessedValue": {
      "display": { "label": "Assessed Value" },
      "vocab_binding": "reso:AssessedValue",
      "acceptable_evidence": ["furnisher:assessed_val"]
    },
    "UnparsedAddress": {
      "display": { "label": "Property Address" },
      "vocab_binding": "reso:UnparsedAddress",
      "acceptable_evidence": ["furnisher:full_address"]
    }
  }
}
```

**Key relationships**:

- `schema_uri` → References the JSON Schema for validation
- Each claim maps 1:1 to a schema property
- `vocab_binding` → Links to RESO or Cornerstone vocabulary term
- `acceptable_evidence` → Lists valid data source fields for this claim

---

## 3. Vocabulary / JSON-LD Context (Semantics)

**Created by**: Data Dictionary
**Published to**: `credentials/contexts/cornerstone-vocab.jsonld`
**Purpose**: Canonical semantic definitions (RESO base + Cornerstone extensions)

```json
{
  "@context": {
    "@version": 1.1,
    "reso": "https://ddwiki.reso.org/display/DDW20/",
    "cornerstone": "https://openpropertyassociation.ca/vocab#",

    "Property": {
      "@id": "reso:Property",
      "@context": {
        "AssessedValue": "reso:AssessedValue",
        "UnparsedAddress": "reso:UnparsedAddress",
        "ListPrice": "reso:ListPrice"
      }
    },

    "Person": {
      "@id": "cornerstone:Person",
      "@context": {
        "givenName": "cornerstone:givenName",
        "familyName": "cornerstone:familyName"
      }
    }
  }
}
```

---

## 4. Entity Metadata

**Created by**: Entity Manager
**Published to**: `credentials/entities/{entity-id}.json`
**Purpose**: Entity information, logos, and data source definitions

```json
{
  "id": "furnisher-example",
  "name": "Example Data Furnisher",
  "types": ["data-furnisher"],
  "logoUri": "https://openpropertyassociation.ca/credentials/entities/logos/furnisher-example.png",
  "dataSources": [
    {
      "id": "assessment-api",
      "name": "Property Assessment API",
      "type": "direct-feed",
      "fields": [
        { "name": "assessed_val", "displayName": "Assessed Value", "dataType": "number" },
        { "name": "full_address", "displayName": "Full Address", "dataType": "string" }
      ]
    }
  ]
}
```

---

## 5. Harmonization Mappings

**Created by**: Data Harmonization App
**Published to**: `credentials/harmonization/mappings.json`
**Purpose**: Map data furnisher fields to RESO/Cornerstone vocabulary terms

```json
{
  "mappings": [
    {
      "vocabTerm": "reso:AssessedValue",
      "sources": [
        {
          "entityId": "furnisher-a",
          "sourceId": "assessment-api",
          "fieldPath": "assessed_val"
        },
        {
          "entityId": "furnisher-b",
          "sourceId": "property-data",
          "fieldPath": "property_value"
        }
      ]
    }
  ]
}
```
