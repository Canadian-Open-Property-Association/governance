# Verified Homeowner – Credential Documentation

## 1. About this Document

This document describes the **Verified Homeowner** verifiable credential to help potential verifiers determine whether it is suitable for their needs. The intended audience includes real estate professionals, lenders, insurers, municipalities, and financial service providers.

The Verified Homeowner Credential is issued by **Cornerstone Platform Inc.**, to Canadian Homeowners, and represents authoritative proof of homeownership derived from the provincial land title registry, combined with high-assurance identity verification sources.

### 1.1 Version History

| Ver.      | Date        | Notes                               | Author(s) |
|-----------|-------------|-------------------------------------|-------------|
| **0.3**   | 29-Sep-2025  | Updated credential schema information based on available attributes from Landcor             | Mathieu Glaude    |
| **0.2**   | 3-Sep-2025  | Simplified and reformatted document                       | Mathieu Glaude    |
| **0.1**   | 20-Aug-2025  | Initial draft                       | Mathieu Glaude    |

## 2. Credential Overview

The Verified Homeowner Credential is a verifiable credential (VC) issued to individuals who are confirmed as registered property owners in the provincial land-title registry. It enables the holder to prove both their identity and their ownership of a property while sharing only the minimum data required.

**External terminology note**: This credential is referred to as "Verified Homeowner" or "Home Credential" in technical specifications, and corresponds to the "Home Ownership VC" or "HomeCredential" referenced in the Cornerstone Identity, Persona, and Access Model.

Each issuance is backed by **FINTRAC-compliant dual-process checks**:
- Interac Bank Verification or BC Person Credential, and
- Land Title name-and-address match.

The credential is issued directly into the **Cornerstone Wallet** and can be consumed by relying parties without requiring them to re-run identity checks.

