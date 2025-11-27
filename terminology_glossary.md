# Cornerstone Credential Terminology Glossary

## 1. About this Document

This glossary provides a comprehensive mapping between terms used in the Cornerstone Identity, Persona, and Access Model and the terms used in credential governance documents. It serves as a reference for maintaining consistency across documentation and communication.

**Purpose**:
- Map Identity Model terminology to credential governance terminology
- Define canonical attribute names
- Clarify internal/technical vs external/marketing terminology
- Provide cross-references for documentation alignment

**Intended Audience**: Technical writers, product managers, developers, governance administrators, and anyone working across Cornerstone documentation.

### 1.1 Version History

| Ver.    | Date        | Notes                          | Author(s)       |
|---------|-------------|--------------------------------|-----------------|
| **1.0** | 24-Nov-2025 | Initial terminology glossary   | Mathieu Glaude  |

## 2. Credential Name Mappings

### 2.1 Primary Credential Names

This table shows how credentials are referred to across different contexts:

| Identity Model Term | Credential Governance Name | Technical Reference | Marketing/External Name | Abbreviation |
|--------------------|---------------------------|---------------------|------------------------|--------------|
| **Person VC** | Cornerstone ID | Person VC, Cornerstone ID Credential | Cornerstone ID | CID |
| **Home Ownership VC** | Verified Homeowner | Home Credential, HomeCredential | Verified Homeowner, Home Credential | HC |
| **Professional VC** | Verified Advisor | Advisor Credential, Professional VC | Verified Advisor Certificate | VAC |
| **Portfolio Issuer Capability** | Portfolio Issuer Credential | Portfolio Issuer, PI Credential | Portfolio Issuer | PIC |
| **Authorization VC** | Property Access Authorization Credential | PAAC, Letter of Authorization (deprecated) | Property Access Authorization | PAAC |

### 2.2 Usage Guidelines

**When to use each term**:

1. **Identity Model Term**: Use when referencing the conceptual model or discussing architecture at the system level
   - Example: "The Identity Model defines five core VCs including the Person VC"

2. **Credential Governance Name**: Use in governance documents, technical specifications, and schema definitions
   - Example: "The Cornerstone ID credential schema includes the following attributes"

3. **Technical Reference**: Use in code, API documentation, and technical implementations
   - Example: `credential_type: "HomeCredential"`

4. **Marketing/External Name**: Use in user-facing materials, product documentation, and communications
   - Example: "You've earned your Verified Homeowner credential!"

### 2.3 Deprecated Terms

| Deprecated Term | Replaced By | Reason for Change | Migration Status |
|----------------|-------------|-------------------|------------------|
| Letter of Authorization | Property Access Authorization Credential (PAAC) | More precise technical naming, aligns with W3C VC patterns | In progress |
| Professional Credential | Verified Advisor Credential | Easier to expand from specific types to general category | Completed |
| Professional VC | Verified Advisor | Naming consistency with other credentials | Completed |
| Home Ownership VC | Verified Homeowner (with "Home Credential" as synonym) | User-friendly naming while maintaining technical reference | Completed |

## 3. Persona and Role Mappings

### 3.1 Persona Definitions

| Identity Model Persona | Credentials Required | Platform Role | Description |
|-----------------------|---------------------|---------------|-------------|
| **Homeowner** | Cornerstone ID + Verified Homeowner | Property Owner | Individual who owns residential property, can issue PAACs |
| **Advisor** | Cornerstone ID + Verified Advisor | Professional Service Provider | Real estate professionals, mortgage brokers, lawyers, financial advisors, etc. |
| **Portfolio Issuer** | Cornerstone ID + Verified Advisor + Portfolio Issuer | Portfolio Manager | Advisor with capability to create property portfolios |
| **Trust Network Member** | Cornerstone ID + PAAC (received) | Authorized Advisor | Advisor who has been granted access to specific property data |
| **Network Partner** | Organization-level credential (future) | Service Provider Network | Organizations that attest to advisor credentials |

### 3.2 Persona-Credential Relationship

```
PERSONA = Identity + Role(s) + Capability(s) + Authorization(s)

Examples:
- Basic Homeowner = Cornerstone ID + Verified Homeowner
- Portfolio-Enabled Advisor = Cornerstone ID + Verified Advisor + Portfolio Issuer
- Trust Network Advisor = Cornerstone ID + Verified Advisor + PAAC (for property X)
- Multi-Property Homeowner = Cornerstone ID + Multiple Verified Homeowner credentials
```

