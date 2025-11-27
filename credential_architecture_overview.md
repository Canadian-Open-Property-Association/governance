# Cornerstone Credential Architecture Overview

## 1. About this Document

This document provides a comprehensive overview of the Cornerstone credential ecosystem, showing how the five core credentials relate to each other, their dependencies, and their governance rules. This is a reference document for understanding the complete credential architecture.

**Intended Audience**: Technical architects, integration developers, governance administrators, and product managers working with Cornerstone credentials.

### 1.1 Version History

| Ver.    | Date        | Notes                                      | Author(s)       |
|---------|-------------|--------------------------------------------|-----------------|
| **1.0** | 24-Nov-2025 | Initial architecture overview              | Mathieu Glaude  |

## 2. Credential Ecosystem Overview

The Cornerstone platform uses five core verifiable credentials that form a hierarchical trust architecture. Each credential builds upon prerequisite credentials and enables specific capabilities within the platform.

### 2.1 The Five Core Credentials

| # | Credential Name | Technical Reference | Purpose | Issuer |
|---|-----------------|---------------------|---------|--------|
| 1 | **Cornerstone ID** | Person VC | Foundation identity credential for ALL users | Cornerstone Platform Inc. |
| 2 | **Verified Homeowner** | Home Credential, Home Ownership VC | Property-specific ownership credential | Cornerstone Platform Inc. |
| 3 | **Verified Advisor** | Professional VC | Professional identity and licensing credential | Network Partner (attested) |
| 4 | **Portfolio Issuer Credential** | Portfolio Issuer Capability | Capability to create property portfolios | Network Partner |
| 5 | **Property Access Authorization Credential (PAAC)** | Authorization VC, Letter of Authorization | Property-specific access authorization | Homeowner (to advisors) |

**Key Principle**: Cornerstone uses credential-based access control, not role-based access control (RBAC). Applications provision features based on which credentials users hold and present.

## 3. Credential Hierarchy

### 3.1 Complete Hierarchy Diagram

```
Cornerstone ID (Foundation - Required by ALL)
│
├── Home Credential (Verified Homeowner)
│   └── Property Access Authorization Credential (PAAC)
│       - Issued BY homeowner TO advisors
│       - One per property-specific trust network
│       - Grants access to property data
│
└── Verified Advisor Credential
    ├── Portfolio Issuer Credential (Capability)
    │   - Enables portfolio creation
    │   - Issued by Network Partner
    │
    └── Property Access Authorization Credential (PAAC)
        - Received FROM homeowners
        - Enables access to homeowner's property data
        - One PAAC per property relationship
```

### 3.2 Hierarchy Explanation

**Layer 1 - Foundation**:
- **Cornerstone ID**: Required by ALL users. This is the base identity layer that every other credential depends on.

**Layer 2 - Role Credentials**:
- **Verified Homeowner**: Role-based credential for property owners. Property-specific (one credential per property).
- **Verified Advisor**: Role-based credential for real estate professionals, mortgage brokers, lawyers, financial advisors, etc.

**Layer 3 - Capability Credentials**:
- **Portfolio Issuer Credential**: Capability granted to advisors enabling portfolio management features.

**Layer 4 - Authorization Credentials**:
- **Property Access Authorization Credential (PAAC)**: Relationship-specific authorization issued by homeowners to advisors for specific properties.

## 4. Prerequisite Dependencies

### 4.1 Dependency Matrix

| Credential | Requires | Optional Prerequisites | Enables Issuance Of |
|-----------|----------|------------------------|---------------------|
| **Cornerstone ID** | None (foundation) | N/A | All other credentials |
| **Verified Homeowner** | Cornerstone ID | N/A | PAAC (as issuer) |
| **Verified Advisor** | Cornerstone ID | N/A | PAAC (as recipient), Portfolio Issuer |
| **Portfolio Issuer** | Cornerstone ID + Verified Advisor | N/A | N/A |
| **PAAC** | Cornerstone ID (both parties) | Issuer: Verified Homeowner<br/>Recipient: Verified Advisor | N/A |

