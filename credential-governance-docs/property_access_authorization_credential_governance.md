# Property Access Authorization Credential (PAAC) – Credential Documentation

## 1. About this Document

This document describes the **Property Access Authorization Credential (PAAC)** verifiable credential to help potential verifiers determine whether it is suitable for their needs. The intended audience includes real estate professionals, lenders, insurers, financial service providers, trust network members, and any relying parties requiring authorized access to homeowner portfolio data.

The Property Access Authorization Credential is issued by **homeowners** to members of their property-specific trust network—professionals, advisors, service providers, family members, and trusted individuals. It represents **authorization to access specific portfolio data for a specific property** as defined by the issuing homeowner.

**Property Access Authorization Credential is a homeowner-issued credential**. Unlike other credentials in the Cornerstone network that are issued by Cornerstone Platform Inc., COPA, or Network Partners, this credential is issued directly by homeowners to grant selective access to their property portfolio data. The credential defines the scope of data sharing, the purpose of authorization, property-specific access boundaries, and any time-bound limitations.

**External terminology note**: This credential is referred to as "Letter of Authorization" in user-facing applications and marketing materials, while "Property Access Authorization Credential (PAAC)" is the internal technical term used in data models, schemas, and policy definitions.

### 1.1 Version History

| Ver.      | Date        | Notes                               | Author(s) |
|-----------|-------------|-------------------------------------|-------------|
| **1.0**   | TBA  | Initial release             | Mathieu Glaude    |

## 2. Credential Overview

The Property Access Authorization Credential is a verifiable credential (VC) issued by homeowners to individuals or organizations they wish to grant access to their portfolio data for a specific property. It enables the holder to access specific portfolio information while maintaining granular property-level and data-level control over what is shared and for what purpose.

This credential serves as the **authorization mechanism for property-specific trust networks**:
- **Issued by homeowners** to trust network members for a specific property
- **Property-specific scope**: Each Home Credential (property) has its own trust network; separate PAACs issued per property
- **Defines data sharing scope**: Specifies which portfolio data elements can be accessed (identity, ownership, equity, costs, insurance, etc.)
- **Purpose-bound authorization**: Documents the intent and purpose of data sharing
- **Access level control**: Read-only, operational, advisory, or transactional access
- **Time-bound validity**: Can include expiration dates or time-limited access
- **Revocable at any time**: Homeowner can revoke authorization immediately
- **Supports credential-based access control**: Applications verify PAAC credentials to determine data access permissions for specific properties

Each issuance is backed by:
- Valid Home Credential (Verified Homeowner) held by issuer
- Cornerstone ID held by recipient
- Homeowner-defined authorization scope and purpose

The credential is issued directly into the recipient's **Cornerstone Wallet** and can be presented to applications to access authorized portfolio data for the specified property.

|              |                                                                 |
|--------------|-----------------------------------------------------------------|
| **Credential:** | Property Access Authorization Credential (PAAC) <br/> *External term: Letter of Authorization*                                   |
| **Schema:**     | Property Access Authorization Credential v1.0                              |
| **Issuer:**     | Homeowner (credential holder with Home Credential for specific property) <br/> DID varies by homeowner |
| **Issuer DID:** | Individual homeowner DID (e.g., `did:web:cornerstoneplatform.ca:users:{user_id}`) |

### 2.1 Prerequisite Credentials

**Required Before Issuance:**

**For Issuer (Homeowner):**
- **Cornerstone ID** (base identity credential) - ALL users must hold this first
- **Home Credential (Verified Homeowner)** - Must hold valid Home Credential for the specific property referenced in PAAC

**For Recipient (Trust Network Member):**
- **Cornerstone ID** (base identity credential) - Recipient must hold valid Cornerstone ID to receive PAAC

**Credential Hierarchy:**
```
Homeowner (Issuer):
  Cornerstone ID (foundation)
  └── Home Credential (property-specific)
      └── Property Access Authorization Credential (PAAC) - issued to trust network member

Trust Network Member (Recipient):
  Cornerstone ID (foundation)
  └── Property Access Authorization Credential (PAAC) - received from homeowner
```

### 2.2 Attribute Summary

