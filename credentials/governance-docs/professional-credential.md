# Professional Credential Documentation

## 1. About this Document

This document describes the **Professional Credential** to help potential verifiers determine whether it is suitable for their needs. The intended audience includes entities that need to confirm a professional's affiliation with an organization.

The Professional Credential is issued by **employer organizations** (e.g., Sutton Group, Royal LePage, TD Bank) and represents authoritative proof of a professional's affiliation with that organization.

### 1.1 Version History

| Ver.      | Date        | Notes                               | Author(s) |
|-----------|-------------|-------------------------------------|-------------------|
| **0.2**   | 4-Dec-2025  | Refocused on employment/affiliation (regulatory claims moved to Accreditation Credential) | Mathieu Glaude    |
| **0.1**   | 3-Sep-2025  | Initial draft                       | Mathieu Glaude    |

---

## 2. Credential Overview

The Professional Credential is a verifiable credential (VC) issued by employer organizations to individuals who are affiliated with them as employees, contractors, or delegates. This credential focuses exclusively on **organizational affiliation** and does not include regulatory licensing information.

The credential references the holder's **Cornerstone ID** for identity binding, rather than duplicating identity claims.

|              |                                                                 |
|--------------|-----------------------------------------------------------------|
| **Credential:** | Professional Credential                                       |
| **Schema:**     | Professional Credential v2.0                                  |
| **Issuer:**     | Employer Organization (e.g., Sutton Group, Royal LePage)      |
| **Issuer DID:** | Organization-specific (e.g., `did:web:sutton.ca`)             |

### 2.1 Attribute Summary

| **#** | **Name**             | **Attribute**          | **Data Type** | **Notes** |
|-------|----------------------|------------------------|---------------|-----------|
| 001   | Cornerstone ID Reference | `cornerstone_id`   | DID/URI       | Reference to holder's Cornerstone ID |
| 002   | Employer Name        | `employer_name`        | String        | Organization name |
| 003   | Employer DID         | `employer_did`         | DID           | Organization's decentralized identifier |
| 004   | Role/Title           | `role_title`           | String        | Job title or role within organization |
| 005   | Affiliation Type     | `affiliation_type`     | String        | employee, contractor, delegate |
| 006   | Start Date           | `start_date`           | Date          | When affiliation began |
| 007   | Team/Office          | `team_office`          | String        | Department, team, or office location |
| 008   | Status               | `status`               | String        | active, inactive, terminated |

---

## 3. Credential Details

### 3.1 Issuer

The Professional Credential is issued by the **employer organization** directly. Each organization that issues Professional Credentials must:
- Be registered in the Cornerstone Trust Registry as an authorized issuer
- Have a valid organizational DID
- Implement appropriate internal controls for credential issuance

Example issuers:
- Sutton Group (`did:web:sutton.ca`)
- Royal LePage (`did:web:royallepage.ca`)
- RE/MAX (`did:web:remax.ca`)

### 3.2 Schema and Credential Definition Governance

The Professional Credential schema is managed by COPA and registered on the Cornerstone Trust Registry. While the schema is standardized, each employer organization issues credentials using their own DID.

### 3.3 Issuer Data Source

The data comes from the employer organization's HR or personnel systems:

- **Affiliation verification**: The organization attests that the individual is affiliated with them
- **Role assignment**: The organization assigns the professional's role/title
- **Employment records**: Start date and status from HR systems

The credential binds a verified Cornerstone ID to their organizational affiliation.

#### 3.3.1 Data Updates
- A credential reflects the state of employment at issuance
- Status changes (termination, role change) require revocation and re-issuance
- Organizations are responsible for timely revocation when affiliation ends

### 3.4 Assurance

The credential combines two assurance anchors:
- Verified Cornerstone ID (identity already established)
- Employer attestation of affiliation

### 3.5 Revocation

A Professional Credential will be revoked in cases such as:
1. Employment/affiliation terminated
2. Role or affiliation type changed significantly
3. Cornerstone ID revoked or invalidated
4. Fraud or errors detected
5. Holder requests re-issuance

Re-issuance involves the employer issuing a new credential reflecting current status.

---

## 4. Credential Definition

### 4.1 Credential Schema

The Professional Credential conforms to W3C Verifiable Credentials and uses a COPA-managed schema:

- **Schema ID (URI):** `https://openpropertyassociation.ca/credentials/schemas/professional-credential.json`
- **Schema Versioning:** Breaking changes produce a new schema version.
- **Contexts:**
  - `https://www.w3.org/2018/credentials/v1`
  - `https://openpropertyassociation.ca/credentials/contexts/professional-v2.json`

### 4.2 Subject of the Credential

The subject is the **individual holder**, bound to an **organizational affiliation** at issuance. Binding is confirmed by:
- Reference to verified Cornerstone ID
- Employer attestation of affiliation