### 4.2 Issuance Authority Patterns

Different credentials have different issuance patterns:

1. **Centralized Issuance** (Cornerstone Platform Inc.):
   - Cornerstone ID
   - Verified Homeowner

2. **Attested Issuance** (Network Partners):
   - Verified Advisor (NP attests to professional's licensing)
   - Portfolio Issuer Credential (NP grants capability)

3. **Decentralized Issuance** (Credential Holders):
   - PAAC (issued by homeowners to advisors)

## 5. Cascade Revocation Rules

Cascade revocation ensures that when prerequisite credentials are revoked, all dependent credentials are automatically revoked to maintain trust chain integrity.

### 5.1 Complete Cascade Revocation Matrix

| Credential Revoked | Immediate Cascade | Secondary Cascade | Tertiary Cascade |
|-------------------|-------------------|-------------------|------------------|
| **Cornerstone ID** | - Verified Homeowner<br/>- Verified Advisor<br/>- Portfolio Issuer<br/>- All PAACs (issued or received) | - All PAACs for revoked homeowner's properties<br/>- All PAACs received by revoked advisor | N/A |
| **Verified Homeowner** | - All PAACs for this specific property | N/A | N/A |
| **Verified Advisor** | - Portfolio Issuer Credential<br/>- All PAACs received by this advisor | N/A | N/A |
| **Portfolio Issuer** | None (no dependent credentials) | N/A | N/A |
| **PAAC** | None (leaf credential) | N/A | N/A |

### 5.2 Property-Specific Cascade Rules

**Important**: Verified Homeowner credentials are property-specific. Cascade rules apply per property:

- **Single Property Revocation**: When one Home Credential is revoked, only PAACs for THAT property are revoked
- **Multiple Property Protection**: Other properties owned by the same homeowner remain unaffected
- **Trust Network Isolation**: Each property has its own trust network with separate PAACs

**Example Scenario**:
```
Homeowner owns 3 properties:
- Property A: Home Credential A → PAAC-A1 (to Advisor 1), PAAC-A2 (to Advisor 2)
- Property B: Home Credential B → PAAC-B1 (to Advisor 1), PAAC-B3 (to Advisor 3)
- Property C: Home Credential C → PAAC-C2 (to Advisor 2)

If Home Credential B is revoked:
- PAAC-B1 and PAAC-B3 are automatically revoked
- Home Credentials A and C remain valid
- PAACs A1, A2, C2 remain valid
```

### 5.3 Cascade Revocation Decision Tree

```
Is Cornerstone ID revoked?
├── YES → Revoke ALL credentials (Homeowner + Advisor + Portfolio Issuer + all PAACs)
└── NO → Continue

Is Verified Homeowner revoked for property X?
├── YES → Revoke all PAACs for property X only
└── NO → Continue

Is Verified Advisor revoked?
├── YES → Revoke Portfolio Issuer + all PAACs received by this advisor
└── NO → Continue

Is Portfolio Issuer revoked?
├── YES → No cascade (leaf capability)
└── NO → Continue

Is PAAC revoked?
└── YES → No cascade (leaf authorization)
```

## 6. Credential Lifecycle

### 6.1 Issuance Lifecycle

Each credential follows a standard lifecycle with verification, issuance, and maintenance phases:

```
Request → Verification → Issuance → Active → [Update/Revoke] → Re-issuance
```

**Phase Details**:

1. **Request**: Holder initiates credential request via Cornerstone platform
2. **Verification**: Issuer validates prerequisites and evidence
3. **Issuance**: Credential issued to holder's Cornerstone Wallet
4. **Active**: Credential can be presented to verifiers
5. **Update/Revoke**: Changes require revocation and re-issuance
6. **Re-issuance**: New credential issued after re-verification

### 6.2 Evidence Retention

All credentials include evidence attributes documenting verification sources:

- **FINTRAC Compliance**: Evidence retained for 5 years minimum
- **Evidence Format**: UUID references with source, author, and verification date
- **Evidence Types**:
  - Identity evidence (IDV sources)
  - Title evidence (land registry checks)
  - Licensing evidence (regulatory body verification)
  - Attestation evidence (Network Partner attestations)

### 6.3 Revocation Triggers

Common revocation triggers across credentials:

| Trigger Category | Examples | Applies To |
|-----------------|----------|------------|
| **Prerequisite Revoked** | Cornerstone ID revoked | All dependent credentials |
| **Data Changed** | Property sold, license expired, employment ended | Role/capability credentials |
| **Fraud Detected** | Identity fraud, falsified documents | All credentials |
| **Holder Request** | Correction needed, voluntary revocation | All credentials |
| **Regulatory Request** | Compliance investigation, legal order | All credentials |
| **Relationship Ended** | Advisor-client relationship terminated | PAAC |

## 7. Data Governance

### 7.1 Data Sources by Credential

| Credential | Identity Data | Property/Professional Data | Attestation Data |
|-----------|---------------|----------------------------|------------------|
| **Cornerstone ID** | Interac IVS or BC Person Credential | N/A | N/A |
| **Verified Homeowner** | Cornerstone ID (inherited) | Provincial Land Title Registry | N/A |
| **Verified Advisor** | Cornerstone ID (inherited) | Provincial Regulatory Bodies (BCFSA, RECO, etc.) | Network Partner |
| **Portfolio Issuer** | Verified Advisor (inherited) | N/A | Network Partner |
| **PAAC** | Cornerstone ID (both parties) | Home Credential (property reference) | Homeowner |

### 7.2 Data Minimization

Cornerstone implements data minimization principles:

- **Selective Disclosure**: Holders choose which attributes to share
- **Zero-Knowledge Proofs**: Age verification without revealing birthdate
- **Scope Limitation**: PAACs specify exact data categories shared
- **Purpose Binding**: Credentials used only for stated purposes

### 7.3 Provincial Variations

**Verified Advisor Credential** handles provincial regulatory variations:

- **Flexible Schema**: Optional fields for province-specific data
- **Clear Documentation**: Fields marked "optional - may not be provided by all regulators"
- **Provincial Examples**:
  - BC (BCFSA): Provides license number, effective date, expiry date, licensed-for categories
  - Ontario (RECO): May provide different field sets
  - Quebec (OACIQ): May have unique licensing attributes

## 8. Integration Patterns

### 8.1 Credential Presentation Flow

Standard flow for credential-based authorization:

```
1. User accesses platform feature
2. Application requests credential(s)
3. User selects credential from Cornerstone Wallet
4. User authorizes presentation (selective disclosure)
5. Application verifies credential(s)
6. Application provisions features based on credential policies
7. User accesses authorized features
```

### 8.2 Multi-Credential Authorization

Some operations require multiple credentials:

**Example 1: Portfolio Creation**
- Required: Cornerstone ID + Verified Advisor + Portfolio Issuer
- Logic: `IF (valid Cornerstone ID) AND (valid Verified Advisor) AND (valid Portfolio Issuer) THEN authorize portfolio creation`

**Example 2: Property Data Access**
- Required: Cornerstone ID + PAAC for specific property
- Logic: `IF (valid Cornerstone ID) AND (valid PAAC for property X) THEN authorize access to property X data`

**Example 3: Trust Network Management**
- Required: Cornerstone ID + Verified Homeowner for specific property
- Logic: `IF (valid Cornerstone ID) AND (valid Verified Homeowner for property X) THEN authorize PAAC issuance for property X`

### 8.3 Verification Requirements

Verifiers should validate:

1. **Cryptographic Validity**: Signature verification, issuer DID resolution
2. **Revocation Status**: Check revocation registry
3. **Temporal Validity**: Not expired (if expiry present)
4. **Issuer Trust**: Issuer on approved trust list
5. **Prerequisite Chain**: Prerequisites valid (if cascade revocation implemented)
6. **Attribute Requirements**: Required attributes present and match policy

## 9. Governance and Compliance

### 9.1 Schema Governance

- **Schema Registry**: Cornerstone Network Trust Registry
- **Versioning**: Semantic versioning (breaking changes = new schema)
- **Change Management**: Governance process for schema updates
- **Backwards Compatibility**: Applications must support schema versions

### 9.2 Issuer Trust

- **Trust Framework**: Layer 3 COPA (Cooperative Platform Association) governance
- **Trust Lists**: Approved issuers registered in trust registry
- **Issuer Types**:
  - Platform Issuer (Cornerstone Platform Inc.)
  - Network Partner Issuers (attested credentials)
  - Holder Issuers (PAACs)

### 9.3 Regulatory Compliance

- **FINTRAC**: Dual-process verification, 5-year evidence retention
- **Privacy**: PIPEDA compliance, data minimization, consent-based sharing
- **Provincial Regulations**: Real estate, mortgage, financial services licensing requirements
- **W3C Standards**: W3C Verifiable Credentials Data Model compliance

## 10. Credential Attributes Cross-Reference

### 10.1 Shared Attributes Across Credentials

Common attributes inherited or repeated across credentials:

| Attribute | Cornerstone ID | Verified Homeowner | Verified Advisor | Portfolio Issuer | PAAC |
|-----------|----------------|-------------------|------------------|------------------|------|
| `given_names` | ✓ (source) | ✓ (inherited) | ✓ (inherited) | ✓ (inherited) | ✓ (both parties) |
| `family_name` | ✓ (source) | ✓ (inherited) | ✓ (inherited) | ✓ (inherited) | ✓ (both parties) |
| `birthdate_dateint` | ✓ (source) | ✓ (inherited) | ✓ (inherited) | ✓ (inherited) | - |
| `verified_email` | ✓ (source) | ✓ (inherited) | ✓ (inherited) | ✓ (inherited) | ✓ (both parties) |
| `pid` | - | ✓ (source) | - | - | ✓ (property reference) |
| `npId` | - | - | ✓ (source) | ✓ (source) | - |
| `identity_evidence` | ✓ (source) | ✓ (reference) | ✓ (reference) | ✓ (reference) | ✓ (reference) |

### 10.2 Unique Attributes by Credential

Attributes specific to each credential type:

**Cornerstone ID**:
- Core identity attributes (source of truth for name, birthdate, email)

**Verified Homeowner**:
- Property attributes: `property_address`, `jurisdiction`, `purchase_price`, `purchase_date`, `year_built`, `effective_year`, `neighbourhood`
- Ownership evidence: `title_evidence`

**Verified Advisor**:
- Professional attributes: `advisor_type`, `domain`, `specialization`, `license_number`, `licence_status`, `regulator_name`
- Location attributes: `office_hq_location`, `service_region`
- Practice attributes: `specialties`, `service_areas`, `years_experience`
- Network attributes: `networkPartner` (npId, npName, affiliationDate)

**Portfolio Issuer**:
- Capability attributes: `canIssuePortfolios`, `issuer_type`, `scope`, `max_portfolios`

**PAAC**:
- Authorization attributes: `property_id`, `data_scope`, `access_level`, `purpose`, `valid_from`, `valid_until`
- Relationship attributes: `issuer_did`, `recipient_did`

## 11. Future Extensions

This architecture is designed to be extensible. Potential future credentials:

- **Verified Tenant**: Tenant identity and rental history
- **Property Inspector**: Licensed inspector credential
- **Appraiser Credential**: Licensed property appraiser
- **Contractor Credential**: Licensed contractor/tradesperson
- **Insurance Provider**: Insurance company authorization
- **Lender Credential**: Financial institution authorization

**Extension Principles**:
- New credentials should fit into existing hierarchy
- Maintain prerequisite dependency chain
- Follow cascade revocation patterns
- Use standardized attribute naming
- Document provincial variations
- Include evidence attributes