| **#**       | **Name**          | **Attribute**        | **Data Type** | **Notes** |
|-------------|-------------------|----------------------|---------------|-----------|
| 001         | Authorization ID  | `authorization_id`   | String (UUID) | Platform-generated unique identifier for this authorization. |
| 002         | Homeowner ID      | `homeowner_id`       | String (UUID) | Identifier of the homeowner issuing this authorization (links to issuer's Cornerstone ID). |
| 003         | Homeowner DID     | `homeowner_did`      | String (DID)  | Decentralized Identifier of the issuing homeowner. |
| 004         | Trust Network Member ID | `tnm_id`       | String (UUID) | Identifier of the trust network member receiving authorization (links to recipient's Cornerstone ID). |
| 005         | Trust Network Member DID | `tnm_did`     | String (DID)  | Decentralized Identifier of the recipient trust network member. |
| 006         | Property ID       | `property_id`        | String (UUID) | Identifier of the specific property/portfolio this authorization applies to (links to Home Credential). |
| 007         | Property Address  | `property_address`   | JSON object   | Human-readable property address for display purposes. |
| 008         | Data Scope        | `data_scope`         | JSON array    | Array of data categories or elements the recipient can access (e.g., ["identity", "ownership", "equity", "insurance"]). |
| 009         | Authorization Purpose | `authorization_purpose` | String    | Intent and purpose of data sharing (e.g., "mortgage refinance consultation", "insurance quote", "family trust network monitoring"). |
| 010         | Access Level      | `access_level`       | String (enum) | Level of access granted: `READ_ONLY`, `OPERATIONAL`, `ADVISORY`, `TRANSACTIONAL`. |
| 011         | Start Date        | `start_date`         | ISO 8601 timestamp | Date when authorization becomes valid. |
| 012         | Expiration Date   | `expiration_date`    | ISO 8601 timestamp | Optional: Date when authorization automatically expires. |
| 013         | Granted Date      | `granted_date`       | ISO 8601 timestamp | Date when homeowner issued this authorization. |
| 014         | Authorization Evidence | `authorization_evidence` | String / URI | UUID + source of authorization record (homeowner action log). |
| 015         | Relationship Category | `relationship_category` | String (enum) | Category defining the TNM's relationship to the homeowner (e.g., realtor, mortgage_broker, family_member). |

## 3. Credential Details

### 3.1 Issuer

The Property Access Authorization Credential is issued by **homeowners** who hold valid Home Credentials for the specific property referenced in the PAAC. Each homeowner can issue multiple PAACs to different trust network members for each property they own, each with different scopes, purposes, and access levels.

**Requirements for Homeowner Issuers:**
- Must hold valid Cornerstone ID (base identity)
- Must hold valid Home Credential for the property referenced in PAAC
- Must have active Cornerstone Wallet with DID
- Authorization action must be logged for audit purposes

**Technical Issuance Mechanism:**
- Homeowner initiates PAAC creation through Cornerstone platform or Network Partner application (e.g., Sutton Wealth)
- Homeowner selects recipient (by Cornerstone ID or email invitation)
- Homeowner defines data scope, authorization purpose, access level, and optional expiration date
- Platform generates PAAC and issues into recipient's Cornerstone Wallet
- Recipient receives notification and can accept or decline invitation

### 3.2 Schema and Credential Definition Governance

The Property Access Authorization Credential schema and definition are managed by **COPA** and registered on the **COPA Trust Registry**. While the schema is governed by COPA, the actual credential issuance is decentralized—each homeowner acts as an issuer for their own property-specific trust networks. Updates to the PAAC schema follow a change-managed governance process to ensure interoperability across all applications accessing the Cornerstone network.

### 3.3 Issuer Data Source

The data comes from the homeowner who defines:
- **What portfolio data can be shared**: Specific data elements or categories (identity, ownership, property details, equity, costs, insurance policies)
- **Who can access it**: Recipient identification (linked to their Cornerstone ID)
- **Why they are sharing it**: Purpose and intent of authorization
- **What property it applies to**: Property-specific authorization (via Home Credential / property_id)
- **What access level**: Read-only, operational, advisory, or transactional
- **How long access is granted**: Validity period and optional expiration date

**Technical Implementation:**
- Homeowner interacts with platform UI to define authorization scope
- Platform validates homeowner authority (checks valid Home Credential for property)
- Platform validates recipient identity (checks valid Cornerstone ID)
- Platform generates PAAC with homeowner-defined attributes
- Homeowner action logged in audit trail (evidence for `authorization_evidence`)

**Out of Scope**: This credential does NOT:
- Grant ownership rights or control over the property
- Provide identity verification of the recipient (recipient must hold Cornerstone ID independently)
- Include sensitive financial data directly (credentials enable access to data in portfolio, not contain it)
- Authorize changes to portfolio data (unless explicitly scoped as `TRANSACTIONAL` access level)
- Grant write access to property records or title information

#### 3.3.1 Data Updates

**Scope Modification:**
- Homeowner can modify authorization scope by revoking existing PAAC and issuing new PAAC with updated scope
- No in-place updates to existing credentials (revoke-and-reissue pattern maintains audit trail)

**Expiration Handling:**
- PAACs with `expiration_date` automatically become invalid after expiration
- Platform monitors expiration and updates revocation registry
- Recipient notified of impending expiration (e.g., 30 days prior)
- Homeowner can extend access by issuing new PAAC before expiration

**Revocation Process:**
- Homeowner can revoke PAAC at any time through platform UI
- Immediate revocation (no grace period unless explicitly configured)
- Recipient notified of revocation
- Revocation recorded in Cornerstone revocation registry
- Recipient's access to portfolio data immediately terminated

### 3.4 Assurance

The credential provides authorization assurance through:
- **Homeowner authority verification**: Issuer must hold valid Home Credential for the property
- **Recipient identity verification**: Recipient must hold valid Cornerstone ID
- **Platform-mediated issuance**: Cornerstone platform validates authority before issuing PAAC
- **Audit trail**: Authorization action logged in evidence for compliance and accountability

**Assurance Considerations:**
- No explicit assurance level indicator in credential
- Relying parties evaluate assurance based on:
  - Validity of issuer's Home Credential (homeowner authority)
  - Validity of recipient's Cornerstone ID (trust network member identity)
  - Revocation status check (current authorization state)
  - Evidence array documenting authorization action

### 3.5 Revocation

A Property Access Authorization Credential will be revoked in cases such as:
1. Homeowner explicitly revokes authorization
2. Credential reaches `expiration_date` (automatic expiration)
3. Trust network relationship ends (homeowner terminates access)
4. Portfolio ownership changes (property sold, Home Credential revoked)
5. Recipient's Cornerstone ID is revoked or expired
6. Security incident or unauthorized use detected
7. Homeowner account is closed or deactivated
8. Legal or regulatory request for revocation

**Cascade Revocation:**
- If issuing homeowner's **Cornerstone ID** is revoked → all PAACs issued by that homeowner are revoked
- If issuing homeowner's **Home Credential for the property** is revoked → all PAACs for that property are revoked
- If recipient's **Cornerstone ID** is revoked → all PAACs held by that recipient are revoked

**Revocation Method:**
- Homeowner-initiated revocation: Immediate update to Cornerstone revocation registry
- Automatic expiration: Platform monitors `expiration_date` and updates registry
- Cascade revocation: Platform automatically revokes dependent PAACs when prerequisite credentials are revoked

**Notification Process:**
- Recipient notified via email and in-app notification when PAAC is revoked
- Recipient's Cornerstone Wallet updates revocation status immediately
- Applications querying revocation registry receive updated status in real-time

**Grace Periods:**
- No grace period for homeowner-initiated revocation (immediate effect)
- Optional grace period for expiration renewal (e.g., 30-day warning before expiration)

## 4. Credential Definition

### 4.1 Credential Schema

The Property Access Authorization Credential conforms to W3C Verifiable Credentials and uses a COPA-managed schema:

- **Schema ID (URI):** `https://schema.cornerstoneplatform.ca/v1/property-access-authorization.json`
- **Schema Versioning:** Breaking changes produce a new schema version.
- **Contexts:**
  - `https://www.w3.org/2018/credentials/v1`
  - `https://schema.cornerstoneplatform.ca/contexts/property-access-authorization-v1.json`

### 4.2 Subject of the Credential

The subject is the **trust network member (recipient)**, bound to their Cornerstone ID. Binding is confirmed by:
- Valid Cornerstone ID held by recipient
- DID generated by recipient's Cornerstone Wallet
- Association with specific property via `property_id`

### 4.3 Attributes

#### 4.3.1 Core Authorization Attributes (Required)

*Authorization ID (001)*

<table>
  <tr><th>Attribute</th><td><code>authorization_id</code></td></tr>
  <tr><th>Description</th><td>Platform-generated unique identifier for this authorization.</td></tr>
  <tr><th>Source</th><td>Cornerstone platform authorization management system.</td></tr>
  <tr><th>Data Type</th><td>String (UUID format recommended)</td></tr>
  <tr><th>Examples</th><td><code>d4e5f6a7-b8c9-0123-def0-123456789012</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Homeowner ID (002)*

<table>
  <tr><th>Attribute</th><td><code>homeowner_id</code></td></tr>
  <tr><th>Description</th><td>Identifier of the homeowner issuing this authorization (links to issuer's Cornerstone ID).</td></tr>
  <tr><th>Source</th><td>Cornerstone platform user management system.</td></tr>
  <tr><th>Data Type</th><td>String (UUID format)</td></tr>
  <tr><th>Examples</th><td><code>a1b2c3d4-e5f6-7890-abcd-ef1234567890</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Homeowner DID (003)*

<table>
  <tr><th>Attribute</th><td><code>homeowner_did</code></td></tr>
  <tr><th>Description</th><td>Decentralized Identifier of the issuing homeowner.</td></tr>
  <tr><th>Source</th><td>Homeowner's Cornerstone Wallet.</td></tr>
  <tr><th>Data Type</th><td>String (DID format)</td></tr>
  <tr><th>Examples</th><td><code>did:web:cornerstoneplatform.ca:users:a1b2c3d4</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Trust Network Member ID (004)*

<table>
  <tr><th>Attribute</th><td><code>tnm_id</code></td></tr>
  <tr><th>Description</th><td>Identifier of the trust network member receiving authorization (links to recipient's Cornerstone ID).</td></tr>
  <tr><th>Source</th><td>Cornerstone platform user management system.</td></tr>
  <tr><th>Data Type</th><td>String (UUID format)</td></tr>
  <tr><th>Examples</th><td><code>e5f6a7b8-c9d0-1234-ef01-234567890123</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Trust Network Member DID (005)*

<table>
  <tr><th>Attribute</th><td><code>tnm_did</code></td></tr>
  <tr><th>Description</th><td>Decentralized Identifier of the recipient trust network member.</td></tr>
  <tr><th>Source</th><td>Recipient's Cornerstone Wallet.</td></tr>
  <tr><th>Data Type</th><td>String (DID format)</td></tr>
  <tr><th>Examples</th><td><code>did:web:cornerstoneplatform.ca:users:e5f6a7b8</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Property ID (006)*

<table>
  <tr><th>Attribute</th><td><code>property_id</code></td></tr>
  <tr><th>Description</th><td>Identifier of the specific property/portfolio this authorization applies to (links to Home Credential).</td></tr>
  <tr><th>Source</th><td>Homeowner's Home Credential for the specific property.</td></tr>
  <tr><th>Data Type</th><td>String (UUID format)</td></tr>
  <tr><th>Examples</th><td><code>f6a7b8c9-d0e1-2345-f012-345678901234</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
  <tr><th>Notes</th><td>Critical for property-specific trust networks. Each property has its own trust network with separate PAACs.</td></tr>
</table>

*Property Address (007)*

<table>
  <tr><th>Attribute</th><td><code>property_address</code></td></tr>
  <tr><th>Description</th><td>Human-readable property address for display purposes in applications.</td></tr>
  <tr><th>Source</th><td>Home Credential property data.</td></tr>
  <tr><th>Data Type</th><td>JSON object containing: <code>street_address</code>, <code>locality</code>, <code>region</code>, <code>postal_code</code>, <code>country</code></td></tr>
  <tr><th>Examples</th><td><code>{"street_address": "123 Main St", "locality": "Vancouver", "region": "BC", "postal_code": "V6B 1A1", "country": "CA"}</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Data Scope (008)*

<table>
  <tr><th>Attribute</th><td><code>data_scope</code></td></tr>
  <tr><th>Description</th><td>Array of data categories or elements the recipient can access. Defines granular data access permissions.</td></tr>
  <tr><th>Source</th><td>Homeowner-defined authorization scope.</td></tr>
  <tr><th>Data Type</th><td>JSON array of strings (enum values)</td></tr>
  <tr><th>Examples</th><td><code>["identity", "ownership", "equity", "insurance", "property_details"]</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
  <tr><th>Notes</th><td>Possible values: <code>"identity"</code>, <code>"ownership"</code>, <code>"property_details"</code>, <code>"equity"</code>, <code>"costs"</code>, <code>"insurance"</code>, <code>"mortgage"</code>, <code>"valuations"</code>, <code>"documents"</code>, <code>"full_portfolio"</code>.</td></tr>
</table>

*Authorization Purpose (009)*

<table>
  <tr><th>Attribute</th><td><code>authorization_purpose</code></td></tr>
  <tr><th>Description</th><td>Intent and purpose of data sharing. Documents why homeowner is granting access.</td></tr>
  <tr><th>Source</th><td>Homeowner input during authorization creation.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>"Mortgage refinance consultation"</code>, <code>"Insurance policy quote"</code>, <code>"Family trust network monitoring"</code>, <code>"Financial planning advisory"</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Access Level (010)*

<table>
  <tr><th>Attribute</th><td><code>access_level</code></td></tr>
  <tr><th>Description</th><td>Level of access granted. Determines what actions recipient can perform.</td></tr>
  <tr><th>Source</th><td>Homeowner-defined access level.</td></tr>
  <tr><th>Data Type</th><td>String (enum: <code>READ_ONLY</code>, <code>OPERATIONAL</code>, <code>ADVISORY</code>, <code>TRANSACTIONAL</code>)</td></tr>
  <tr><th>Examples</th><td><code>READ_ONLY</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
  <tr><th>Notes</th><td><code>READ_ONLY</code>: View data only. <code>OPERATIONAL</code>: View + operational actions (e.g., property manager updating maintenance logs). <code>ADVISORY</code>: View + advisory actions (e.g., REP providing market insights). <code>TRANSACTIONAL</code>: View + transactional actions (e.g., authorized to initiate refinance on homeowner's behalf).</td></tr>
</table>

*Start Date (011)*

<table>
  <tr><th>Attribute</th><td><code>start_date</code></td></tr>
  <tr><th>Description</th><td>ISO 8601 timestamp of when authorization becomes valid.</td></tr>
  <tr><th>Source</th><td>Homeowner-defined or defaults to issuance date.</td></tr>
  <tr><th>Data Type</th><td>String (ISO 8601 timestamp)</td></tr>
  <tr><th>Examples</th><td><code>2025-04-01T00:00:00Z</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Granted Date (013)*

<table>
  <tr><th>Attribute</th><td><code>granted_date</code></td></tr>
  <tr><th>Description</th><td>ISO 8601 timestamp of when homeowner issued this authorization.</td></tr>
  <tr><th>Source</th><td>Platform-generated at issuance time.</td></tr>
  <tr><th>Data Type</th><td>String (ISO 8601 timestamp)</td></tr>
  <tr><th>Examples</th><td><code>2025-03-25T14:32:00Z</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

#### 4.3.2 Optional Attributes

*Expiration Date (012)*

<table>
  <tr><th>Attribute</th><td><code>expiration_date</code></td></tr>
  <tr><th>Description</th><td>Optional ISO 8601 timestamp of when authorization automatically expires. If omitted, authorization remains valid until explicitly revoked.</td></tr>
  <tr><th>Source</th><td>Homeowner-defined during authorization creation.</td></tr>
  <tr><th>Data Type</th><td>String (ISO 8601 timestamp) or null</td></tr>
  <tr><th>Examples</th><td><code>2026-04-01T00:00:00Z</code> or <code>null</code> (no expiration)</td></tr>
  <tr><th>Required</th><td>No</td></tr>
</table>

#### 4.3.3 Evidence Attributes

*Authorization Evidence (014)*

<table>
  <tr><th>Attribute</th><td><code>authorization_evidence</code></td></tr>
  <tr><th>Description</th><td>UUID referencing homeowner authorization action log, audit trail, and timestamp. Links to stored evidence record for compliance purposes.</td></tr>
  <tr><th>Source</th><td>Cornerstone platform authorization action log.</td></tr>
  <tr><th>Data Type</th><td>String (UUID) or URI</td></tr>
  <tr><th>Examples</th><td><code>urn:uuid:d4e5f6a7-b8c9-0123-def0-123456789012</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
  <tr><th>Notes</th><td>Evidence retained for audit and accountability. Full evidence details available in the <code>evidence</code> array of the credential.</td></tr>
</table>

*Relationship Category (015)*

<table>
  <tr><th>Attribute</th><td><code>relationship_category</code></td></tr>
  <tr><th>Description</th><td>Category defining the trust network member's relationship to the homeowner. Enables granular access control policies based on relationship type.</td></tr>
  <tr><th>Source</th><td>Homeowner-defined during authorization creation, or derived from recipient's Professional Credential type.</td></tr>
  <tr><th>Data Type</th><td>String (enum)</td></tr>
  <tr><th>Examples</th><td><code>realtor</code>, <code>mortgage_broker</code>, <code>family_member</code>, <code>accountant</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
  <tr><th>Notes</th><td>Valid values: <code>realtor</code>, <code>mortgage_broker</code>, <code>family_member</code>, <code>accountant</code>, <code>lawyer</code>, <code>insurance_agent</code>, <code>property_manager</code>, <code>contractor</code>, <code>financial_advisor</code>, <code>other</code>. This attribute enables Network Partner applications to apply relationship-specific access policies and UI experiences.</td></tr>
</table>

## 5. Evidence Requirements

The `evidence` section of the credential documents the authorization action and verification of homeowner authority. Each verification source used must appear as an object in the `evidence` array.

### 5.1 Evidence Array Structure

Each evidence object must include:

<table>
  <tr><th>Field</th><th>Description</th><th>Required</th></tr>
  <tr><td><code>type</code></td><td>Type of evidence (e.g., "AuthorizationAction", "HomeownerVerification")</td><td>Yes</td></tr>
  <tr><td><code>method</code></td><td>Verification method used (e.g., "PlatformAuthorizationFlow", "HomeCredentialVerification")</td><td>Yes</td></tr>
  <tr><td><code>verificationDate</code></td><td>ISO 8601 timestamp of when authorization occurred</td><td>Yes</td></tr>
  <tr><td><code>matchFields</code></td><td>Array of fields that were verified (e.g., ["homeowner_authority", "property_ownership", "recipient_identity"])</td><td>Yes</td></tr>
  <tr><td><code>recordLocator</code></td><td>Reference to stored evidence record (UUID or URI) in authorization action log</td><td>Yes</td></tr>
  <tr><td><code>verifier</code></td><td>Entity that performed verification (e.g., "Cornerstone Platform Inc.")</td><td>Yes</td></tr>
</table>

### 5.2 What Goes in Evidence

- Type of authorization action performed
- Method used (platform-mediated authorization flow)
- Authorization timestamp (when homeowner issued PAAC)
- Fields that were verified (homeowner authority via Home Credential, recipient identity via Cornerstone ID, property_id linkage)
- Reference locator for audit trail (authorization action log UUID)
- Verifier entity information (Cornerstone platform)
- Any metadata required for accountability

### 5.3 What Must NOT Go in Evidence

- **No sensitive portfolio data** (evidence documents authorization action, not portfolio contents)
- **No financial information** (equity amounts, mortgage balances, cost details)
- **No derived predicates or analysis**
- **No assurance level indicators** - relying parties infer assurance from verification sources

### 5.4 Example Evidence Object

```json
{
  "evidence": [
    {
      "type": "AuthorizationAction",
      "method": "PlatformAuthorizationFlow",
      "verificationDate": "2025-03-25T14:32:00Z",
      "matchFields": ["homeowner_authority", "property_ownership", "recipient_identity"],
      "recordLocator": "urn:uuid:d4e5f6a7-b8c9-0123-def0-123456789012",
      "verifier": "Cornerstone Platform Inc."
    },
    {
      "type": "CredentialVerification",
      "method": "HomeCredentialCheck",
      "verificationDate": "2025-03-25T14:31:00Z",
      "matchFields": ["property_id", "homeowner_id", "ownership_status"],
      "recordLocator": "urn:uuid:f6a7b8c9-d0e1-2345-f012-345678901234",
      "verifier": "Cornerstone Platform Inc."
    },
    {
      "type": "IdentityVerification",
      "method": "CornerstoneIDCheck",
      "verificationDate": "2025-03-25T14:30:00Z",
      "matchFields": ["tnm_id", "tnm_did", "identity_status"],
      "recordLocator": "urn:uuid:e5f6a7b8-c9d0-1234-ef01-234567890123",
      "verifier": "Cornerstone Platform Inc."
    }
  ]
}
```

## 6. Issuance Rules

### 6.1 When Credential is Issued

The Property Access Authorization Credential is issued when:
1. Issuer (homeowner) holds valid Cornerstone ID
2. Issuer holds valid Home Credential for the specific property referenced in PAAC
3. Recipient (trust network member) holds valid Cornerstone ID
4. Homeowner defines authorization scope, purpose, access level, and validity period
5. Platform validates homeowner authority and recipient identity
6. Recipient accepts trust network invitation (if required)

**Conditions for Issuance:**
- **Homeowner requirements**: Valid Cornerstone ID + valid Home Credential for property
- **Recipient requirements**: Valid Cornerstone ID (must exist before PAAC can be issued)
- **Property requirements**: Property identified by `property_id` must match homeowner's Home Credential
- **Scope requirements**: Data scope must be valid enum values (no arbitrary data categories)
- **Purpose requirements**: Authorization purpose must be provided (no blank authorizations)

### 6.2 Credential Binding

The credential is bound to:
- **Issuer**: Homeowner's DID generated by their Cornerstone Wallet (stored in `issuer` field)
- **Subject**: Recipient's DID generated by their Cornerstone Wallet (stored in `credentialSubject.id`)
- **Property**: Property ID from homeowner's Home Credential (stored in `property_id`)

**Cryptographic Binding:**
- Credential signed by homeowner's private key (associated with `homeowner_did`)
- Recipient identified by `tnm_did` (DID from recipient's wallet)
- Platform validates signatures and DIDs before accepting PAAC for access control decisions

### 6.3 Homeowner Authority Verification

Unlike multi-source verification for identity credentials, PAAC issuance requires verification of homeowner authority:
- **Home Credential verification**: Platform checks that issuer holds valid Home Credential for `property_id`
- **Property ownership confirmation**: Platform confirms `property_id` matches issuer's Home Credential
- **Authorization action logging**: Platform logs homeowner action for audit trail (evidence)

**Not Applicable**: Multi-source verification in the traditional sense (multiple identity providers) does not apply to homeowner-issued credentials. Verification focuses on homeowner authority and recipient identity.

## 7. Refresh & Expiration

### 7.1 Expiration Period

Property Access Authorization Credentials can be issued with or without expiration:
- **No expiration**: If `expiration_date` is null or omitted, PAAC remains valid until explicitly revoked
- **Time-bound**: If `expiration_date` is provided, PAAC automatically expires on that date

**Typical Expiration Patterns:**
- **Short-term service provider access**: 30-90 days (e.g., insurance quote, mortgage application)
- **Ongoing professional advisor access**: 1-3 years (e.g., REP relationship, financial advisor)
- **Family trust network access**: No expiration (ongoing family monitoring, co-ownership)

### 7.2 Refresh Triggers

Credential refresh (revoke-and-reissue) is required when:
- Expiration date approaches and homeowner wants to extend access
- Authorization scope changes (different data elements, different access level)
- Authorization purpose changes
- Property ownership changes but homeowner wants to maintain trust network (transfer to new Home Credential)

### 7.3 Refresh Process

Refresh follows a **revoke-and-reissue pattern**:
1. Homeowner revokes existing PAAC
2. Homeowner issues new PAAC with updated attributes (new `authorization_id`, updated `granted_date`, new `expiration_date` if applicable)
3. Recipient receives updated PAAC in wallet
4. Applications query revocation registry and accept new PAAC

**Important**: No in-place updates to existing PAACs. Revoke-and-reissue maintains clear audit trail of authorization changes.

## 8. Revocation Policy

### 8.1 Revocation Triggers

The Property Access Authorization Credential will be revoked when:
1. Homeowner explicitly revokes authorization
2. Credential reaches `expiration_date` (automatic expiration)
3. Trust network relationship ends
4. Portfolio ownership changes (property sold, Home Credential revoked)
5. Issuing homeowner's Cornerstone ID is revoked
6. Issuing homeowner's Home Credential for the property is revoked
7. Recipient's Cornerstone ID is revoked or expired
8. Security incident or unauthorized use detected
9. Homeowner account is closed or deactivated
10. Legal or regulatory request for revocation

### 8.2 Cascade Revocation Rules

**Critical Dependencies**: PAACs depend on both homeowner credentials and recipient credentials.

**If Homeowner's Cornerstone ID is revoked:**
- ALL PAACs issued by that homeowner (across all properties) are automatically revoked
- Cascade effect: Homeowner loses authority to issue any credentials

**If Homeowner's Home Credential for specific property is revoked:**
- ALL PAACs for that specific property are automatically revoked
- Other properties owned by same homeowner are unaffected

**If Recipient's Cornerstone ID is revoked:**
- ALL PAACs held by that recipient (across all properties) are automatically revoked
- Cascade effect: Recipient loses access to all trust networks

### 8.3 Revocation Method

Revocation is managed through the **Cornerstone revocation registry**:
- **Homeowner-initiated revocation**: Immediate update to registry, recipient notified
- **Automatic expiration**: Platform monitors `expiration_date`, updates registry automatically
- **Cascade revocation**: Platform automatically revokes dependent PAACs when prerequisite credentials are revoked
- **Status verification**: Relying parties check revocation status before accepting PAACs for access control

**Technical Revocation Mechanism:**
- Revocation registry maintains list of revoked `authorization_id` values
- Applications query registry before granting access based on PAAC
- Real-time status updates (no caching of revocation status)

**Notification Process:**
- Recipient notified via email and in-app notification when PAAC is revoked
- Recipient's Cornerstone Wallet updates credential status to "revoked"
- Applications immediately terminate recipient's access to portfolio data for that property

### 8.4 Post-Revocation

After revocation:
- Recipient loses immediate access to portfolio data for that property
- Recipient can request new PAAC by contacting homeowner (if relationship continues)
- Homeowner can issue new PAAC with updated scope, purpose, or expiration
- Revoked PAAC remains in audit trail for accountability

**Data Access Cutoff:**
- Applications enforce real-time revocation checks
- No grace period for revoked PAACs (immediate access termination)
- Recipient cannot present revoked PAAC to gain access

## 9. Policy Integration: What This Credential Enables

### 9.1 Access Control Implications

The Property Access Authorization Credential enables specific data access capabilities within the Cornerstone network:

**Capabilities Granted:**
- **Property-specific portfolio data access**: View portfolio data for the specific property identified by `property_id`
- **Granular data scope access**: Access limited to data categories specified in `data_scope` array
- **Purpose-bound access**: Access documented with clear authorization purpose
- **Access level enforcement**: Actions limited by `access_level` (read-only, operational, advisory, transactional)
- **Time-bound access**: Automatically expires per `expiration_date` if specified

**Example Policy Rules:**

1. **Portfolio Data Access Policy**:
   ```
   IF trust network member presents:
      - Valid Cornerstone ID AND
      - Valid PAAC for property_id AND
      - PAAC is not revoked AND
      - Current date is between start_date and expiration_date (if expiration_date exists)
   THEN authorize: Access portfolio data per data_scope for property_id
   ```

2. **Data Scope Enforcement Policy**:
   ```
   IF PAAC.data_scope includes "equity"
   THEN authorize: View equity data (market valuation, mortgage balance, equity position)
   ELSE deny: Equity data access
   ```

3. **Access Level Enforcement Policy**:
   ```
   IF PAAC.access_level == "READ_ONLY"
   THEN authorize: View-only access to data_scope
   ELSE IF PAAC.access_level == "TRANSACTIONAL"
   THEN authorize: View + initiate transactions on homeowner's behalf
   ```

### 9.2 Related Credentials

**Prerequisites (must exist before PAAC can be issued):**
- **For Issuer (Homeowner)**:
  - **Cornerstone ID** - Base identity credential required for all users
  - **Home Credential (Verified Homeowner)** - Property ownership verification required for issuing PAACs

- **For Recipient (Trust Network Member)**:
  - **Cornerstone ID** - Base identity credential required to receive PAACs

**Dependents (credentials that may depend on PAAC):**
- **None directly** - PAAC is a terminal credential in the hierarchy (no credentials build upon PAACs)

**Cascade Effect:**
- If **Homeowner's Cornerstone ID** is revoked → all PAACs issued by that homeowner are revoked
- If **Homeowner's Home Credential for property** is revoked → all PAACs for that property are revoked
- If **Recipient's Cornerstone ID** is revoked → all PAACs held by that recipient are revoked
- If **PAAC** is revoked → No cascade to other credentials (terminal credential)

## 10. Schema Versioning

### 10.1 Version Management

The Property Access Authorization Credential schema follows semantic versioning:
- **Major version changes** (v1 → v2): Breaking changes requiring new schema URI
- **Minor version changes** (v1.0 → v1.1): Backward-compatible additions
- **Patch version changes** (v1.0.0 → v1.0.1): Non-breaking fixes

### 10.2 Breaking Changes

Examples of breaking changes requiring new major version:
- Removing required attributes (e.g., removing `property_id`)
- Changing attribute data types (e.g., `data_scope` from array to string)
- Renaming attributes (e.g., `authorization_purpose` to `purpose`)
- Changing credential structure (e.g., flattening nested objects)

### 10.3 Backward Compatibility

Non-breaking changes (adding optional attributes, adding evidence types, adding `data_scope` enum values, adding `access_level` enum values) maintain backward compatibility within same major version.

## 11. Validation Rules

### 11.1 Required Fields

All of the following fields MUST be present in a valid Property Access Authorization Credential:

**credentialSubject:**
- `authorization_id`
- `homeowner_id`
- `homeowner_did`
- `tnm_id`
- `tnm_did`
- `property_id`
- `property_address`
- `data_scope`
- `authorization_purpose`
- `access_level`
- `start_date`
- `granted_date`
- `authorization_evidence`
- `relationship_category`

**Envelope:**
- `issuer` (must be homeowner DID)
- `issuanceDate`
- `credentialSchema`
- `termsOfUse`

**Evidence:**
- At least one `evidence` object in the `evidence` array

### 11.2 Forbidden Fields

The following fields MUST NEVER appear in a Property Access Authorization Credential:

**Portfolio Data Contents:**
- Equity amounts, mortgage balances, property valuations (credentials enable access, not contain data)
- Insurance policy details, cost breakdowns, financial summaries
- Property assessment data, tax amounts
- Mortgage terms, loan details

**Sensitive Personal Information:**
- Social security numbers, tax IDs
- Banking information, credit scores
- Personal health information
- Unrelated property data (other properties owned by homeowner)

**Predicates:**
- Derived boolean or comparative fields
- Risk scores, quality indicators

**Assurance Indicators:**
- `proof_level` or assurance level fields
- Trust level indicators
- Verification strength scores

## 12. Schema Definition (High-Level)

The JSON Schema for Property Access Authorization Credential is located at:

**`/schemas/v1/property-access-authorization.json`**

High-level structure:

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://schema.cornerstoneplatform.ca/contexts/property-access-authorization-v1.json"
  ],
  "type": ["VerifiableCredential", "PropertyAccessAuthorizationCredential"],
  "issuer": "did:web:cornerstoneplatform.ca:users:a1b2c3d4",
  "issuanceDate": "2025-03-25T14:32:00Z",
  "credentialSubject": {
    "id": "did:web:cornerstoneplatform.ca:users:e5f6a7b8",
    "authorization_id": "d4e5f6a7-b8c9-0123-def0-123456789012",
    "homeowner_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "homeowner_did": "did:web:cornerstoneplatform.ca:users:a1b2c3d4",
    "tnm_id": "e5f6a7b8-c9d0-1234-ef01-234567890123",
    "tnm_did": "did:web:cornerstoneplatform.ca:users:e5f6a7b8",
    "property_id": "f6a7b8c9-d0e1-2345-f012-345678901234",
    "property_address": {
      "street_address": "123 Main St",
      "locality": "Vancouver",
      "region": "BC",
      "postal_code": "V6B 1A1",
      "country": "CA"
    },
    "data_scope": ["identity", "ownership", "equity", "insurance"],
    "authorization_purpose": "Mortgage refinance consultation",
    "access_level": "READ_ONLY",
    "relationship_category": "mortgage_broker",
    "start_date": "2025-04-01T00:00:00Z",
    "expiration_date": "2026-04-01T00:00:00Z",
    "granted_date": "2025-03-25T14:32:00Z",
    "authorization_evidence": "urn:uuid:d4e5f6a7-b8c9-0123-def0-123456789012"
  },
  "evidence": [
    {
      "type": "AuthorizationAction",
      "method": "PlatformAuthorizationFlow",
      "verificationDate": "2025-03-25T14:32:00Z",
      "matchFields": ["homeowner_authority", "property_ownership", "recipient_identity"],
      "recordLocator": "urn:uuid:d4e5f6a7-b8c9-0123-def0-123456789012",
      "verifier": "Cornerstone Platform Inc."
    },
    {
      "type": "CredentialVerification",
      "method": "HomeCredentialCheck",
      "verificationDate": "2025-03-25T14:31:00Z",
      "matchFields": ["property_id", "homeowner_id", "ownership_status"],
      "recordLocator": "urn:uuid:f6a7b8c9-d0e1-2345-f012-345678901234",
      "verifier": "Cornerstone Platform Inc."
    },
    {
      "type": "IdentityVerification",
      "method": "CornerstoneIDCheck",
      "verificationDate": "2025-03-25T14:30:00Z",
      "matchFields": ["tnm_id", "tnm_did", "identity_status"],
      "recordLocator": "urn:uuid:e5f6a7b8-c9d0-1234-ef01-234567890123",
      "verifier": "Cornerstone Platform Inc."
    }
  ],
  "credentialSchema": {
    "id": "https://schema.cornerstoneplatform.ca/v1/property-access-authorization.json",
    "type": "JsonSchemaValidator2018"
  },
  "termsOfUse": {
    "type": "IssuerPolicy",
    "id": "https://cornerstoneplatform.ca/governance/property-access-authorization-v1",
    "profile": "https://cornerstoneplatform.ca/governance/property-access-authorization-v1"
  }
}
```

## 13. References

### 13.1 Related Documents

- **Cornerstone Identity, Persona, and Access Model** - Conceptual framework describing property-specific trust networks, PAAC role, and credential-based access control

- **Building Canada's Homeownership Trust Network** - Platform vision and architecture describing trust network authorization model, elder financial abuse prevention, and distributed verification

- **Cornerstone ID Credential Governance** - Base identity credential required for all PAAC issuers and recipients

- **Verified Homeowner Credential Governance** - Property ownership credential required for PAAC issuers

### 13.2 Schema Resources

- **W3C Verifiable Credentials Data Model**: https://www.w3.org/TR/vc-data-model/
- **Cornerstone Schema Registry**: https://schema.cornerstoneplatform.ca/
- **COPA Trust Registry**: https://trust.cornerstoneplatform.ca/

### 13.3 Governance Resources

- **COPA Governance Framework**: Rules and standards for homeowner-issued credentials and trust networks
- **Property Access Authorization Policy Catalogue**: Access control policies based on PAAC credentials
- **Trust Network Best Practices**: Guidance for homeowners on authorization scope and access level selection

---

**Document Control**

- **Owner**: COPA Trust Network
- **Governance Body**: COPA
- **Review Cycle**: Annual or upon breaking schema changes
- **Contact**: governance@cornerstoneplatform.ca