### 4.3 Attributes

#### 4.3.1 Identity Reference

*Cornerstone ID Reference (001)*

<table>
  <tr><th>Attribute</th><td><code>cornerstone_id</code></td></tr>
  <tr><th>Description</th><td>Reference to the holder's verified Cornerstone ID credential.</td></tr>
  <tr><th>Source</th><td>Cornerstone ID issuance.</td></tr>
  <tr><th>Data Type</th><td>DID/URI</td></tr>
</table>

#### 4.3.2 Organization Attributes

*Employer Name (002)*

<table>
  <tr><th>Attribute</th><td><code>employer_name</code></td></tr>
  <tr><th>Description</th><td>Legal name of the employing organization.</td></tr>
  <tr><th>Source</th><td>Employer organization.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
</table>

*Employer DID (003)*

<table>
  <tr><th>Attribute</th><td><code>employer_did</code></td></tr>
  <tr><th>Description</th><td>Decentralized identifier of the employing organization.</td></tr>
  <tr><th>Source</th><td>Trust Registry.</td></tr>
  <tr><th>Data Type</th><td>DID</td></tr>
</table>

#### 4.3.3 Affiliation Attributes

*Role/Title (004)*

<table>
  <tr><th>Attribute</th><td><code>role_title</code></td></tr>
  <tr><th>Description</th><td>The professional's job title or role within the organization.</td></tr>
  <tr><th>Source</th><td>Employer organization.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
</table>

*Affiliation Type (005)*

<table>
  <tr><th>Attribute</th><td><code>affiliation_type</code></td></tr>
  <tr><th>Description</th><td>Type of relationship with the organization.</td></tr>
  <tr><th>Source</th><td>Employer organization.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Values</th><td><code>employee</code>, <code>contractor</code>, <code>delegate</code></td></tr>
</table>

*Start Date (006)*

<table>
  <tr><th>Attribute</th><td><code>start_date</code></td></tr>
  <tr><th>Description</th><td>Date when the affiliation with the organization began.</td></tr>
  <tr><th>Source</th><td>Employer organization.</td></tr>
  <tr><th>Data Type</th><td>Date</td></tr>
</table>

*Team/Office (007)*

<table>
  <tr><th>Attribute</th><td><code>team_office</code></td></tr>
  <tr><th>Description</th><td>Department, team, or office location within the organization.</td></tr>
  <tr><th>Source</th><td>Employer organization.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
</table>

*Status (008)*

<table>
  <tr><th>Attribute</th><td><code>status</code></td></tr>
  <tr><th>Description</th><td>Current status of the affiliation.</td></tr>
  <tr><th>Source</th><td>Employer organization.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Values</th><td><code>active</code>, <code>inactive</code>, <code>terminated</code></td></tr>
</table>

---

## 5. Implementations

### 5.1 Technical Format

This credential uses the **W3C Verifiable Credentials Data Model** and the Professional Credential schema.

### 5.2 Issuer List

| Environment       | Issuer Name                | Issuer DID |
|-------------------|----------------------------|------------|
| Production        | Sutton Group               | TBA        |
| Production        | Royal LePage               | TBA        |
| Test/Dev          | Test Organization          | TBA        |

### 5.3 Schema Implementation

| Environment   | Ledger/Registry | Schema ID |
|---------------|-----------------|-----------|
| Production    | Cornerstone Trust Registry | TBA |
| Test/Dev      | Cornerstone Trust Registry | `cornerstone:2:professional:2.0` |

### 5.4 Credential Implementation

| Environment   | Ledger/Registry | Credential Definition ID | OCA Bundle |
|---------------|-----------------|--------------------------|------------|
| Production    | TBA             | TBA                      | TBA        |
| Test/Dev      | Cornerstone Trust Registry | TBA | TBA |

---

## 6. Relationship to Other Credentials

### 6.1 Cornerstone ID

The Professional Credential **requires** a valid Cornerstone ID. The `cornerstone_id` attribute references the holder's identity credential, eliminating the need to duplicate identity claims.

### 6.2 Accreditation Credential

The **Accreditation Credential** (issued by Cornerstone based on regulator data) attests to professional licensing status. A professional may hold:
- Only a Professional Credential (employed but not licensed)
- Only an Accreditation Credential (licensed but not currently employed)
- Both credentials (employed and licensed)

These credentials serve different purposes and have different issuers:
- **Professional Credential**: Employer attests to organizational affiliation
- **Accreditation Credential**: Cornerstone attests to regulatory standing based on regulator data

### 6.3 Portfolio Issuer Credential

Organizations that issue Professional Credentials may also hold a **Portfolio Issuer Credential** from COPA, which authorizes them to create homeowner portfolios and issue credentials within the Cornerstone ecosystem.
