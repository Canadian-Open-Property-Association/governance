# Cornerstone ID – Credential Documentation

## 1. About this Document

This document describes the **Cornerstone ID** verifiable credential to help potential verifiers determine whether it is suitable for their needs. The intended audience includes real estate professionals, lenders, insurers, financial service providers, and any relying parties requiring verified person-level identity.

The Cornerstone ID Credential is issued by **Cornerstone Platform Inc.** to all users on the Cornerstone network—homeowners, professionals, advisors, service providers, and trust network members. It represents **foundational person-level identity only**, with no role-specific, property-specific, or employment-specific attributes.

**Cornerstone ID is the base credential that everyone always has**. Users leverage their Cornerstone ID to obtain additional credentials (Home Credential, Professional Credential) which then enable access to application-layer features. This credential-based access control architecture allows users to hold multiple credential types simultaneously, with applications dynamically provisioning features based on which credentials users possess.

### 1.1 Version History

| Ver.      | Date        | Notes                               | Author(s) |
|-----------|-------------|-------------------------------------|-------------|
| **1.0**   | TBA  | Initial release             | Mathieu Glaude    |

## 2. Credential Overview

The Cornerstone ID Credential is a verifiable credential (VC) issued to individuals who have completed identity verification through trusted sources. It enables the holder to prove their verified identity while sharing only the minimum data required.

This credential serves as the **identity foundation** for the Cornerstone network and is synonymous with the **"Person VC"** referenced in the Cornerstone Identity, Persona, and Access Model:
- **Everyone receives a Cornerstone ID** upon successful identity verification
- **Required before any network participation**: Users must hold a Cornerstone ID before they can receive other credentials or access network features
- **Foundation credential**: This is the base layer that ALL other credentials build upon (Home Credential, Verified Advisor Credential, Portfolio Issuer Credential, Property Access Authorization Credential)
- **No role or persona information** is included in this credential
- **Enables subsequent credential issuance**: Homeowner credentials, Professional credentials, and other role-specific credentials build upon this foundation
- **Supports credential-based access control**: Applications query which credentials users hold to provision appropriate features

**Terminology Note**: This credential is referred to as "Cornerstone ID" externally and in user-facing applications, while "Person VC" is the internal technical term used in the Identity Model and architectural specifications. Both terms refer to the same foundational identity credential.

Each issuance is backed by verification from trusted identity sources:
- Interac Bank Verification Service, or
- BC Person Credential

In both cases, email verification and optionally phone verification are performed as part of the credential issuance process.

The credential is issued directly into the **Cornerstone Wallet** and can be consumed by relying parties without requiring them to re-run identity checks.