## 4. Attribute Name Mappings

### 4.1 Identity Attributes

| Canonical Attribute Name | Alternative Names | Data Type | Source Credential | Description |
|-------------------------|-------------------|-----------|-------------------|-------------|
| `given_names` | first_name, givenName, firstName | String | Cornerstone ID | Legal given names |
| `family_name` | last_name, surname, familyName, lastName | String | Cornerstone ID | Legal family name/surname |
| `birthdate_dateint` | date_of_birth, dob, birthDate | Integer (YYYYMMDD) | Cornerstone ID | Date of birth for ZK proofs |
| `verified_email` | email, email_address, emailAddress | String | Cornerstone ID | Email verified via OTP |

### 4.2 Property Attributes

| Canonical Attribute Name | Alternative Names | Data Type | Source Credential | Description |
|-------------------------|-------------------|-----------|-------------------|-------------|
| `pid` | parcel_id, parcelId, property_identifier | String | Verified Homeowner | Unique Parcel Identifier |
| `property_address` | address, civic_address, propertyAddress | JSON object | Verified Homeowner | Standardized postal address |
| `jurisdiction` | municipality, city, local_authority | String | Verified Homeowner | Municipal jurisdiction |
| `purchase_price` | sale_price, lastSalePrice, purchasePrice | Number | Verified Homeowner | Last recorded sale price |
| `purchase_date` | sale_date, lastSaleDate, purchaseDate | Date (ISO 8601) | Verified Homeowner | Date of last sale |
| `year_built` | construction_year, yearBuilt, builtYear | Integer | Verified Homeowner | Original construction year |
| `effective_year` | renovation_year, effectiveYear, renovatedYear | Integer | Verified Homeowner | Renovation-adjusted year |
| `neighbourhood` | area, district, community, neighbourhoodName | String | Verified Homeowner | Recognized neighbourhood |

### 4.3 Professional/Advisor Attributes

| Canonical Attribute Name | Alternative Names | Data Type | Source Credential | Description |
|-------------------------|-------------------|-----------|-------------------|-------------|
| `advisor_type` | professional_type, profession, advisorType | String (enum) | Verified Advisor | Type of advisor (REALTOR, MORTGAGE_BROKER, etc.) |
| `domain` | industry, sector, professionalDomain | String (enum) | Verified Advisor | Professional domain (REAL_ESTATE, MORTGAGE, etc.) |
| `specialization` | specialty, focus, specializationArea | String (enum) | Verified Advisor | Primary specialization |
| `license_number` | licence_number, licenseNumber, licenceNumber | String | Verified Advisor | Professional license number |
| `regulator_name` | regulatory_body, regulatorName, licensor | String | Verified Advisor | Provincial regulatory body |
| `office_hq_location` | office_location, headquarters, officeLocation | JSON object | Verified Advisor | Office headquarters city/province |
| `service_region` | service_area, territory, serviceRegion | JSON object | Verified Advisor | Geographic service territory |
| `npId` | network_partner_id, partnerId, networkPartnerId | String (UUID) | Verified Advisor, Portfolio Issuer | Network Partner identifier |

### 4.4 Authorization Attributes

| Canonical Attribute Name | Alternative Names | Data Type | Source Credential | Description |
|-------------------------|-------------------|-----------|-------------------|-------------|
| `property_id` | pid_reference, propertyId, property_identifier | String (UUID) | PAAC | Property this authorization applies to |
| `data_scope` | permissions, scope, dataCategories | JSON array | PAAC | Data categories authorized: identity, ownership, equity, insurance |
| `access_level` | permission_level, accessLevel, authorizationLevel | String (enum) | PAAC | READ_ONLY, OPERATIONAL, ADVISORY, TRANSACTIONAL |
| `purpose` | reason, authorization_purpose, purposeOfAccess | String | PAAC | Purpose for data access |
| `valid_from` | start_date, validFrom, effectiveDate | DateTime (ISO 8601) | PAAC | Authorization start date |
| `valid_until` | expiry_date, validUntil, expirationDate | DateTime (ISO 8601) | PAAC | Authorization expiry date |

### 4.5 Evidence Attributes

