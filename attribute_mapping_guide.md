# Attribute Mapping Guide

## 1. About this Document

This guide provides comprehensive attribute mappings across the Cornerstone credential ecosystem. It documents how attributes flow between credentials, which attributes are shared vs unique, and how to handle attribute inheritance and migration.

**Purpose**:
- Map attributes across the five core credentials
- Document attribute inheritance patterns
- Provide migration guidance for updating credentials
- Explain attribute derivation and transformation rules

**Intended Audience**: Integration developers, credential issuers, schema designers, and data architects.

### 1.1 Version History

| Ver.    | Date        | Notes                              | Author(s)       |
|---------|-------------|------------------------------------|-----------------|
| **1.0** | 24-Nov-2025 | Initial attribute mapping guide    | Mathieu Glaude  |

## 2. Attribute Inheritance Model

### 2.1 Inheritance Overview

Credentials inherit attributes from prerequisite credentials rather than duplicating verification:

```
Cornerstone ID (Source of Truth)
├── given_names ──────────┐
├── family_name ──────────┤
├── birthdate_dateint ────┤
├── verified_email ───────┤
└── identity_evidence ────┤
                          │
    [INHERITED BY ALL DEPENDENT CREDENTIALS]
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
Verified Homeowner                  Verified Advisor
│                                   │
├── [Inherited attributes]         ├── [Inherited attributes]
├── pid (NEW)                      ├── advisor_type (NEW)
├── property_address (NEW)         ├── license_number (NEW)
└── ...                            └── ...
```

### 2.2 Inheritance Rules

1. **Identity attributes from Cornerstone ID** are inherited by all dependent credentials
2. **Property attributes from Verified Homeowner** are referenced (not inherited) by PAACs
3. **Professional attributes from Verified Advisor** are inherited by Portfolio Issuer
4. **Evidence attributes** chain through prerequisites (reference, not duplication)

### 2.3 Reference vs Inheritance

| Pattern | Description | Example | Usage |
|---------|-------------|---------|-------|
| **Inheritance** | Child credential includes parent attribute values | Verified Advisor includes `given_names` from Cornerstone ID | Identity attributes |
| **Reference** | Child credential points to parent attribute location | PAAC includes `property_id` referencing Home Credential's `pid` | Relationship attributes |
| **Derivation** | Child credential computes new value from parent | (Future) Credit score derived from financial credentials | Computed attributes |

## 3. Complete Attribute Matrix

### 3.1 Attributes Across All Credentials