|              |                                                                 |
|--------------|-----------------------------------------------------------------|
| **Credential:** | Verified Homeowner                                            |
| **Schema:**     | Verified Homeowner v1.0                                       |
| **Issuer:**     | Cornerstone Platform Inc. <br/> [https://cornerstone.ca](https://cornerstone.ca) |
| **Issuer DID:** | TBA (e.g., `did:web:cornerstone.ca`)                          |

### 2.1 Prerequisite Credentials

**Required Before Issuance:**
- **Cornerstone ID** (base identity credential) - ALL users must hold this first

**Credential Hierarchy:**
```
Cornerstone ID (foundation)
└── Home Credential (Verified Homeowner) - THIS CREDENTIAL
    └── Property Access Authorization Credential (PAAC) - can be issued by homeowner to trust network members
```

**Important**: This credential represents ownership of a **specific property**. Homeowners who own multiple properties receive **separate Home Credentials for each property**—one credential per property owned. Each property has its own property-specific trust network.

### 2.2 Attribute Summary

| **#**       | **Name**          | **Attribute**        | **Data Type** | **Notes** |
|-------------|-------------------|----------------------|---------------|-----------|
| 001         | Given Names       | `given_names`        | String        | Legal given names. |
| 002         | Family Name       | `family_name`        | String        | Legal family/surname. |
| 003         | Date of Birth     | `birthdate_dateint`  | Integer       | `YYYYMMDD` for ZK proofs. |
| 004         | Verified Email    | `verified_email`     | String        | Verified via OTP or equivalent. |
| 005         | PID               | `pid`                | String        | Unique Parcel Identifier; essential anchor for linking data across systems and avoiding redundant searches. |
| 006         | Property Address  | `property_address`   | JSON object   | Standardized postal address; needed for quoting, underwriting, and service delivery. |
| 007         | Jurisdiction      | `jurisdiction`       | String        | Municipality name; required in most regulatory and financial processes. |
| 008         | Purchase Price    | `purchase_price`     | Number        | Historical sale price; useful for fraud checks, appraisals, and loan risk. |
| 009         | Purchase Date     | `purchase_date`      | Date          | Date of last sale; helps validate ownership timeline and market behaviour. |
| 010         | Year Built        | `year_built`         | Integer       | Core input for replacement cost models; older homes often higher risk. |
| 011         | Effective Year    | `effective_year`     | Integer       | Renovation-adjusted year; captures material updates that affect insurability. |
| 012         | Neighbourhood     | `neighbourhood`      | String        | Recognized community name; key for market value and comparables. |
| 013         | Identity Evidence | `identity_evidence`  | String / URI  | UUID + source of IDV evidence. |
| 014         | Title Evidence    | `title_evidence`     | String / URI  | UUID + source of title evidence. |


## 3. Credential Details

### 3.1 Issuer

The Verified Homeowner Credential is issued by **Cornerstone Platform Inc.**, acting as the credential authority. Each credential is issued only after both identity and title checks are successfully completed.

### 3.2 Schema and Credential Definition Governance

The Verified Homeowner Credential schema and definition are managed by Cornerstone and registered on the **Cornerstone Network Trust Registry**. Updates follow a change-managed governance process to ensure interoperability.

### 3.3 Issuer Data Source

The data comes from two authoritative categories:

- **Identity Verification**: Interac Bank Verification Service, or BC Person Credential.  
- **Title Verification**: Provincial land-title registry records, including property identifier, civic address, ownership type, and percentage.  

Together these bind a person’s identity to their legal property ownership.

#### 3.3.1 Data Updates
- A credential reflects the state of records at issuance.  
- Ownership or identity changes require revocation and re-issuance.  
- Evidence is retained for five years in compliance with FINTRAC.  

### 3.4 Assurance

The credential combines three assurance anchors:
- High-assurance identity (Person Credential or Interac IVS),  
- Land-title registry record (ownership).  

This meets FINTRAC’s dual-process method.

### 3.5 Revocation

A Verified Homeowner Credential will be revoked in cases such as:
1. Property sold or ownership updated
2. Cornerstone ID (prerequisite) is revoked or expired
3. Identity evidence expires
4. Fraud or errors detected
5. Holder requests re-issuance
6. Regulatory or legal request

**Cascade Revocation**: If the Home Credential is revoked, ALL Property Access Authorization Credentials (PAACs) for that specific property MUST be automatically revoked:
- **Property Access Authorization Credentials (PAACs) for this property** → Automatically revoked
- This affects all trust network members who were granted access to this property
- Other properties owned by the same homeowner are unaffected (each property has its own Home Credential)

**If Cornerstone ID is revoked**: The Home Credential is automatically revoked (prerequisite dependency cascade from Cornerstone ID).

Re-issuance involves re-verification and issuance of a new credential to the holder's Cornerstone Wallet.

## 4. Credential Definition

### 4.1 Credential Schema

The Verified Homeowner Credential conforms to W3C Verifiable Credentials and uses a Cornerstone-managed schema:

- **Schema ID (URI):** `https://schema.cornerstoneplatform.ca/v1/homeowner.json`  
- **Schema Versioning:** Breaking changes produce a new schema and new capture_base digest.  
- **Contexts:**  
  - `https://www.w3.org/2018/credentials/v1`  
  - `https://schema.cornerstoneplatform.ca/contexts/homeowner-v1.json`

### 4.2 Subject of the Credential

The subject is the **individual holder**, bound to a **specific property** at issuance. Binding is confirmed by:
- High-assurance ID verification, and  
- Land-title registry name/address match.  

### 4.3 Attributes

#### 4.3.1 Identity Attributes

*Given Names (001)*

<table>
  <tr><th>Attribute</th><td><code>given_names</code></td></tr>
  <tr><th>Description</th><td>Legal given names.</td></tr>
  <tr><th>Source</th><td>Interac or BC Person Credential.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>John Michael</code></td></tr>
</table>

*Family Name (002)*

<table>
  <tr><th>Attribute</th><td><code>family_name</code></td></tr>
  <tr><th>Description</th><td>Legal surname.</td></tr>
  <tr><th>Source</th><td>Interac or BC Person Credential.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>Smith</code></td></tr>
</table>

*Date of Birth (003)*

<table>
  <tr><th>Attribute</th><td><code>birthdate_dateint</code></td></tr>
  <tr><th>Description</th><td>Date of birth in <code>YYYYMMDD</code> format, compatible with ZK proofs.</td></tr>
  <tr><th>Source</th><td>Interac or BC Person Credential.</td></tr>
  <tr><th>Data Type</th><td>Integer</td></tr>
  <tr><th>Examples</th><td><code>19850621</code></td></tr>
</table>

*Verified Email (004)*

<table>
  <tr><th>Attribute</th><td><code>verified_email</code></td></tr>
  <tr><th>Description</th><td>Email verified during Cornerstone onboarding process.</td></tr>
  <tr><th>Source</th><td>Cornerstone Onboarding Flow.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>john.smith@sutton.com</code></td></tr>
</table>


#### 4.3.2 Property & Ownership Attributes

*PID (005)*

<table>
  <tr><th>Attribute</th><td><code>pid</code></td></tr>
  <tr><th>Description</th><td>Unique Parcel Identifier (PID) used in land registries.</td></tr>
  <tr><th>Source</th><td>Provincial Land Title Registry / Landcor feed.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>027-263-975</code></td></tr>
</table>

*Property Address (006)*

<table>
  <tr><th>Attribute</th><td><code>property_address</code></td></tr>
  <tr><th>Description</th><td>Standardized postal address including street, locality, region, and postal code.</td></tr>
  <tr><th>Source</th><td>Landcor “Full Property Address”.</td></tr>
  <tr><th>Data Type</th><td>JSON object</td></tr>
  <tr><th>Examples</th><td><code>1234 W 10TH AVE, Vancouver, BC V6H 1J9</code></td></tr>
</table>

*Jurisdiction (007)*

<table>
  <tr><th>Attribute</th><td><code>jurisdiction</code></td></tr>
  <tr><th>Description</th><td>Municipality or local jurisdiction where the property is located.</td></tr>
  <tr><th>Source</th><td>Landcor property details.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>City of Vancouver</code></td></tr>
</table>

*Purchase Price (008)*

<table>
  <tr><th>Attribute</th><td><code>purchase_price</code></td></tr>
  <tr><th>Description</th><td>Last recorded sale price of the property.</td></tr>
  <tr><th>Source</th><td>Landcor sales history feed (if available).</td></tr>
  <tr><th>Data Type</th><td>Number</td></tr>
  <tr><th>Examples</th><td><code>1,250,000</code></td></tr>
</table>

*Purchase Date (009)*

<table>
  <tr><th>Attribute</th><td><code>purchase_date</code></td></tr>
  <tr><th>Description</th><td>Date of the last property sale transaction.</td></tr>
  <tr><th>Source</th><td>Landcor sales history feed (if available).</td></tr>
  <tr><th>Data Type</th><td>Date</td></tr>
  <tr><th>Examples</th><td><code>2018-05-14</code></td></tr>
</table>

*Year Built (010)*

<table>
  <tr><th>Attribute</th><td><code>year_built</code></td></tr>
  <tr><th>Description</th><td>Year the property was originally constructed.</td></tr>
  <tr><th>Source</th><td>Landcor property details.</td></tr>
  <tr><th>Data Type</th><td>Integer</td></tr>
  <tr><th>Examples</th><td><code>1987</code></td></tr>
</table>

*Effective Year (011)*

<table>
  <tr><th>Attribute</th><td><code>effective_year</code></td></tr>
  <tr><th>Description</th><td>Renovation-adjusted year reflecting major updates that affect valuation and risk.</td></tr>
  <tr><th>Source</th><td>Landcor property details.</td></tr>
  <tr><th>Data Type</th><td>Integer</td></tr>
  <tr><th>Examples</th><td><code>1993</code></td></tr>
</table>

*Neighbourhood (012)*

<table>
  <tr><th>Attribute</th><td><code>neighbourhood</code></td></tr>
  <tr><th>Description</th><td>Recognized neighbourhood/community where the property is located.</td></tr>
  <tr><th>Source</th><td>Landcor property details.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>Kitsilano</code></td></tr>
</table>


#### 4.3.3 Evidence Attributes

*Identity Evidence (013)*

<table>
  <tr><th>Attribute</th><td><code>identity_evidence</code></td></tr>
  <tr><th>Description</th><td>UUID referencing IDV source(s), author, and date of verification.</td></tr>
  <tr><th>Source</th><td>Cornerstone IDV process.</td></tr>
  <tr><th>Data Type</th><td>String / URI</td></tr>
</table>

*Title Evidence (014)*

<table>
  <tr><th>Attribute</th><td><code>title_evidence</code></td></tr>
  <tr><th>Description</th><td>UUID referencing land title evidence, author, and verification date.</td></tr>
  <tr><th>Source</th><td>Land Title Registry checks.</td></tr>
  <tr><th>Data Type</th><td>String / URI</td></tr>
</table>

## 5. Implementations

### 5.1 Technical Format

This credential uses the **W3C Verifiable Credentials Data Model** and the Verified Homeowner schema.

### 5.2 Issuer List

| Environment       | Issuer Name                | Issuer DID |
|-------------------|----------------------------|------------|
| Production        | Cornerstone Platform Inc.  | TBA        |
| Test/Dev          | Cornerstone Platform Inc.  | TBA        |

### 5.3 Schema Implementation

| Environment   | Ledger/Registry | Schema ID |
|---------------|-----------------|-----------|
| Production    | Cornerstone Trust Registry | TBA |
| Test/Dev      | Cornerstone Trust Registry | `cornerstone:2:verified-homeowner:1.0` |

### 5.4 Credential Implementation

| Environment   | Ledger/Registry | Credential Definition ID | OCA Bundle |
|---------------|-----------------|--------------------------|------------|
| Production    | TBA             | TBA                      | TBA        |
| Test/Dev      | Cornerstone Trust Registry | `cornerstone:3:CL:12345:verified-homeowner` | [Verified Homeowner OCA Bundle](https://github.com/cornerstone/oca-bundles/tree/main/verified-homeowner) |

## 6. Policy Integration

### 6.1 Capabilities Enabled by This Credential

The Verified Homeowner Credential enables holders to access property-specific features and grant access to their trust network. Applications use credential-based access control to provision these capabilities:

1. **Property Trust Network Management**:
   - Issue Property Access Authorization Credentials (PAACs) to advisors and service providers
   - Manage trust network membership for the specific property
   - Grant data access permissions (identity, ownership, equity, insurance)
   - Define access levels (read-only, operational, advisory, transactional)
   - Revoke PAACs when relationships end

2. **Property Data Sharing**:
   - Share verified property ownership with lenders, insurers, and financial institutions
   - Provide property details for underwriting, quoting, and service delivery
   - Enable property data portability across platforms and service providers
   - Selectively disclose property attributes using zero-knowledge proofs

3. **Homeowner Platform Access**:
   - Access homeowner-specific features in Cornerstone applications
   - Create and manage property portfolios (requires Portfolio Issuer capability)
   - Receive property-specific notifications and updates
   - Participate in property-specific communications

### 6.2 Example Policy Rules

Platform applications implement access control rules based on credential presentation:

1. **Trust Network Authorization Policy**:
   ```
   IF holder presents:
      - Valid Home Credential for property X
   THEN authorize: Issue PAAC for property X, manage trust network for property X
   ```

2. **Property Data Access Policy**:
   ```
   IF holder presents:
      - Valid Home Credential
   THEN authorize: View property details, share property data, update property information
   ```

3. **Service Integration Policy**:
   ```
   IF homeowner presents:
      - Valid Home Credential with attributes: [pid, property_address, year_built]
   AND service provider presents:
      - Valid PAAC for this property with scope: [property_data]
   THEN authorize: Service provider access to shared property attributes
   ```

## 7. Related Credentials

### 7.1 Prerequisite Credentials

This credential REQUIRES:
- **Cornerstone ID** (foundation identity credential)
  - Must be valid and not revoked
  - If revoked, this credential is automatically revoked

### 7.2 Dependent Credentials

This credential enables issuance of:
- **Property Access Authorization Credential (PAAC)**: Issued BY the homeowner TO advisors/service providers for this specific property
  - Grants trust network members access to property-specific data
  - Scoped to the specific property represented by this Home Credential
  - Automatically revoked if this Home Credential is revoked

### 7.3 Credential Hierarchy

```
Cornerstone ID (foundation)
└── Home Credential (Verified Homeowner) - THIS CREDENTIAL
    └── Property Access Authorization Credential (PAAC)
        - Issued by homeowner to trust network members
        - One property-specific trust network per Home Credential
        - Automatically revoked when Home Credential is revoked
```

**Important**: Each property has its own trust network. A homeowner with multiple properties holds multiple Home Credentials (one per property), and each Home Credential can issue its own set of PAACs for that property's trust network.

### 7.4 Cascade Revocation Summary

**When this credential is revoked:**
- ALL PAACs for this specific property → Automatically revoked
- All trust network members for this property lose access
- Other properties owned by the same homeowner are unaffected

**When prerequisite credentials are revoked:**
- If Cornerstone ID is revoked → This Home Credential is automatically revoked (which then triggers PAAC revocation)