| Canonical Attribute Name | Alternative Names | Data Type | All Credentials | Description |
|-------------------------|-------------------|-----------|-----------------|-------------|
| `identity_evidence` | idv_evidence, identityEvidence, verificationEvidence | String/URI (UUID) | All | UUID reference to identity verification evidence |
| `title_evidence` | ownership_evidence, titleEvidence, propertyEvidence | String/URI (UUID) | Verified Homeowner | UUID reference to land title evidence |
| `licensing_evidence` | regulatory_evidence, licensingEvidence, professionalEvidence | String/URI (UUID) | Verified Advisor | UUID reference to licensing verification |
| `attestation_evidence` | np_attestation, attestationEvidence, partnerAttestation | String/URI (UUID) | Verified Advisor, Portfolio Issuer | UUID reference to Network Partner attestation |

## 5. Governance and Process Terms

### 5.1 Credential Lifecycle Terms

| Term | Definition | Related Terms | Usage Context |
|------|------------|---------------|---------------|
| **Issuance** | Process of creating and delivering a credential to a holder's wallet | Issue, Grant, Provision | "Cornerstone issues the Verified Homeowner credential" |
| **Presentation** | Holder shares credential with verifier | Share, Provide, Submit | "User presents their Cornerstone ID to access platform" |
| **Verification** | Verifier checks cryptographic validity and trust | Validate, Authenticate, Check | "Application verifies the credential signature" |
| **Revocation** | Credential is marked as no longer valid | Invalidate, Cancel, Withdraw | "Home Credential revoked when property sold" |
| **Cascade Revocation** | Automatic revocation of dependent credentials | Transitive Revocation, Chain Revocation | "Cornerstone ID revocation triggers cascade" |
| **Re-issuance** | Issuing new credential after revocation | Reissue, Update, Renew | "Re-issuance required for corrected data" |

### 5.2 Architectural Terms

| Term | Definition | Related Terms | Usage Context |
|------|------------|---------------|---------------|
| **Prerequisite Credential** | Credential that must exist before another can be issued | Dependency, Required Credential | "Cornerstone ID is prerequisite for all credentials" |
| **Dependent Credential** | Credential that requires another credential to exist | Child Credential, Subordinate Credential | "PAAC is dependent on Home Credential" |
| **Foundation Credential** | Base-layer credential (Cornerstone ID) | Root Credential, Base Identity | "Cornerstone ID is the foundation credential" |
| **Role Credential** | Credential representing user role (Homeowner, Advisor) | Persona Credential, Identity Credential | "Verified Advisor is a role credential" |
| **Capability Credential** | Credential granting specific capability | Permission Credential, Enablement Credential | "Portfolio Issuer is a capability credential" |
| **Authorization Credential** | Credential authorizing access to specific resource | Access Credential, Permission Credential | "PAAC is an authorization credential" |
| **Property-Specific Trust Network** | Set of advisors authorized for one property | Trust Circle, Authorized Network | "Each Home Credential has its own trust network" |

### 5.3 Technical Implementation Terms

| Term | Definition | Related Terms | Usage Context |
|------|------------|---------------|---------------|
| **Credential Schema** | JSON schema defining credential structure | VC Schema, Credential Type Definition | "Verified Homeowner schema v1.0" |
| **Credential Definition** | Ledger-specific implementation of schema | Cred Def, Schema Instance | "Credential definition ID: cornerstone:3:CL:12345" |
| **DID** | Decentralized Identifier | did:web, did:key, Decentralized ID | "Issuer DID: did:web:cornerstone.ca" |
| **Trust Registry** | Registry of approved issuers and schemas | Trust List, Issuer Registry | "Cornerstone Network Trust Registry" |
| **OCA Bundle** | Overlays Capture Architecture bundle | Semantic Overlay, Presentation Layer | "Verified Homeowner OCA Bundle" |
| **Selective Disclosure** | Sharing only required attributes | Privacy-Preserving Disclosure, Minimal Disclosure | "Holder selects which attributes to share" |
| **Zero-Knowledge Proof** | Prove statement without revealing data | ZK Proof, ZKP, Range Proof | "Prove age > 18 without revealing birthdate" |

### 5.4 Governance Terms