| Attribute | CID | VH | VA | PIC | PAAC | Source | Notes |
|-----------|-----|----|----|-----|------|--------|-------|
| **Identity Attributes** |
| `given_names` | ✓ (S) | ✓ (I) | ✓ (I) | ✓ (I) | ✓ (I×2) | CID | Inherited by all; PAAC has issuer + recipient |
| `family_name` | ✓ (S) | ✓ (I) | ✓ (I) | ✓ (I) | ✓ (I×2) | CID | Inherited by all; PAAC has issuer + recipient |
| `birthdate_dateint` | ✓ (S) | ✓ (I) | ✓ (I) | ✓ (I) | - | CID | Not included in PAAC |
| `verified_email` | ✓ (S) | ✓ (I) | ✓ (I) | ✓ (I) | ✓ (I×2) | CID | Inherited by all; PAAC has issuer + recipient |
| **Property Attributes** |
| `pid` | - | ✓ (S) | - | - | ✓ (R) | VH | PAAC references via `property_id` |
| `property_address` | - | ✓ (S) | - | - | - | VH/Landcor | Property-specific |
| `jurisdiction` | - | ✓ (S) | - | - | - | VH/Landcor | Property-specific |
| `purchase_price` | - | ✓ (S) | - | - | - | VH/Landcor | Property-specific |
| `purchase_date` | - | ✓ (S) | - | - | - | VH/Landcor | Property-specific |
| `year_built` | - | ✓ (S) | - | - | - | VH/Landcor | Property-specific |
| `effective_year` | - | ✓ (S) | - | - | - | VH/Landcor | Property-specific |
| `neighbourhood` | - | ✓ (S) | - | - | - | VH/Landcor | Property-specific |
| **Professional Attributes** |
| `advisor_type` | - | - | ✓ (S) | ✓ (I) | - | VA/Regulator | Enum: REALTOR, MORTGAGE_BROKER, etc. |
| `domain` | - | - | ✓ (S) | ✓ (I) | - | VA/Regulator | Enum: REAL_ESTATE, MORTGAGE, etc. |
| `specialization` | - | - | ✓ (S) | ✓ (I) | - | VA/Regulator | Advisor's primary specialization |
| `license_number` | - | - | ✓ (S) | - | - | VA/Regulator | Professional license ID |
| `licence_status` | - | - | ✓ (S) | - | - | VA/Regulator | ACTIVE, SUSPENDED, etc. |
| `licence_effective_date` | - | - | ✓ (S) | - | - | VA/Regulator | Optional - not all regulators provide |
| `licence_expiry` | - | - | ✓ (S) | - | - | VA/Regulator | Optional - not all regulators provide |
| `regulator_name` | - | - | ✓ (S) | - | - | VA/Regulator | BCFSA, RECO, OACIQ, etc. |
| `licensed_for` | - | - | ✓ (S) | - | - | VA/Regulator | Optional - categories of license |
| `office_hq_location` | - | - | ✓ (S) | - | - | VA/Regulator | City and province of office |
| `service_region` | - | - | ✓ (S) | - | - | VA/Regulator | Geographic service areas |
| `specialties` | - | - | ✓ (S) | - | - | VA/Self | Self-declared specialties |
| `service_areas` | - | - | ✓ (S) | - | - | VA/Self | Self-declared service areas |
| `years_experience` | - | - | ✓ (S) | - | - | VA/Self | Years in profession |
| `networkPartner` | - | - | ✓ (S) | ✓ (I) | - | NP | Object: npId, npName, affiliationDate |
| **Capability Attributes** |
| `canIssuePortfolios` | - | - | - | ✓ (S) | - | NP | Boolean flag for capability |
| `issuer_type` | - | - | - | ✓ (S) | - | NP | ORGANIZATIONAL or DELEGATE |
| `scope` | - | - | - | ✓ (S) | - | NP | Scope of portfolio issuance |
| `max_portfolios` | - | - | - | ✓ (S) | - | NP | Maximum portfolios allowed (optional) |
| **Authorization Attributes** |
| `property_id` | - | - | - | - | ✓ (S) | Homeowner | UUID referencing property |
| `data_scope` | - | - | - | - | ✓ (S) | Homeowner | Array: identity, ownership, equity, insurance |
| `access_level` | - | - | - | - | ✓ (S) | Homeowner | READ_ONLY, OPERATIONAL, ADVISORY, TRANSACTIONAL |
| `purpose` | - | - | - | - | ✓ (S) | Homeowner | Purpose of authorization |
| `valid_from` | - | - | - | - | ✓ (S) | Homeowner | Start date of authorization |
| `valid_until` | - | - | - | - | ✓ (S) | Homeowner | Expiry date of authorization |
| `issuer_did` | - | - | - | - | ✓ (S) | System | DID of homeowner issuing PAAC |
| `recipient_did` | - | - | - | - | ✓ (S) | System | DID of advisor receiving PAAC |
| **Evidence Attributes** |
| `identity_evidence` | ✓ (S) | ✓ (R) | ✓ (R) | ✓ (R) | ✓ (R) | CID | UUID reference to IDV evidence |
| `title_evidence` | - | ✓ (S) | - | - | - | VH | UUID reference to land title evidence |
| `licensing_evidence` | - | - | ✓ (S) | - | - | VA | UUID reference to licensing verification |
| `attestation_evidence` | - | - | ✓ (S) | ✓ (S) | - | NP | UUID reference to NP attestation |

