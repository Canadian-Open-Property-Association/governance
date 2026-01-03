# Portfolio Issuer Credential – Credential Documentation

## 1. About this Document

This document describes the **Portfolio Issuer Credential** verifiable credential to help potential verifiers determine whether it is suitable for their needs. The intended audience includes Network Partners, Cornerstone Network governance bodies, real estate professionals, mortgage brokers, insurance agents, and any relying parties requiring verified Portfolio Issuer status.

The Portfolio Issuer Credential is issued by **Network Partners (NPs)** or **Cornerstone Platform Inc. on behalf of Network Partners** to licensed professionals who are authorized to create homeowner portfolios, issue credentials to homeowners, and approve homeowner onboarding to the Cornerstone network.

**Portfolio Issuer is a capability credential** that builds upon Professional Credentials. Every Portfolio Issuer must hold a valid Professional Credential (Verified Advisor), but not every Professional holds Portfolio Issuer capabilities. This credential represents the authority to:
- Approve homeowner onboarding to the Cornerstone network
- Issue Cornerstone ID credentials (identity verification)
- Issue Home Credentials (property ownership verification)
- Initiate data integration from authoritative sources
- Earn referral fees on downstream transactions
- Receive default portfolio branding rights

### 1.1 Version History

| Ver.      | Date        | Notes                               | Author(s) |
|-----------|-------------|-------------------------------------|-------------|
| **1.0**   | TBA  | Initial release             | Mathieu Glaude    |

## 2. Credential Overview

The Portfolio Issuer Credential is a verifiable credential (VC) issued to professionals who have been granted authority by a Network Partner to create portfolios on behalf of homeowner clients. It enables the holder to prove their Portfolio Issuer status while sharing only the minimum data required.

This credential serves as a **capability layer** on top of the Professional Credential:
- **Requires Professional Credential (Verified Advisor) as prerequisite**
- **Granted by Network Partners or Cornerstone Network** to approved individuals or organizations
- **Enables portfolio creation authority**: Issue Cornerstone IDs and Home Credentials to homeowners
- **Two types**: Organizational Portfolio Issuers (entity-level) and Delegate Portfolio Issuers (individual professionals)
- **Supports credential-based access control**: Applications verify Portfolio Issuer credentials to enable portfolio creation features
- **Earns referral fee rights**: Portfolio Issuers earn ongoing referral fees when their homeowner clients transact with service providers

Each issuance is backed by:
- Valid Professional Credential (Verified Advisor)
- Network Partner attestation (approval by NP or Cornerstone Network)
- Organization affiliation verification

The credential is issued directly into the **Cornerstone Wallet** and can be consumed by relying parties to verify Portfolio Issuer authority.