| Term | Definition | Related Terms | Usage Context |
|------|------------|---------------|---------------|
| **COPA** | Cooperative Platform Association (Layer 3 governance) | Governance Layer, Trust Framework | "COPA manages badge schemas and trust lists" |
| **Network Partner (NP)** | Organization attesting to advisor credentials | Service Provider, Partner Organization | "Royal LePage is a Network Partner" |
| **Issuer** | Entity that issues credentials | Credential Authority, Issuing Authority | "Cornerstone Platform Inc. is the issuer" |
| **Holder** | Individual who possesses credential in wallet | Credential Owner, Subject | "Homeowner is the holder of Home Credential" |
| **Verifier** | Entity that checks credential validity | Relying Party, Validator | "Lender is the verifier of Verified Homeowner" |
| **Attested Credential** | Credential issued by one party based on another's attestation | Delegated Credential, NP-Attested | "Verified Advisor is NP-attested" |

## 6. Provincial Regulatory Terms

### 6.1 Provincial Bodies

| Abbreviation | Full Name | Province | Regulates | Terminology Notes |
|-------------|-----------|----------|-----------|-------------------|
| **BCFSA** | BC Financial Services Authority | British Columbia | Real estate, mortgage, insurance | Uses "licence" (British spelling) |
| **RECO** | Real Estate Council of Ontario | Ontario | Real estate | Uses "license" (American spelling) |
| **OACIQ** | Organisme d'autoréglementation du courtage immobilier du Québec | Quebec | Real estate | French language, different structure |
| **RECA** | Real Estate Council of Alberta | Alberta | Real estate | Similar to RECO |
| **MBLAA** | Mortgage Brokers and Lenders Association of BC | British Columbia | Mortgage brokers | Industry association |

### 6.2 Licensing Terms by Province

| Term | BC | Ontario | Quebec | Notes |
|------|----|---------| -------|-------|
| **License/Licence** | licence | license | permis | Spelling varies |
| **Licensee** | licensee | licensee | titulaire de permis | French equivalent |
| **Broker** | managing broker | broker | courtier | Role definitions vary |
| **Salesperson/Agent** | representative | salesperson | agent immobilier | Title varies significantly |
| **Brokerage** | brokerage | brokerage | agence immobilière | Company structure |

## 7. Data Source Terms

### 7.1 Identity Verification Sources

| Term | Full Name | Description | Used In |
|------|-----------|-------------|---------|
| **Interac IVS** | Interac Identity Verification Service | Bank-based identity verification | Cornerstone ID |
| **BC Person Credential** | BC Government Person Credential | Government-issued digital ID | Cornerstone ID |
| **FINTRAC** | Financial Transactions and Reports Analysis Centre of Canada | Financial intelligence and AML/KYC compliance | All credentials (evidence retention) |
| **Dual-Process Verification** | Two independent verification methods | FINTRAC requirement for high assurance | Cornerstone ID, Verified Homeowner |

### 7.2 Property Data Sources

| Term | Full Name | Description | Used In |
|------|-----------|-------------|---------|
| **Land Title Registry** | Provincial Land Title and Survey Authority | Official property ownership records | Verified Homeowner |
| **Landcor** | Landcor Data Corporation | Property data aggregator | Verified Homeowner |
| **PID** | Parcel Identifier | 9-digit unique property identifier | Verified Homeowner |
| **Title Search** | Land Title Office search | Official ownership verification | Verified Homeowner |

## 8. Access Control Terms

### 8.1 Access Control Models

| Term | Definition | Cornerstone Usage | Alternative Models |
|------|------------|-------------------|-------------------|
| **Credential-Based Access Control** | Authorization based on credentials held | PRIMARY MODEL - used throughout platform | RBAC, ABAC |
| **RBAC** | Role-Based Access Control | NOT USED - credentials replace roles | Traditional IAM |
| **ABAC** | Attribute-Based Access Control | Partially used - attributes within credentials | Policy-based systems |
| **Policy-Driven Access** | Access decisions based on policy rules | Used with credential-based model | Rules engines |

### 8.2 Access Levels (PAAC)

| Level | Abbreviation | Description | Example Use Case |
|-------|--------------|-------------|------------------|
| **READ_ONLY** | RO | View property data only | Viewing property details for initial quote |
| **OPERATIONAL** | OP | View and perform routine operations | Managing ongoing insurance policy |
| **ADVISORY** | AD | View and provide professional advice | Real estate agent advising on sale |
| **TRANSACTIONAL** | TX | View and execute transactions | Lawyer conducting property transfer |