|              |                                                                 |
|--------------|-----------------------------------------------------------------|
| **Credential:** | Cornerstone ID                                            |
| **Schema:**     | Cornerstone ID v1.0                                       |
| **Issuer:**     | Cornerstone Platform Inc. <br/> [https://cornerstoneplatform.ca](https://cornerstoneplatform.ca) |
| **Issuer DID:** | `did:web:cornerstoneplatform.ca`                          |

### 2.1 Attribute Summary

| **#**       | **Name**          | **Attribute**        | **Data Type** | **Notes** |
|-------------|-------------------|----------------------|---------------|-----------|
| 001         | Given Names       | `given_names`        | String        | Legal given names (may include middle names). |
| 002         | Family Name       | `family_name`        | String        | Legal family/surname. |
| 003         | Date of Birth     | `birthdate_dateint`  | Integer       | `YYYYMMDD` for ZK proofs. |
| 004         | Verified Email    | `verified_email`     | String        | Verified via OTP or equivalent. |
| 005         | Verified Phone    | `verified_phone`     | String        | Verified phone number. |
| 006         | Postal Address    | `postal_address`     | JSON object   | Optional; included only if present in source identity provider. |
| 007         | FSA Code          | `fsa_code`           | String        | Forward Sortation Area (first 3 chars of postal code); enables geographic predicates. |
| 008         | Cornerstone User ID | `cornerstone_user_id` | String     | Platform-generated opaque identifier linking VC to Cornerstone user record. |
| 009         | Identity Evidence | `identity_evidence`  | String / URI  | UUID + source of IDV evidence. |

## 3. Credential Details

### 3.1 Issuer

The Cornerstone ID Credential is issued by **Cornerstone Platform Inc.**, acting as the credential authority. Each credential is issued only after identity verification is successfully completed through at least one trusted source.

### 3.2 Schema and Credential Definition Governance

The Cornerstone ID Credential schema and definition are managed by Cornerstone and registered on the **COPA Trust Registry**. COPA governs badge schemas, trust lists, data catalogues, and network policies across the ecosystem. Updates to the Cornerstone ID schema follow a change-managed governance process to ensure interoperability across all applications accessing the Cornerstone network.

### 3.3 Issuer Data Source

The data comes from trusted identity verification sources:

- **Interac Bank Verification Service**: High-assurance identity verification through banking relationships
- **BC Person Credential**: Provincial digital identity credential (where applicable)

In both cases, email verification (OTP) and optionally phone verification (SMS OTP) are performed during the credential issuance process.

**Out of Scope**: This credential does NOT include or reference:
- Property ownership or homeownership data
- Professional licensing or employment data
- Any role or persona indicators (homeowner, professional, etc.)
- Age predicates (e.g., age_over_19)
- Geographic predicates (e.g., FSA codes)
- Assurance level indicators

#### 3.3.1 Data Updates
- A credential reflects the state of identity verification at issuance.
- Identity changes (name change, address change) require revocation and re-issuance.
- Evidence is retained for five years in compliance with regulatory requirements.

### 3.4 Assurance

The credential provides person-level identity assurance through verification from trusted sources. The assurance level depends on which identity verification source(s) were used:
- **Interac Bank Verification or BC Person**: High-assurance identity verification meeting regulatory requirements
- **Cornerstone Email + Phone Verification**: Basic identity verification suitable for trust network member access

**Note**: No assurance level indicator is included in the credential itself. Relying parties evaluate assurance based on the evidence array, which documents verification sources and methods.

### 3.5 Revocation

A Cornerstone ID Credential will be revoked in cases such as:
1. User account deletion or closure
2. Fraud or identity mismatch detected
3. Identity information changes (name change, requires re-issuance)
4. Regulatory or legal request
5. User requests credential refresh

**Cascade Revocation**: If the Cornerstone ID is revoked, ALL dependent credentials MUST be automatically revoked:
- **Home Credential (Verified Homeowner)** → Revoked if Cornerstone ID is revoked
- **Verified Advisor Credential** → Revoked if Cornerstone ID is revoked
- **Portfolio Issuer Credential** → Revoked if Cornerstone ID is revoked (via Verified Advisor dependency)
- **Property Access Authorization Credentials (PAACs)** → Revoked if issuer's or recipient's Cornerstone ID is revoked

This cascade ensures that identity verification remains the foundation for all role-specific credentials.

Re-issuance involves re-verification through a trusted identity source and issuance of a new credential to the holder's Cornerstone Wallet.

## 4. Credential Definition

### 4.1 Credential Schema

The Cornerstone ID Credential conforms to W3C Verifiable Credentials and uses a Cornerstone-managed schema:

- **Schema ID (URI):** `https://schema.cornerstoneplatform.ca/v1/cornerstone-id.json`
- **Schema Versioning:** Breaking changes produce a new schema version.
- **Contexts:**
  - `https://www.w3.org/2018/credentials/v1`
  - `https://schema.cornerstoneplatform.ca/contexts/cornerstone-id-v1.json`

### 4.2 Subject of the Credential

The subject is the **individual holder**, bound to their Cornerstone platform account. Binding is confirmed by successful identity verification through at least one trusted source and association with a DID generated by the user's wallet.

### 4.3 Attributes

#### 4.3.1 Core Identity Attributes (Required)

*Given Names (001)*

<table>
  <tr><th>Attribute</th><td><code>given_names</code></td></tr>
  <tr><th>Description</th><td>Verified legal given names (may include middle names).</td></tr>
  <tr><th>Source</th><td>Interac <code>given_name</code> + <code>middle_name</code>, or BC Person <code>given_names</code>.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>John Michael</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Family Name (002)*

<table>
  <tr><th>Attribute</th><td><code>family_name</code></td></tr>
  <tr><th>Description</th><td>Verified legal family name.</td></tr>
  <tr><th>Source</th><td>Interac or BC Person.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>Smith</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Date of Birth (003)*

<table>
  <tr><th>Attribute</th><td><code>birthdate_dateint</code></td></tr>
  <tr><th>Description</th><td>Date of birth in <code>YYYYMMDD</code> format, compatible with ZK proofs. Transform Interac <code>birthdate</code> or use BC Person <code>birthdate_dateint</code>.</td></tr>
  <tr><th>Source</th><td>Interac or BC Person.</td></tr>
  <tr><th>Data Type</th><td>Integer</td></tr>
  <tr><th>Examples</th><td><code>19850621</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Verified Email (004)*

<table>
  <tr><th>Attribute</th><td><code>verified_email</code></td></tr>
  <tr><th>Description</th><td>Email verified via OTP during Cornerstone onboarding process.</td></tr>
  <tr><th>Source</th><td>Cornerstone Onboarding Flow.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>john.smith@example.com</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Verified Phone (005)*

<table>
  <tr><th>Attribute</th><td><code>verified_phone</code></td></tr>
  <tr><th>Description</th><td>Verified phone number. From Interac <code>phone_number</code> when available; otherwise verified via SMS OTP.</td></tr>
  <tr><th>Source</th><td>Interac or SMS verification.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>+1-604-555-0123</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Cornerstone User ID (008)*

<table>
  <tr><th>Attribute</th><td><code>cornerstone_user_id</code></td></tr>
  <tr><th>Description</th><td>A platform-generated opaque identifier linking the VC to the Cornerstone user record. This identifier does NOT encode any role or persona information.</td></tr>
  <tr><th>Source</th><td>Cornerstone platform user management system.</td></tr>
  <tr><th>Data Type</th><td>String (UUID format recommended)</td></tr>
  <tr><th>Examples</th><td><code>550e8400-e29b-41d4-a716-446655440000</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

#### 4.3.2 Optional Attributes

*Postal Address (006)*

<table>
  <tr><th>Attribute</th><td><code>postal_address</code></td></tr>
  <tr><th>Description</th><td>Normalized postal address. Include ONLY if present in the source identity provider (Interac or BC Person). This is NOT property ownership address; it is the person's mailing/residential address from identity verification.</td></tr>
  <tr><th>Source</th><td>Interac or BC Person (if available).</td></tr>
  <tr><th>Data Type</th><td>JSON object containing: <code>street_address</code>, <code>locality</code>, <code>region</code>, <code>postal_code</code>, <code>country</code></td></tr>
  <tr><th>Examples</th><td><code>{"street_address": "123 Main St", "locality": "Vancouver", "region": "BC", "postal_code": "V6B 1A1", "country": "CA"}</code></td></tr>
  <tr><th>Required</th><td>No - only if provided by identity source</td></tr>
</table>

*FSA Code (007)*

<table>
  <tr><th>Attribute</th><td><code>fsa_code</code></td></tr>
  <tr><th>Description</th><td>Forward Sortation Area - the first three characters of the Canadian postal code. Enables geographic predicates and regional queries without revealing full address.</td></tr>
  <tr><th>Source</th><td>Derived from <code>postal_address.postal_code</code> when available.</td></tr>
  <tr><th>Data Type</th><td>String (3 characters)</td></tr>
  <tr><th>Examples</th><td><code>V6B</code>, <code>M5H</code></td></tr>
  <tr><th>Required</th><td>No - only if postal_address is provided</td></tr>
  <tr><th>Notes</th><td>Enables zero-knowledge proofs for regional verification (e.g., "resident of Greater Vancouver") without revealing exact address.</td></tr>
</table>

#### 4.3.3 Evidence Attributes

*Identity Evidence (009)*

<table>
  <tr><th>Attribute</th><td><code>identity_evidence</code></td></tr>
  <tr><th>Description</th><td>UUID referencing IDV source(s), author, and date of verification. Links to stored evidence record for audit and compliance purposes.</td></tr>
  <tr><th>Source</th><td>Cornerstone IDV process (Interac or BC Person verification).</td></tr>
  <tr><th>Data Type</th><td>String (UUID) or URI</td></tr>
  <tr><th>Examples</th><td><code>urn:uuid:a1b2c3d4-e5f6-7890-abcd-ef1234567890</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
  <tr><th>Notes</th><td>Evidence retained for five years in compliance with regulatory requirements. Full evidence details available in the <code>evidence</code> array of the credential.</td></tr>
</table>

## 5. Evidence Requirements

The `evidence` section of the credential follows the same format used in the Verified Homeowner Credential governance. Each identity verification source used must appear as an object in the `evidence` array.

### 5.1 Evidence Array Structure

Each evidence object must include:

<table>
  <tr><th>Field</th><th>Description</th><th>Required</th></tr>
  <tr><td><code>type</code></td><td>Type of evidence (e.g., "DocumentVerification", "IdentityProofing")</td><td>Yes</td></tr>
  <tr><td><code>method</code></td><td>Verification method used (e.g., "InteracBankVerification", "BCPersonCredential", "CornerstoneEmailOTP")</td><td>Yes</td></tr>
  <tr><td><code>verificationDate</code></td><td>ISO 8601 timestamp of when verification occurred</td><td>Yes</td></tr>
  <tr><td><code>matchFields</code></td><td>Array of fields that were verified (e.g., ["name", "dob", "account"])</td><td>Yes</td></tr>
  <tr><td><code>recordLocator</code></td><td>Reference to stored evidence record (UUID or URI)</td><td>Yes</td></tr>
  <tr><td><code>verifier</code></td><td>Entity that performed verification (e.g., "Interac Corp.", "Province of BC", "Cornerstone Platform Inc.")</td><td>Yes</td></tr>
</table>

### 5.2 What Goes in Evidence

- Type of verification performed
- Method/source used (Interac, BC Person, Cornerstone verification)
- Verification timestamp
- Fields that were matched/verified
- Reference locator for audit trail
- Verifier entity information
- Any metadata required for regulatory auditability (e.g., FINTRAC compliance)

### 5.3 What Must NOT Go in Evidence

- **No assurance level indicators** (e.g., HIGH, MODERATE, LOW) - relying parties infer assurance from verification sources
- **No role or persona indicators** (homeowner, professional, etc.)
- **No references to property or employment verification sources**
- **No derived predicates or analysis**

### 5.4 Example Evidence Object

```json
{
  "evidence": [
    {
      "type": "IdentityProofing",
      "method": "InteracBankVerification",
      "verificationDate": "2025-01-15T14:32:00Z",
      "matchFields": ["given_name", "middle_name", "family_name", "birthdate", "phone_number"],
      "recordLocator": "urn:uuid:a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "verifier": "Interac Corp."
    }
  ]
}
```

## 6. Issuance Rules

### 6.1 When Credential is Issued

The Cornerstone ID Credential is issued when:
1. User completes identity verification through at least one trusted source (Interac Bank Verification, BC Person, or Cornerstone email+phone verification)
2. User has generated a DID in their Cornerstone Wallet
3. Identity verification successfully completes (name, date of birth, contact information verified)

**No property or employment verification is required** for Cornerstone ID issuance. This is purely person-level identity verification.

### 6.2 Credential Binding

The credential is bound to:
- A DID generated by the user's wallet (stored in `credentialSubject.id`)
- A Cornerstone user account (via `cornerstone_user_id`)

### 6.3 Multi-Source Verification

If a user verifies through multiple sources (e.g., Interac AND BC Person), the evidence array contains multiple objects documenting each verification source. This increases assurance without requiring an explicit assurance level field.

## 7. Refresh & Expiration

### 7.1 Expiration Period

Cornerstone ID credentials expire **3–5 years** after issuance (exact period determined by operational policy).

### 7.2 Refresh Triggers

Credential refresh is required when:
- Expiration date approaches (90 days prior)
- Identity information changes (name change, address update)
- Verification source expires (e.g., BC Person credential expires)
- User requests refresh for any reason

### 7.3 Refresh Process

Refresh requires:
1. Re-verification through a trusted identity source
2. Revocation of previous credential
3. Issuance of new credential with updated `issuance_date` and `expiration_date`

**Important**: Refresh must NOT introduce role information, property data, or employment data into the credential.

## 8. Revocation Policy

### 8.1 Revocation Triggers

The Cornerstone ID Credential will be revoked when:
1. User account is deleted or closed
2. Fraud or identity mismatch is detected
3. Identity information changes requiring re-issuance (name change)
4. Verification source reports identity change or cancellation
5. Regulatory or legal request for revocation
6. User explicitly requests revocation

### 8.2 Cascade Revocation Rules

**Critical Foundation Dependency**: Cornerstone ID is the foundation credential for all others. If Cornerstone ID is revoked, the following cascade occurs:

**Immediate Cascade (Direct Dependencies)**:
- **Home Credential (Verified Homeowner)** → Automatically revoked
- **Verified Advisor Credential** → Automatically revoked
- **Property Access Authorization Credentials (PAACs)** issued by this Person → Automatically revoked
- **Property Access Authorization Credentials (PAACs)** held by this Person → Automatically revoked

**Secondary Cascade (Indirect Dependencies)**:
- **Portfolio Issuer Credential** → Automatically revoked (depends on Verified Advisor which depends on Cornerstone ID)
- **Property Access Authorization Credentials (PAACs)** for properties owned by this Person → Automatically revoked (via Home Credential revocation)

This cascade ensures that all credentials built upon identity verification are invalidated when the foundational identity credential is revoked.

### 8.3 Revocation Method

Revocation is managed through the Cornerstone revocation registry. Revoked credentials are marked in the registry, and relying parties check revocation status before accepting credentials.

Platform automatically processes cascade revocations when Cornerstone ID is revoked, updating the revocation registry for all dependent credentials.

### 8.4 Post-Revocation

After revocation:
- User may request re-issuance by completing identity verification again
- **All dependent credentials must be re-issued separately** after Cornerstone ID is re-established:
  - Home Credentials require property ownership re-verification
  - Verified Advisor Credential requires professional licensing re-verification
  - Portfolio Issuer Credential requires Network Partner re-attestation
  - Property Access Authorization Credentials must be re-issued by homeowners to trust network members

## 9. Schema Versioning

### 9.1 Version Management

The Cornerstone ID schema follows semantic versioning:
- **Major version changes** (v1 → v2): Breaking changes requiring new schema URI
- **Minor version changes** (v1.0 → v1.1): Backward-compatible additions
- **Patch version changes** (v1.0.0 → v1.0.1): Non-breaking fixes

### 9.2 Breaking Changes

Examples of breaking changes requiring new major version:
- Removing required attributes
- Changing attribute data types
- Renaming attributes
- Changing credential structure

### 9.3 Backward Compatibility

Non-breaking changes (adding optional attributes, adding evidence types) maintain backward compatibility within same major version.

## 10. Validation Rules

### 10.1 Required Fields

All of the following fields MUST be present in a valid Cornerstone ID Credential:

**credentialSubject:**
- `given_names`
- `family_name`
- `birthdate_dateint`
- `verified_email`
- `verified_phone`
- `cornerstone_user_id`
- `identity_evidence`

**Envelope:**
- `issuer` (must be `did:web:cornerstoneplatform.ca`)
- `issuance_date`
- `expiration_date`
- `credentialSchema`
- `termsOfUse`

**Evidence:**
- At least one `evidence` object in the `evidence` array

### 10.2 Forbidden Fields

The following fields MUST NEVER appear in a Cornerstone ID Credential:

**Property/Homeownership Data:**
- PID (Parcel Identifier)
- Property address (distinct from person's postal address)
- Title information
- Property assessment data
- Purchase price/date
- Year built, effective year
- Neighbourhood information

**Employment/Professional Data:**
- Professional license numbers
- Employment affiliation
- Business name or designation
- Professional registry information

**Role/Persona Information:**
- System role indicators (homeowner, professional, advisor)
- Persona type fields
- Portfolio issuer status

**Predicates:**
- Age predicates (e.g., `age_over_19`, `age_over_majority`)
- Any derived boolean or comparative fields (except FSA code which is permitted)

**Assurance Indicators:**
- `proof_level` or assurance level fields
- Trust level indicators
- Verification strength scores

**Financial/Mortgage Data:**
- Mortgage balance or terms
- Credit information
- Financial signals or indicators

## 11. Policy Integration: What This Credential Enables

### 11.1 Access Control Implications

The Cornerstone ID Credential enables foundational access to the Cornerstone network:

**Capabilities Granted:**
- **Basic platform access**: Create user account and access platform features
- **Trust network membership**: Join trust networks as a trust network member (with Property Access Authorization Credential)
- **Prerequisite for all role credentials**: Required before any role-specific credentials can be issued
- **Identity verification portability**: Present verified identity to service providers without redundant verification

**Example Policy Rules:**

1. **Platform Access Policy**:
   ```
   IF holder presents:
      - Valid Cornerstone ID
   THEN authorize: Basic platform access, account creation
   ```

2. **Role Credential Issuance Policy**:
   ```
   IF holder presents:
      - Valid Cornerstone ID
   THEN eligible for: Home Credential, Verified Advisor Credential issuance (subject to additional verification)
   ```

3. **Trust Network Participation Policy**:
   ```
   IF holder presents:
      - Valid Cornerstone ID AND
      - Valid Property Access Authorization Credential for property_id
   THEN authorize: Trust network member access to property data
   ```

### 11.2 Related Credentials

**Prerequisites (must exist before Cornerstone ID can be issued):**
- **None** - Cornerstone ID is the foundation credential with no prerequisites

**Dependents (credentials that build upon Cornerstone ID):**
- **Home Credential (Verified Homeowner)** - Property ownership verification; requires Cornerstone ID first
- **Verified Advisor Credential** - Professional licensing verification; requires Cornerstone ID first
- **Portfolio Issuer Credential** - Capability credential; requires Cornerstone ID + Verified Advisor Credential
- **Property Access Authorization Credential (PAAC)** - Authorization credential; issuer and recipient both require Cornerstone ID

**Credential Hierarchy:**
```
Cornerstone ID (foundation - THIS CREDENTIAL)
├── Home Credential (Verified Homeowner)
│   └── Property Access Authorization Credential (issued by homeowner to trust network members)
└── Verified Advisor Credential
    ├── Portfolio Issuer Credential (capability)
    └── Property Access Authorization Credential (received from homeowners as trust network member)
```

**Cascade Effect:**
- If **Cornerstone ID** is revoked → ALL dependent credentials are automatically revoked (see Section 8.2 for full cascade rules)

## 12. Schema Definition (High-Level)

The JSON Schema for Cornerstone ID Credential is located at:

**`/schemas/v1/cornerstone-id.json`**

High-level structure:

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://schema.cornerstoneplatform.ca/contexts/cornerstone-id-v1.json"
  ],
  "type": ["VerifiableCredential", "CornerstoneID"],
  "issuer": "did:web:cornerstoneplatform.ca",
  "issuanceDate": "2025-01-15T14:32:00Z",
  "expirationDate": "2030-01-15T14:32:00Z",
  "credentialSubject": {
    "id": "did:example:user123",
    "given_names": "John Michael",
    "family_name": "Smith",
    "birthdate_dateint": 19850621,
    "verified_email": "john.smith@example.com",
    "verified_phone": "+1-604-555-0123",
    "cornerstone_user_id": "550e8400-e29b-41d4-a716-446655440000",
    "postal_address": {
      "street_address": "123 Main St",
      "locality": "Vancouver",
      "region": "BC",
      "postal_code": "V6B 1A1",
      "country": "CA"
    },
    "fsa_code": "V6B",
    "identity_evidence": "urn:uuid:a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  },
  "evidence": [
    {
      "type": "IdentityProofing",
      "method": "InteracBankVerification",
      "verificationDate": "2025-01-15T14:32:00Z",
      "matchFields": ["given_name", "middle_name", "family_name", "birthdate", "phone_number"],
      "recordLocator": "urn:uuid:a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "verifier": "Interac Corp."
    }
  ],
  "credentialSchema": {
    "id": "https://schema.cornerstoneplatform.ca/v1/cornerstone-id.json",
    "type": "JsonSchemaValidator2018"
  },
  "termsOfUse": {
    "type": "IssuerPolicy",
    "id": "https://cornerstoneplatform.ca/governance/cornerstone-id-v1",
    "profile": "https://cornerstoneplatform.ca/governance/cornerstone-id-v1"
  }
}
```

## 13. References

### 12.1 Related Documents

- **Building Canada's Homeownership Trust Network** - Platform vision and architecture describing the three-layer architecture, COPA governance model, and credential-based access control

- **Verified Homeowner Credential Governance** - Example of role-specific credential built on Cornerstone ID foundation

- **Verified Professional Credential Governance** - Example of professional role credential built on Cornerstone ID foundation

- **Considerations for Cornerstone Issued Credentials** - Technical mapping documentation for Interac and BC Person attribute mapping

### 12.2 Schema Resources

- **W3C Verifiable Credentials Data Model**: https://www.w3.org/TR/vc-data-model/
- **Cornerstone Schema Registry**: https://schema.cornerstoneplatform.ca/
- **COPA Trust Registry**: https://trust.cornerstoneplatform.ca/

### 12.3 Identity Verification Sources

- **Interac Bank Verification Service**: Identity verification through Canadian banking relationships
- **BC Person Credential**: Provincial digital identity credential (British Columbia)
- **Cornerstone Verification**: Platform-managed email and phone verification

---

**Document Control**

- **Owner**: Cornerstone Platform Inc.
- **Governance Body**: COPA Trust Network
- **Review Cycle**: Annual or upon breaking schema changes
- **Contact**: governance@cornerstoneplatform.ca