|              |                                                                 |
|--------------|-----------------------------------------------------------------|
| **Credential:** | Portfolio Issuer Credential                                            |
| **Schema:**     | Portfolio Issuer v1.0                                       |
| **Issuer:**     | Network Partner (NP) or Cornerstone Platform Inc. on behalf of NP <br/> [https://cornerstoneplatform.ca](https://cornerstoneplatform.ca) |
| **Issuer DID:** | `did:web:{network-partner-domain}` or `did:web:cornerstoneplatform.ca`                          |

### 2.1 Prerequisite Credentials

**Required Before Issuance:**
- **Cornerstone ID** (base identity credential) - ALL users must hold this first
- **Professional Credential (Verified Advisor)** - Portfolio Issuer capabilities build upon professional licensing verification

**Credential Hierarchy:**
```
Cornerstone ID (foundation)
└── Professional Credential (Verified Advisor)
    └── Portfolio Issuer Credential (capability)
```

### 2.2 Attribute Summary

| **#**       | **Name**          | **Attribute**        | **Data Type** | **Notes** |
|-------------|-------------------|----------------------|---------------|-----------|
| 001         | Portfolio Issuer ID | `portfolio_issuer_id` | String (UUID) | Platform-generated unique identifier for this Portfolio Issuer. |
| 002         | Issuer Type       | `issuer_type`        | String (enum) | Either `ORGANIZATIONAL` or `DELEGATE`. |
| 003         | Network Partner ID | `npId`              | String (UUID) | Identifier of the Network Partner granting this credential. |
| 004         | Network Partner Name | `np_name`         | String        | Human-readable name of the Network Partner (e.g., "Sutton Group"). |
| 005         | Can Issue Portfolios | `canIssuePortfolios` | Boolean    | Always `true` for valid Portfolio Issuer credentials. |
| 006         | Scope             | `scope`              | JSON object   | Optional: Regions, offices, or service areas where Portfolio Issuer authority applies. |
| 007         | Granted Date      | `grantedDate`        | ISO 8601 timestamp | Date when Portfolio Issuer capability was granted. |
| 008         | Granting Authority | `grantingAuthority` | String        | Entity that granted authority (NP name or "Cornerstone Network"). |
| 009         | Professional Credential Reference | `professional_credential_ref` | String (UUID) | Reference to the underlying Professional Credential (required prerequisite). |
| 010         | Portfolio Issuer Evidence | `portfolio_issuer_evidence` | String / URI | UUID + source of Portfolio Issuer attestation evidence. |

## 3. Credential Details

### 3.1 Issuer

The Portfolio Issuer Credential is issued by:
- **Network Partners (NPs)** for Delegate Portfolio Issuers (individual professionals in their network)
- **Cornerstone Platform Inc. on behalf of NPs** for Organizational Portfolio Issuers (entity-level)

Each credential is issued only after:
1. Professional Credential (Verified Advisor) verification
2. Network Partner attestation and approval
3. Organization affiliation confirmation

### 3.2 Schema and Credential Definition Governance

The Portfolio Issuer Credential schema and definition are managed by **Cornerstone Network** and registered on the **Cornerstone Network Trust Registry**. Cornerstone Network governs badge schemas, trust lists, data catalogues, and network policies across the ecosystem. Updates to the Portfolio Issuer schema follow a change-managed governance process to ensure interoperability across all applications accessing the Cornerstone network.

### 3.3 Issuer Data Source

The data comes from:

- **Network Partner attestation**: NP approval records confirming Portfolio Issuer status
- **Professional Credential verification**: Underlying Professional Credential (Verified Advisor) must be valid
- **Organization affiliation systems**: HR systems, brokerage management systems, or organizational records confirming affiliation

**Out of Scope**: This credential does NOT include or reference:
- Property ownership or homeownership data
- Financial performance metrics or transaction volumes
- Personal financial information
- Client lists or portfolio details
- Commission structures or compensation data

#### 3.3.1 Data Updates

- A credential reflects the state of Portfolio Issuer authority at issuance.
- Authority changes (scope changes, organization changes) require revocation and re-issuance.
- Evidence is retained for five years in compliance with regulatory requirements (FINTRAC where applicable).

### 3.4 Assurance

The credential provides Portfolio Issuer authority assurance through:
- **Professional Credential verification**: Valid Verified Advisor credential required
- **Network Partner attestation**: NP approval and authorization
- **Organization affiliation verification**: Confirmed relationship with Network Partner

**Note**: No assurance level indicator is included in the credential itself. Relying parties evaluate assurance based on the evidence array, which documents verification sources and methods.

### 3.5 Revocation

A Portfolio Issuer Credential will be revoked in cases such as:
1. Professional Credential (Verified Advisor) revoked or expired
2. Network Partner terminates Portfolio Issuer authorization
3. Organization affiliation ends (employment termination, brokerage change)
4. Fraud or misuse of Portfolio Issuer authority detected
5. Regulatory or legal request
6. User requests credential revocation

**Cascade Revocation**: If the underlying Professional Credential is revoked, the Portfolio Issuer Credential MUST also be revoked automatically.

Re-issuance involves re-verification of Professional Credential status, Network Partner re-attestation, and issuance of a new credential to the holder's Cornerstone Wallet.

## 4. Credential Definition

### 4.1 Credential Schema

The Portfolio Issuer Credential conforms to W3C Verifiable Credentials and uses a Cornerstone Network-managed schema:

- **Schema ID (URI):** `https://schema.cornerstoneplatform.ca/v1/portfolio-issuer.json`
- **Schema Versioning:** Breaking changes produce a new schema version.
- **Contexts:**
  - `https://www.w3.org/2018/credentials/v1`
  - `https://schema.cornerstoneplatform.ca/contexts/portfolio-issuer-v1.json`

### 4.2 Subject of the Credential

The subject is the **individual professional or organization**, bound to their Cornerstone platform account. Binding is confirmed by:
- Valid Professional Credential (Verified Advisor)
- Network Partner attestation
- Association with a DID generated by the holder's wallet

### 4.3 Attributes

#### 4.3.1 Core Portfolio Issuer Attributes (Required)

*Portfolio Issuer ID (001)*

<table>
  <tr><th>Attribute</th><td><code>portfolio_issuer_id</code></td></tr>
  <tr><th>Description</th><td>Platform-generated unique identifier for this Portfolio Issuer.</td></tr>
  <tr><th>Source</th><td>Cornerstone platform Portfolio Issuer management system.</td></tr>
  <tr><th>Data Type</th><td>String (UUID format recommended)</td></tr>
  <tr><th>Examples</th><td><code>550e8400-e29b-41d4-a716-446655440000</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Issuer Type (002)*

<table>
  <tr><th>Attribute</th><td><code>issuer_type</code></td></tr>
  <tr><th>Description</th><td>Type of Portfolio Issuer: <code>ORGANIZATIONAL</code> (entity-level, handles self-service portfolio claims) or <code>DELEGATE</code> (individual professional authorized by organization).</td></tr>
  <tr><th>Source</th><td>Network Partner attestation.</td></tr>
  <tr><th>Data Type</th><td>String (enum: <code>ORGANIZATIONAL</code>, <code>DELEGATE</code>)</td></tr>
  <tr><th>Examples</th><td><code>DELEGATE</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Network Partner ID (003)*

<table>
  <tr><th>Attribute</th><td><code>npId</code></td></tr>
  <tr><th>Description</th><td>Identifier of the Network Partner granting this Portfolio Issuer credential.</td></tr>
  <tr><th>Source</th><td>Cornerstone Network Trust Registry Network Partner records.</td></tr>
  <tr><th>Data Type</th><td>String (UUID format)</td></tr>
  <tr><th>Examples</th><td><code>a1b2c3d4-e5f6-7890-abcd-ef1234567890</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Network Partner Name (004)*

<table>
  <tr><th>Attribute</th><td><code>np_name</code></td></tr>
  <tr><th>Description</th><td>Human-readable name of the Network Partner.</td></tr>
  <tr><th>Source</th><td>Cornerstone Network Trust Registry Network Partner records.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>Sutton Group</code>, <code>Dominion Lending</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Can Issue Portfolios (005)*

<table>
  <tr><th>Attribute</th><td><code>canIssuePortfolios</code></td></tr>
  <tr><th>Description</th><td>Boolean flag indicating Portfolio Issuer authority. Always <code>true</code> for valid Portfolio Issuer credentials.</td></tr>
  <tr><th>Source</th><td>Network Partner attestation.</td></tr>
  <tr><th>Data Type</th><td>Boolean</td></tr>
  <tr><th>Examples</th><td><code>true</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Granted Date (007)*

<table>
  <tr><th>Attribute</th><td><code>grantedDate</code></td></tr>
  <tr><th>Description</th><td>ISO 8601 timestamp of when Portfolio Issuer capability was granted.</td></tr>
  <tr><th>Source</th><td>Network Partner attestation records.</td></tr>
  <tr><th>Data Type</th><td>String (ISO 8601 timestamp)</td></tr>
  <tr><th>Examples</th><td><code>2025-03-15T10:30:00Z</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Granting Authority (008)*

<table>
  <tr><th>Attribute</th><td><code>grantingAuthority</code></td></tr>
  <tr><th>Description</th><td>Entity that granted Portfolio Issuer authority (Network Partner name or "Cornerstone Network" for Cornerstone Network-issued credentials).</td></tr>
  <tr><th>Source</th><td>Network Partner or Cornerstone Network attestation.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>Sutton Group</code>, <code>Cornerstone Network</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Professional Credential Reference (009)*

<table>
  <tr><th>Attribute</th><td><code>professional_credential_ref</code></td></tr>
  <tr><th>Description</th><td>Reference to the underlying Professional Credential (Verified Advisor) that is a prerequisite for this Portfolio Issuer credential.</td></tr>
  <tr><th>Source</th><td>Cornerstone credential management system.</td></tr>
  <tr><th>Data Type</th><td>String (UUID format)</td></tr>
  <tr><th>Examples</th><td><code>b2c3d4e5-f6a7-8901-bcde-f12345678901</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
  <tr><th>Notes</th><td>This reference enables verification that the holder possesses a valid Professional Credential, which is a prerequisite for Portfolio Issuer status.</td></tr>
</table>

#### 4.3.2 Optional Attributes

*Scope (006)*

<table>
  <tr><th>Attribute</th><td><code>scope</code></td></tr>
  <tr><th>Description</th><td>Optional geographic or organizational scope where Portfolio Issuer authority applies. May include regions, offices, service areas, or property types.</td></tr>
  <tr><th>Source</th><td>Network Partner attestation.</td></tr>
  <tr><th>Data Type</th><td>JSON object containing: <code>regions</code> (array), <code>offices</code> (array), <code>service_areas</code> (array), <code>property_types</code> (array)</td></tr>
  <tr><th>Examples</th><td><code>{"regions": ["British Columbia", "Ontario"], "offices": ["Vancouver Downtown", "Toronto Midtown"]}</code></td></tr>
  <tr><th>Required</th><td>No - only if NP applies scope restrictions</td></tr>
</table>

#### 4.3.3 Evidence Attributes

*Portfolio Issuer Evidence (010)*

<table>
  <tr><th>Attribute</th><td><code>portfolio_issuer_evidence</code></td></tr>
  <tr><th>Description</th><td>UUID referencing Network Partner attestation source(s), author, and date of authorization. Links to stored evidence record for audit and compliance purposes.</td></tr>
  <tr><th>Source</th><td>Network Partner attestation process.</td></tr>
  <tr><th>Data Type</th><td>String (UUID) or URI</td></tr>
  <tr><th>Examples</th><td><code>urn:uuid:c3d4e5f6-a7b8-9012-cdef-123456789012</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
  <tr><th>Notes</th><td>Evidence retained for five years in compliance with regulatory requirements. Full evidence details available in the <code>evidence</code> array of the credential.</td></tr>
</table>

## 5. Evidence Requirements

The `evidence` section of the credential documents the verification sources used to confirm Portfolio Issuer authority. Each verification source used must appear as an object in the `evidence` array.

### 5.1 Evidence Array Structure

Each evidence object must include:

<table>
  <tr><th>Field</th><th>Description</th><th>Required</th></tr>
  <tr><td><code>type</code></td><td>Type of evidence (e.g., "Attestation", "OrganizationVerification")</td><td>Yes</td></tr>
  <tr><td><code>method</code></td><td>Verification method used (e.g., "NetworkPartnerAttestation", "Cornerstone NetworkAuthorization")</td><td>Yes</td></tr>
  <tr><td><code>verificationDate</code></td><td>ISO 8601 timestamp of when authorization occurred</td><td>Yes</td></tr>
  <tr><td><code>matchFields</code></td><td>Array of fields that were verified (e.g., ["professional_credential", "organization_affiliation", "np_approval"])</td><td>Yes</td></tr>
  <tr><td><code>recordLocator</code></td><td>Reference to stored evidence record (UUID or URI)</td><td>Yes</td></tr>
  <tr><td><code>verifier</code></td><td>Entity that performed verification (e.g., "Sutton Group", "Cornerstone Network")</td><td>Yes</td></tr>
</table>

### 5.2 What Goes in Evidence

- Type of authorization performed
- Method/source used (Network Partner attestation, Cornerstone Network authorization)
- Authorization timestamp
- Fields that were verified (Professional Credential, organization affiliation, approval records)
- Reference locator for audit trail
- Verifier entity information (Network Partner or Cornerstone Network)
- Any metadata required for regulatory auditability

### 5.3 What Must NOT Go in Evidence

- **No performance metrics** (e.g., number of portfolios created, transaction volumes)
- **No financial information** (commission structures, referral fee totals)
- **No client information** (homeowner names, portfolio details)
- **No derived predicates or analysis** (success rates, quality scores)
- **No assurance level indicators** - relying parties infer assurance from verification sources

### 5.4 Example Evidence Object

```json
{
  "evidence": [
    {
      "type": "Attestation",
      "method": "NetworkPartnerAttestation",
      "verificationDate": "2025-03-15T10:30:00Z",
      "matchFields": ["professional_credential", "organization_affiliation", "np_approval"],
      "recordLocator": "urn:uuid:c3d4e5f6-a7b8-9012-cdef-123456789012",
      "verifier": "Sutton Group"
    },
    {
      "type": "CredentialVerification",
      "method": "ProfessionalCredentialCheck",
      "verificationDate": "2025-03-15T10:25:00Z",
      "matchFields": ["advisor_type", "license_status", "domain"],
      "recordLocator": "urn:uuid:b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "verifier": "Cornerstone Platform Inc."
    }
  ]
}
```

## 6. Issuance Rules

### 6.1 When Credential is Issued

The Portfolio Issuer Credential is issued when:
1. Holder possesses a valid Professional Credential (Verified Advisor)
2. Network Partner grants Portfolio Issuer authorization
3. Organization affiliation is verified (for Delegate Portfolio Issuers)
4. Holder has generated a DID in their Cornerstone Wallet

**Required Prerequisites:**
- **Cornerstone ID** (base identity credential) MUST exist
- **Professional Credential (Verified Advisor)** MUST exist and be valid

### 6.2 Credential Binding

The credential is bound to:
- A DID generated by the holder's wallet (stored in `credentialSubject.id`)
- A Cornerstone user account (via reference to Cornerstone ID)
- A Professional Credential reference (via `professional_credential_ref`)

### 6.3 Multi-Source Verification

If Portfolio Issuer authorization involves multiple verification sources (e.g., Network Partner attestation AND Cornerstone Network approval), the evidence array contains multiple objects documenting each verification source. This increases assurance without requiring an explicit assurance level field.

## 7. Refresh & Expiration

### 7.1 Expiration Period

Portfolio Issuer credentials expire **1-3 years** after issuance (exact period determined by Network Partner policy or Cornerstone Network governance).

### 7.2 Refresh Triggers

Credential refresh is required when:
- Expiration date approaches (90 days prior)
- Professional Credential (Verified Advisor) is refreshed
- Organization affiliation changes
- Network Partner revokes and re-grants authorization
- Scope changes require credential update
- Holder requests refresh for any reason

### 7.3 Refresh Process

Refresh requires:
1. Re-verification of Professional Credential (Verified Advisor) status
2. Network Partner re-attestation
3. Revocation of previous Portfolio Issuer credential
4. Issuance of new credential with updated `issuance_date` and `expiration_date`

**Important**: Refresh must maintain alignment with underlying Professional Credential. If Professional Credential is revoked, Portfolio Issuer credential MUST also be revoked (cascade revocation).

## 8. Revocation Policy

### 8.1 Revocation Triggers

The Portfolio Issuer Credential will be revoked when:
1. Professional Credential (Verified Advisor) is revoked or expired
2. Network Partner terminates Portfolio Issuer authorization
3. Organization affiliation ends (employment termination, brokerage change)
4. Fraud or misuse of Portfolio Issuer authority detected
5. Regulatory or legal request for revocation
6. Network Partner membership in Cornerstone Network ends
7. Holder explicitly requests revocation

### 8.2 Cascade Revocation Rules

**Critical Dependency**: Portfolio Issuer credentials depend on Professional Credentials. If the underlying Professional Credential is revoked:
- Portfolio Issuer credential MUST be automatically revoked
- Holder loses authority to create new portfolios
- Existing portfolios created by this Portfolio Issuer remain valid (portfolios persist independently)
- Referral fee rights may be affected based on Network Partner policy

### 8.3 Revocation Method

Revocation is managed through the Cornerstone revocation registry. Revoked credentials are marked in the registry, and relying parties check revocation status before accepting credentials.

### 8.4 Post-Revocation

After revocation:
- Holder may request re-issuance by:
  - Ensuring Professional Credential (Verified Advisor) is valid
  - Obtaining new Network Partner attestation
  - Completing organization affiliation verification (if applicable)
- Portfolios previously created by this Portfolio Issuer remain valid and are not affected by revocation
- New portfolio creation is blocked until credential is re-issued

## 9. Policy Integration: What This Credential Enables

### 9.1 Access Control Implications

The Portfolio Issuer Credential enables specific capabilities within the Cornerstone network:

**Capabilities Granted:**
- **Portfolio creation authority**: Approve homeowner onboarding, issue Cornerstone IDs and Home Credentials
- **Identity verification authority**: Perform FINTRAC-compliant identity verification and issue credentials
- **Property ownership verification authority**: Verify land title records and issue Home Credentials
- **Data integration authority**: Initiate portfolio population from authoritative data sources
- **Branding rights**: Receive default portfolio branding (portfolio displays Network Partner branding)
- **Referral fee rights**: Earn ongoing referral fees when homeowner clients transact with service providers

**Example Policy Rules:**

1. **Portfolio Creation Policy**:
   ```
   IF holder presents:
      - Valid Cornerstone ID AND
      - Valid Professional Credential (Verified Advisor) AND
      - Valid Portfolio Issuer Credential
   THEN authorize: Create portfolio for homeowner client
   ```

2. **Credential Issuance Policy**:
   ```
   IF holder presents:
      - Valid Portfolio Issuer Credential
   THEN authorize: Issue Cornerstone ID and Home Credentials to homeowner
   ```

3. **Referral Fee Policy**:
   ```
   IF portfolio created by Portfolio Issuer AND homeowner transacts with service provider
   THEN: Portfolio Issuer earns referral fee per Network Partner agreement
   ```

### 9.2 Related Credentials

**Prerequisites (must exist before Portfolio Issuer credential can be issued):**
- **Cornerstone ID** - Base identity credential required for all users
- **Professional Credential (Verified Advisor)** - Professional licensing verification required for Portfolio Issuer authority

**Dependents (credentials that may depend on Portfolio Issuer credential):**
- **None directly** - Portfolio Issuer is a terminal credential in the hierarchy

**Credentials this Portfolio Issuer can issue to others:**
- **Cornerstone ID** - Can issue to homeowner clients during onboarding
- **Home Credential (Verified Homeowner)** - Can issue to homeowner clients after ownership verification

**Cascade Effect:**
- If **Cornerstone ID** is revoked → Portfolio Issuer credential revoked (foundation dependency)
- If **Professional Credential** is revoked → Portfolio Issuer credential revoked (prerequisite dependency)
- If **Portfolio Issuer credential** is revoked → No cascade to other credentials (terminal credential)

## 10. Schema Versioning

### 10.1 Version Management

The Portfolio Issuer credential schema follows semantic versioning:
- **Major version changes** (v1 → v2): Breaking changes requiring new schema URI
- **Minor version changes** (v1.0 → v1.1): Backward-compatible additions
- **Patch version changes** (v1.0.0 → v1.0.1): Non-breaking fixes

### 10.2 Breaking Changes

Examples of breaking changes requiring new major version:
- Removing required attributes (e.g., removing `npId`)
- Changing attribute data types (e.g., `canIssuePortfolios` from boolean to string)
- Renaming attributes (e.g., `issuer_type` to `portfolio_issuer_type`)
- Changing credential structure (e.g., flattening nested objects)

### 10.3 Backward Compatibility

Non-breaking changes (adding optional attributes, adding evidence types, adding enum values) maintain backward compatibility within same major version.

## 11. Validation Rules

### 11.1 Required Fields

All of the following fields MUST be present in a valid Portfolio Issuer Credential:

**credentialSubject:**
- `portfolio_issuer_id`
- `issuer_type`
- `npId`
- `np_name`
- `canIssuePortfolios`
- `grantedDate`
- `grantingAuthority`
- `professional_credential_ref`
- `portfolio_issuer_evidence`

**Envelope:**
- `issuer` (must be Network Partner DID or `did:web:cornerstoneplatform.ca`)
- `issuance_date`
- `expiration_date`
- `credentialSchema`
- `termsOfUse`

**Evidence:**
- At least one `evidence` object in the `evidence` array

### 11.2 Forbidden Fields

The following fields MUST NEVER appear in a Portfolio Issuer Credential:

**Performance Metrics:**
- Number of portfolios created
- Transaction volumes
- Success rates
- Quality scores

**Financial Information:**
- Commission structures
- Referral fee totals
- Compensation data
- Revenue metrics

**Client Information:**
- Homeowner names or identifiers
- Portfolio details
- Client lists
- Transaction details

**Homeownership Data:**
- PID (Parcel Identifier)
- Property addresses
- Title information
- Property assessment data

**Predicates:**
- Derived boolean or comparative fields
- Performance indicators

**Assurance Indicators:**
- `proof_level` or assurance level fields
- Trust level indicators
- Verification strength scores

## 12. Schema Definition (High-Level)

The JSON Schema for Portfolio Issuer Credential is located at:

**`/schemas/v1/portfolio-issuer.json`**

High-level structure:

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://schema.cornerstoneplatform.ca/contexts/portfolio-issuer-v1.json"
  ],
  "type": ["VerifiableCredential", "PortfolioIssuerCredential"],
  "issuer": "did:web:suttongroup.ca",
  "issuanceDate": "2025-03-15T10:30:00Z",
  "expirationDate": "2028-03-15T10:30:00Z",
  "credentialSubject": {
    "id": "did:example:professional123",
    "portfolio_issuer_id": "550e8400-e29b-41d4-a716-446655440000",
    "issuer_type": "DELEGATE",
    "npId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "np_name": "Sutton Group",
    "canIssuePortfolios": true,
    "scope": {
      "regions": ["British Columbia", "Ontario"],
      "offices": ["Vancouver Downtown", "Toronto Midtown"]
    },
    "grantedDate": "2025-03-15T10:30:00Z",
    "grantingAuthority": "Sutton Group",
    "professional_credential_ref": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "portfolio_issuer_evidence": "urn:uuid:c3d4e5f6-a7b8-9012-cdef-123456789012"
  },
  "evidence": [
    {
      "type": "Attestation",
      "method": "NetworkPartnerAttestation",
      "verificationDate": "2025-03-15T10:30:00Z",
      "matchFields": ["professional_credential", "organization_affiliation", "np_approval"],
      "recordLocator": "urn:uuid:c3d4e5f6-a7b8-9012-cdef-123456789012",
      "verifier": "Sutton Group"
    },
    {
      "type": "CredentialVerification",
      "method": "ProfessionalCredentialCheck",
      "verificationDate": "2025-03-15T10:25:00Z",
      "matchFields": ["advisor_type", "license_status", "domain"],
      "recordLocator": "urn:uuid:b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "verifier": "Cornerstone Platform Inc."
    }
  ],
  "credentialSchema": {
    "id": "https://schema.cornerstoneplatform.ca/v1/portfolio-issuer.json",
    "type": "JsonSchemaValidator2018"
  },
  "termsOfUse": {
    "type": "IssuerPolicy",
    "id": "https://cornerstoneplatform.ca/governance/portfolio-issuer-v1",
    "profile": "https://cornerstoneplatform.ca/governance/portfolio-issuer-v1"
  }
}
```

## 13. FINTRAC Compliance

### 13.1 Regulatory Context

Portfolio Issuers who are real estate professionals (REPs) are subject to FINTRAC (Proceeds of Crime, Money Laundering and Terrorist Financing Regulations) compliance requirements, including:
- **Identity verification obligations**: Must verify client identity through approved methods
- **5-year relationship maintenance**: Must maintain ongoing relationships with clients
- **Record retention**: Must retain identity verification records for 5 years

The Portfolio Issuer Credential supports FINTRAC compliance by:
- Documenting identity verification authority
- Enabling ongoing portfolio monitoring (5-year relationship maintenance)
- Retaining evidence records for audit purposes

### 13.2 Evidence Retention

Evidence supporting Portfolio Issuer credentials is retained for **five years** in compliance with FINTRAC regulations (where applicable) and general audit requirements. This includes:
- Network Partner attestation records
- Professional Credential verification records
- Organization affiliation verification records
- Audit logs of portfolio creation activities

## 14. References

### 14.1 Related Documents

- **Cornerstone Identity, Persona, and Access Model** - Conceptual framework describing Portfolio Issuer role, credential-based access control, and policy catalogue

- **Building Canada's Homeownership Trust Network** - Platform vision and architecture describing Portfolio Issuer economics, referral fee model, and viral adoption strategy

- **Cornerstone ID Credential Governance** - Base identity credential required as prerequisite

- **Professional Credential (Verified Advisor) Governance** - Professional licensing credential required as prerequisite

- **Verified Homeowner Credential Governance** - Credential that Portfolio Issuers issue to homeowner clients

### 14.2 Schema Resources

- **W3C Verifiable Credentials Data Model**: https://www.w3.org/TR/vc-data-model/
- **Cornerstone Schema Registry**: https://schema.cornerstoneplatform.ca/
- **Cornerstone Network Trust Registry**: https://trust.cornerstoneplatform.ca/

### 14.3 Governance Resources

- **Cornerstone Network Governance Framework**: Rules and standards for Network Partners and Portfolio Issuers
- **Network Partner Agreements**: Contractual terms for Portfolio Issuer authorization
- **Portfolio Issuer Policy Catalogue**: Access control policies based on Portfolio Issuer credentials

---

**Document Control**

- **Owner**: Cornerstone Network Trust Network
- **Governance Body**: Cornerstone Network
- **Review Cycle**: Annual or upon breaking schema changes
- **Contact**: governance@cornerstoneplatform.ca