### 8.3 Data Scopes (PAAC)

| Scope | Description | Typical Attributes | Who Needs It |
|-------|-------------|-------------------|--------------|
| **identity** | Homeowner identity data | given_names, family_name, birthdate, email | All advisors |
| **ownership** | Property ownership data | pid, property_address, purchase_date, purchase_price | Real estate agents, lawyers |
| **equity** | Home equity and valuation | property_value, mortgage_balance, equity_amount | Mortgage brokers, financial advisors |
| **insurance** | Insurance policy data | policy_number, coverage, premium, claims_history | Insurance brokers |

## 9. Communication Guidelines

### 9.1 Internal vs External Terminology

**Internal (Technical Teams)**:
- Use canonical attribute names (`given_names`, `family_name`)
- Use technical credential references (Person VC, HomeCredential)
- Use abbreviations (PAAC, CID, HC)
- Use precise governance terms (cascade revocation, prerequisite credential)

**External (Users, Marketing)**:
- Use friendly credential names (Cornerstone ID, Verified Homeowner)
- Use natural language (first name, last name)
- Avoid abbreviations unless well-established
- Use simple explanations (when your Cornerstone ID is removed, all related credentials are also removed)

### 9.2 Cross-Document References

When referencing credentials in documentation:

1. **First mention**: Use full name with parenthetical reference
   - Example: "The Verified Homeowner credential (Home Credential)"

2. **Subsequent mentions**: Use most appropriate term for context
   - Technical docs: "Home Credential" or "HomeCredential"
   - User docs: "Verified Homeowner"

3. **Code/API**: Always use technical reference consistently
   - Example: `credential_type: "HomeCredential"`

## 10. Mapping Tables for Migration

### 10.1 Old → New Credential Names

| Old Name | New Name | Status | Migration Actions |
|----------|----------|--------|-------------------|
| Professional Credential | Verified Advisor Credential | Complete | Update all documentation references |
| Letter of Authorization | Property Access Authorization Credential (PAAC) | In Progress | Update governance docs, maintain backward compatibility in code |
| Professional VC | Verified Advisor | Complete | Schema updated |
| Real Estate Professional | Verified Advisor (type: REALTOR) | Complete | Consolidated into single schema |

### 10.2 Attribute Name Standardization

| Old Attribute | New Attribute | Affected Credentials | Migration Strategy |
|--------------|---------------|---------------------|-------------------|
| `first_name` | `given_names` | Cornerstone ID | Accept both, prefer `given_names` |
| `last_name` | `family_name` | Cornerstone ID | Accept both, prefer `family_name` |
| `dob` | `birthdate_dateint` | Cornerstone ID | Convert format during migration |
| `parcel_id` | `pid` | Verified Homeowner | Standardize to `pid` |
| `professional_type` | `advisor_type` | Verified Advisor | Enum mapping required |

## 11. Quick Reference

### 11.1 Credential Name Quick Lookup

| Looking For | Use This Term |
|-------------|--------------|
| Base identity for all users | Cornerstone ID |
| Property ownership proof | Verified Homeowner or Home Credential |
| Professional advisor identity | Verified Advisor |
| Portfolio creation capability | Portfolio Issuer Credential |
| Property access authorization | PAAC (Property Access Authorization Credential) |

### 11.2 Common Attribute Quick Lookup

| Looking For | Use This Attribute |
|-------------|-------------------|
| Person's legal name | `given_names`, `family_name` |
| Person's birthdate | `birthdate_dateint` |
| Property unique identifier | `pid` |
| Property street address | `property_address` |
| Professional license number | `license_number` |
| Network Partner ID | `npId` |
| Property-specific authorization | `property_id` (in PAAC) |

### 11.3 Quick Decision Tree: Which Term to Use?

```
Are you writing...
├── Code/API documentation?
│   └── Use technical reference (HomeCredential, Person VC)
├── Governance/Schema docs?
│   └── Use canonical credential name (Verified Homeowner, Cornerstone ID)
├── User-facing content?
│   └── Use marketing name (Verified Homeowner, Cornerstone ID)
└── Architecture diagrams?
    └── Use abbreviation (HC, CID, VAC, PAAC)
```