**Legend**:
- **CID**: Cornerstone ID
- **VH**: Verified Homeowner
- **VA**: Verified Advisor
- **PIC**: Portfolio Issuer Credential
- **PAAC**: Property Access Authorization Credential
- **S**: Source (credential defines this attribute)
- **I**: Inherited (from prerequisite credential)
- **R**: Referenced (points to another credential's attribute)
- **NP**: Network Partner
- **×2**: Appears twice (for two parties in relationship)

## 4. Attribute Flow Diagrams

### 4.1 Identity Attribute Flow

```
┌─────────────────────┐
│  Interac IVS or     │
│  BC Person Cred     │
└──────────┬──────────┘
           │ Verification
           ▼
┌─────────────────────────────────────┐
│     Cornerstone ID (Source)         │
│  • given_names                      │
│  • family_name                      │
│  • birthdate_dateint                │
│  • verified_email                   │
│  • identity_evidence (UUID)         │
└──────────┬──────────────────────────┘
           │ Inheritance
     ┌─────┴─────┐
     │           │
     ▼           ▼
┌─────────┐  ┌──────────────┐
│ Verified│  │ Verified     │
│ Home-   │  │ Advisor      │
│ owner   │  │              │
│         │  │              │
│ [+]     │  │ [+]          │
│ Identity│  │ Identity     │
│ attrs   │  │ attrs        │
└────┬────┘  └──────┬───────┘
     │              │
     │              │
     ▼              ▼
  ┌──────┐      ┌────────┐
  │ PAAC │      │ PAAC   │
  │      │      │        │
  │[+]   │      │ [+]    │
  │Issuer│      │Recipient│
  │(Home-│      │(Advisor)│
  │owner)│      │        │
  │attrs │      │ attrs  │
  └──────┘      └────────┘
```

### 4.2 Property Data Flow

```
┌──────────────────────┐
│ Provincial Land      │
│ Title Registry       │
│ + Landcor Feed       │
└──────────┬───────────┘
           │ Property Data
           ▼
┌────────────────────────────────┐
│  Verified Homeowner (Source)   │
│  • pid                         │
│  • property_address            │
│  • jurisdiction                │
│  • purchase_price              │
│  • purchase_date               │
│  • year_built                  │
│  • effective_year              │
│  • neighbourhood               │
│  • title_evidence (UUID)       │
└──────────┬─────────────────────┘
           │ Property Reference
           ▼
┌──────────────────────────┐
│   PAAC                   │
│   • property_id (ref)    │
│   • data_scope           │
│   • access_level         │
└──────────────────────────┘
```

### 4.3 Professional Data Flow

```
┌────────────────────────┐
│ Provincial Regulators  │
│ (BCFSA, RECO, etc.)    │
└──────────┬─────────────┘
           │ Licensing Data
           │
┌──────────┴────────────┐
│ Network Partner       │
│ (Attestation)         │
└──────────┬────────────┘
           │ NP Attestation
           ▼
┌───────────────────────────────┐
│  Verified Advisor (Source)    │
│  • [Identity from CID]        │
│  • advisor_type               │
│  • domain                     │
│  • specialization             │
│  • license_number             │
│  • licence_status             │
│  • regulator_name             │
│  • office_hq_location         │
│  • service_region             │
│  • networkPartner             │
│  • licensing_evidence (UUID)  │
│  • attestation_evidence (UUID)│
└──────────┬────────────────────┘
           │ Inheritance
           ▼
┌────────────────────────────┐
│  Portfolio Issuer Cred     │
│  • [Identity from CID]     │
│  • [Advisor data from VA]  │
│  • canIssuePortfolios      │
│  • issuer_type             │
│  • scope                   │
└────────────────────────────┘
```

## 5. Attribute Data Types and Formats

### 5.1 String Attributes

| Attribute | Format | Example | Validation Rules |
|-----------|--------|---------|------------------|
| `given_names` | UTF-8 string | `John Michael` | Legal name, no special chars except space, hyphen, apostrophe |
| `family_name` | UTF-8 string | `Smith-Jones` | Legal name, no special chars except space, hyphen, apostrophe |
| `verified_email` | Email (RFC 5322) | `john.smith@example.com` | Valid email format, must be verified via OTP |
| `pid` | 9-digit with hyphens | `027-263-975` | BC format: XXX-XXX-XXX |
| `license_number` | Alphanumeric | `R123456` | Format varies by regulator |
| `neighbourhood` | UTF-8 string | `Kitsilano` | Recognized neighbourhood name |

### 5.2 Integer Attributes

| Attribute | Format | Range | Example | Notes |
|-----------|--------|-------|---------|-------|
| `birthdate_dateint` | YYYYMMDD | 19000101-present | `19850621` | For ZK proof compatibility |
| `year_built` | YYYY | 1800-present | `1987` | Original construction year |
| `effective_year` | YYYY | 1800-present | `1993` | Renovation-adjusted year |
| `years_experience` | Integer | 0-99 | `15` | Self-declared experience |

### 5.3 Number Attributes

| Attribute | Format | Range | Example | Notes |
|-----------|--------|-------|---------|-------|
| `purchase_price` | Number | 0+ | `1250000` | In local currency (CAD), no decimals for whole dollars |
| `max_portfolios` | Integer | 0+ | `50` | Optional limit on portfolio issuance |

### 5.4 Date/DateTime Attributes

| Attribute | Format | Example | Notes |
|-----------|--------|---------|-------|
| `purchase_date` | ISO 8601 Date | `2018-05-14` | YYYY-MM-DD |
| `licence_effective_date` | ISO 8601 Date | `2020-01-15` | YYYY-MM-DD |
| `licence_expiry` | ISO 8601 Date | `2025-12-31` | YYYY-MM-DD, optional |
| `valid_from` | ISO 8601 DateTime | `2025-01-01T00:00:00Z` | With timezone |
| `valid_until` | ISO 8601 DateTime | `2026-01-01T00:00:00Z` | With timezone |
| `affiliationDate` | ISO 8601 Date | `2023-06-01` | Within networkPartner object |

### 5.5 Enum Attributes

#### advisor_type
```json
{
  "type": "string",
  "enum": [
    "REALTOR",
    "MORTGAGE_BROKER",
    "LAWYER",
    "NOTARY",
    "FINANCIAL_ADVISOR",
    "WEALTH_MANAGER",
    "ACCOUNTANT",
    "INSURANCE_BROKER",
    "PROPERTY_MANAGER",
    "HOME_INSPECTOR"
  ]
}
```

#### domain
```json
{
  "type": "string",
  "enum": [
    "REAL_ESTATE",
    "MORTGAGE",
    "INSURANCE",
    "FINANCIAL_PLANNING",
    "WEALTH_MANAGEMENT",
    "LEGAL_SERVICES",
    "ACCOUNTING",
    "PROPERTY_MANAGEMENT",
    "HOME_INSPECTION"
  ]
}
```

#### licence_status
```json
{
  "type": "string",
  "enum": [
    "ACTIVE",
    "SUSPENDED",
    "INACTIVE",
    "PENDING",
    "EXPIRED",
    "REVOKED"
  ]
}
```

#### access_level
```json
{
  "type": "string",
  "enum": [
    "READ_ONLY",
    "OPERATIONAL",
    "ADVISORY",
    "TRANSACTIONAL"
  ]
}
```

#### issuer_type (Portfolio Issuer)
```json
{
  "type": "string",
  "enum": [
    "ORGANIZATIONAL",
    "DELEGATE"
  ]
}
```

### 5.6 JSON Object Attributes

#### property_address
```json
{
  "street": "1234 W 10TH AVE",
  "locality": "Vancouver",
  "region": "BC",
  "postal_code": "V6H 1J9",
  "country": "CA"
}
```

#### office_hq_location
```json
{
  "city": "Vancouver",
  "province": "BC"
}
```

#### service_region
```json
{
  "provinces": ["BC"],
  "regions": ["Lower Mainland", "Vancouver Island"],
  "cities": ["Vancouver", "Burnaby", "Surrey"]
}
```

#### networkPartner
```json
{
  "npId": "550e8400-e29b-41d4-a716-446655440000",
  "npName": "Royal LePage",
  "affiliationDate": "2023-06-01"
}
```

### 5.7 JSON Array Attributes

#### data_scope (PAAC)
```json
{
  "data_scope": [
    "identity",
    "ownership",
    "equity",
    "insurance"
  ]
}
```

#### specialties (Verified Advisor)
```json
{
  "specialties": [
    "First-time home buyers",
    "Investment properties",
    "Luxury real estate"
  ]
}
```

#### service_areas (Verified Advisor)
```json
{
  "service_areas": [
    "Downtown Vancouver",
    "West End",
    "Kitsilano"
  ]
}
```

#### licensed_for (Verified Advisor)
```json
{
  "licensed_for": [
    "Residential",
    "Commercial",
    "Strata"
  ]
}
```

### 5.8 UUID/URI Attributes

All evidence attributes use UUID format with optional URI:

```json
{
  "identity_evidence": "550e8400-e29b-41d4-a716-446655440000",
  "title_evidence": "https://evidence.cornerstone.ca/title/660e8400-e29b-41d4-a716-446655440000",
  "licensing_evidence": "770e8400-e29b-41d4-a716-446655440000",
  "attestation_evidence": "880e8400-e29b-41d4-a716-446655440000"
}
```

## 6. Migration Guidance

### 6.1 Version Migration Strategy

When credential schemas are updated:

1. **Non-Breaking Changes** (minor version bump):
   - Adding optional attributes
   - Adding new enum values
   - Expanding ranges
   - **Migration**: Existing credentials remain valid

2. **Breaking Changes** (major version bump):
   - Removing attributes
   - Changing attribute types
   - Renaming attributes
   - Changing required/optional status
   - **Migration**: Revoke and re-issue credentials

### 6.2 Attribute Rename Migrations

| Old Attribute | New Attribute | Credential | Migration Path | Status |
|--------------|---------------|------------|----------------|--------|
| `first_name` | `given_names` | Cornerstone ID | Accept both in verifiers for 6 months, then deprecate old | Completed |
| `last_name` | `family_name` | Cornerstone ID | Accept both in verifiers for 6 months, then deprecate old | Completed |
| `dob` | `birthdate_dateint` | Cornerstone ID | Transform format: YYYY-MM-DD → YYYYMMDD | Completed |
| `parcel_id` | `pid` | Verified Homeowner | Accept both, prefer `pid` | Completed |
| `professional_type` | `advisor_type` | Verified Advisor | Map enum values, accept both | Completed |

### 6.3 Schema Evolution Examples

#### Example 1: Adding Optional Attribute

**Before** (v1.0):
```json
{
  "advisor_type": "REALTOR",
  "license_number": "R123456"
}
```

**After** (v1.1):
```json
{
  "advisor_type": "REALTOR",
  "license_number": "R123456",
  "bio": "Experienced real estate professional..." // NEW OPTIONAL
}
```

**Migration**: No action needed. Old credentials remain valid.

#### Example 2: Breaking Change - Renaming Required Attribute

**Before** (v1.0):
```json
{
  "professional_type": "REALTOR"
}
```

**After** (v2.0):
```json
{
  "advisor_type": "REALTOR" // RENAMED
}
```

**Migration**:
1. Announce v2.0 schema 3 months in advance
2. Support dual schema acceptance in verifiers
3. Re-issue credentials to all holders
4. Revoke v1.0 credentials after 6 months

### 6.4 Data Source Changes

When data sources change (e.g., switching from one regulator API to another):

1. **Mapping Required**: Create attribute mapping between old and new sources
2. **Evidence Update**: Update `licensing_evidence` or relevant evidence attribute
3. **Quality Check**: Validate data quality from new source
4. **Re-issuance**: May require credential re-issuance if data structure changes

## 7. Provincial Attribute Variations

### 7.1 Real Estate Licensing Attributes by Province

| Attribute | BC (BCFSA) | Ontario (RECO) | Quebec (OACIQ) | Handling |
|-----------|------------|----------------|----------------|----------|
| `license_number` | ✓ | ✓ | ✓ (permis number) | Required for all |
| `licence_status` | ✓ | ✓ | ✓ | Required for all |
| `licence_effective_date` | ✓ | May not provide | May not provide | Optional |
| `licence_expiry` | ✓ | May not provide | May not provide | Optional |
| `licensed_for` | ✓ (categories) | Different format | Different format | Optional, province-specific |
| `regulator_name` | "BCFSA" | "RECO" | "OACIQ" | Required for all |

### 7.2 Handling Optional Provincial Attributes

**Schema Design**:
```json
{
  "license_number": {
    "type": "string",
    "required": true,
    "description": "Professional license number"
  },
  "licence_effective_date": {
    "type": "string",
    "format": "date",
    "required": false,
    "description": "License effective date - optional, may not be provided by all regulators"
  },
  "licence_expiry": {
    "type": "string",
    "format": "date",
    "required": false,
    "description": "License expiry date - optional, may not be provided by all regulators"
  }
}
```

**Verifier Logic**:
```javascript
// Accept credential if required attributes present
if (credential.license_number && credential.regulator_name) {
  // Valid credential

  // Optional: Check expiry if available
  if (credential.licence_expiry) {
    if (new Date(credential.licence_expiry) < new Date()) {
      // License expired
    }
  }
}
```

## 8. Attribute Validation Rules

### 8.1 Cross-Attribute Validation

| Rule | Attributes | Validation | Example |
|------|-----------|------------|---------|
| **Effective Year ≥ Year Built** | `effective_year`, `year_built` | `effective_year >= year_built` | Built 1987, renovated 1993 |
| **Valid From < Valid Until** | `valid_from`, `valid_until` | `valid_from < valid_until` | Authorization from 2025-01-01 to 2026-01-01 |
| **Purchase Date ≤ Today** | `purchase_date` | `purchase_date <= current_date` | Cannot purchase in future |
| **Age ≥ 18** | `birthdate_dateint` | `age_from_birthdate >= 18` | Adult verification |
| **License Active for Active Advisors** | `licence_status`, `advisor_type` | If advisor active, `licence_status == "ACTIVE"` | Active advisors must have active licenses |

### 8.2 Format Validation Regex

| Attribute | Regex Pattern | Description |
|-----------|--------------|-------------|
| `verified_email` | `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$` | Standard email format |
| `pid` | `^\d{3}-\d{3}-\d{3}$` | BC PID format (9 digits with hyphens) |
| `postal_code` (BC) | `^[A-Z]\d[A-Z] \d[A-Z]\d$` | Canadian postal code (e.g., V6H 1J9) |
| `license_number` | Varies by regulator | Province-specific patterns |

### 8.3 Business Rule Validation

1. **Cornerstone ID Required**:
   - All credentials must reference valid Cornerstone ID
   - `identity_evidence` must reference valid IDV evidence

2. **Property Ownership**:
   - `pid` must exist in land title registry
   - `title_evidence` must reference valid title search

3. **Professional Licensing**:
   - `license_number` must be verifiable with `regulator_name`
   - `licence_status` must be "ACTIVE" for new issuances
   - `attestation_evidence` must reference valid NP attestation

4. **Authorization Scope**:
   - `property_id` in PAAC must reference valid Verified Homeowner credential
   - `data_scope` must be subset of available scopes
   - `access_level` must match `purpose`

## 9. Attribute Privacy and Selective Disclosure

### 9.1 Privacy Sensitivity Levels

| Sensitivity | Attributes | Disclosure Guidelines |
|------------|-----------|----------------------|
| **High** | `birthdate_dateint`, `license_number`, `purchase_price` | Use ZK proofs when possible, require explicit consent |
| **Medium** | `verified_email`, `given_names`, `family_name`, `property_address` | Selective disclosure recommended, consent required |
| **Low** | `advisor_type`, `domain`, `neighbourhood`, `year_built` | Can be disclosed more freely, but still with consent |
| **Public** | `regulator_name`, `jurisdiction`, `licence_status` | Generally public information |

### 9.2 Zero-Knowledge Proof Attributes

Attributes suitable for ZK proofs:

| Attribute | ZK Proof Use Case | Example |
|-----------|------------------|---------|
| `birthdate_dateint` | Age verification without revealing exact birthdate | Prove age ≥ 18 |
| `purchase_price` | Range proof without revealing exact price | Prove price > $500,000 |
| `year_built` | Era verification without revealing exact year | Prove built before 1990 |
| `years_experience` | Experience verification | Prove experience ≥ 5 years |

### 9.3 Selective Disclosure Patterns

**Minimal Disclosure Pattern** (for property listing access):
```json
{
  "disclosed": ["given_names", "family_name", "advisor_type", "license_number"],
  "hidden": ["birthdate_dateint", "verified_email", "specialties", "service_areas"]
}
```

**Full Disclosure Pattern** (for transaction authorization):
```json
{
  "disclosed": ["*"],
  "hidden": []
}
```

**Property Data Disclosure** (PAAC-controlled):
```json
{
  "data_scope": ["identity", "ownership"],
  "disclosed_property_attrs": ["pid", "property_address", "year_built"],
  "hidden_property_attrs": ["purchase_price", "purchase_date"]
}
```

## 10. Attribute Lifecycle Management

### 10.1 Attribute Update Triggers

| Attribute Category | Update Trigger | Action Required |
|-------------------|----------------|-----------------|
| **Identity Attributes** | Legal name change, email change | Revoke CID, re-verify, re-issue all credentials |
| **Property Attributes** | Property sold, major renovation | Revoke Home Credential, re-verify, re-issue |
| **Licensing Attributes** | License renewal, status change | Revoke Verified Advisor, re-verify, re-issue |
| **Self-Declared Attributes** | Advisor updates profile | Revoke Verified Advisor, re-issue with corrections |
| **Authorization Attributes** | Relationship changes, scope changes | Revoke PAAC, re-issue with new scope |

### 10.2 Attribute Data Quality

**Quality Tiers**:

1. **Tier 1 - Authoritative**:
   - Source: Government registries, regulatory bodies
   - Examples: `pid`, `license_number`, `birthdate_dateint`
   - Quality: Highest confidence
   - Updates: Rarely change, require authoritative source

2. **Tier 2 - Attested**:
   - Source: Network Partners, verified entities
   - Examples: `advisor_type`, `domain`, `networkPartner`
   - Quality: High confidence
   - Updates: Verified by NP, can be updated with attestation

3. **Tier 3 - Self-Declared**:
   - Source: Credential holder
   - Examples: `specialties`, `service_areas`, `years_experience`
   - Quality: Lower confidence, subject to verification
   - Updates: Can be corrected via revoke/re-issue
   - Caveat: "If inaccurate, credential should be revoked and re-issued"

### 10.3 Evidence Chain Maintenance

Evidence attributes require careful lifecycle management:

```
Identity Evidence Chain:
Cornerstone ID (identity_evidence: UUID_A)
  ├─→ Verified Homeowner (identity_evidence: reference to UUID_A)
  └─→ Verified Advisor (identity_evidence: reference to UUID_A)
      └─→ Portfolio Issuer (identity_evidence: reference to UUID_A)

If UUID_A evidence expires:
1. Revoke Cornerstone ID
2. CASCADE: Revoke all dependent credentials
3. Re-verify identity
4. Generate new evidence UUID_B
5. Re-issue Cornerstone ID with UUID_B
6. Re-issue dependent credentials (referencing UUID_B)
```

## 11. Implementation Checklist

### 11.1 For Credential Issuers

- [ ] Map all source data to canonical attribute names
- [ ] Validate attribute formats and types
- [ ] Implement cross-attribute validation rules
- [ ] Handle provincial variations for optional attributes
- [ ] Generate and store evidence UUIDs (5-year retention)
- [ ] Check prerequisite credentials before issuance
- [ ] Populate inherited attributes from prerequisites
- [ ] Set appropriate credential expiry (if applicable)

### 11.2 For Credential Verifiers

- [ ] Accept canonical attribute names
- [ ] Support backward compatibility for renamed attributes (with deprecation timeline)
- [ ] Validate attribute formats and business rules
- [ ] Check credential revocation status
- [ ] Verify prerequisite credential chain
- [ ] Implement selective disclosure UX
- [ ] Support ZK proofs for sensitive attributes
- [ ] Handle missing optional attributes gracefully

### 11.3 For Schema Designers

- [ ] Use canonical attribute names from this guide
- [ ] Document all provincial variations
- [ ] Mark optional vs required attributes clearly
- [ ] Specify data types precisely (with formats and enums)
- [ ] Include cross-attribute validation rules
- [ ] Design for inheritance from prerequisites
- [ ] Plan for schema versioning and migration
- [ ] Document privacy sensitivity levels

## 12. Quick Reference Tables

### 12.1 Attribute Source Quick Lookup

| Need to find... | Check this credential | Attribute name |
|----------------|----------------------|----------------|
| Person's legal name | Cornerstone ID | `given_names`, `family_name` |
| Person's birthdate | Cornerstone ID | `birthdate_dateint` |
| Property unique ID | Verified Homeowner | `pid` |
| Property address | Verified Homeowner | `property_address` |
| Advisor profession | Verified Advisor | `advisor_type` |
| Professional license | Verified Advisor | `license_number` |
| Network Partner ID | Verified Advisor, Portfolio Issuer | `npId` (within `networkPartner`) |
| Property authorization | PAAC | `property_id`, `data_scope`, `access_level` |

### 12.2 Inheritance Quick Lookup

| Want to inherit... | From credential | To credentials |
|-------------------|----------------|----------------|
| Identity attributes | Cornerstone ID | All dependent credentials |
| Property reference | Verified Homeowner | PAAC |
| Professional data | Verified Advisor | Portfolio Issuer |
| Evidence references | Any parent | Any child |

### 12.3 Update Impact Quick Lookup

| Attribute changed | Credential affected | Cascade impact |
|------------------|--------------------|--------------------|
| `given_names` | Cornerstone ID | ALL credentials revoked and re-issued |
| `property_address` | Verified Homeowner | Only this Home Credential, PAACs for this property revoked |
| `license_number` | Verified Advisor | Verified Advisor + Portfolio Issuer + all PAACs received |
| `specialties` | Verified Advisor | Verified Advisor only (re-issue with corrections) |
| `data_scope` | PAAC | Only this PAAC (re-issue with new scope) |
