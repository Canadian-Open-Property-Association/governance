# Accreditation Credential Documentation

## 1. About this Document

This document describes the **Accreditation Credential** to help potential verifiers determine whether it is suitable for their needs. The intended audience includes entities that need to confirm the licensing and good-standing status of professionals.

The Accreditation Credential is issued by **Cornerstone Platform Inc.** and represents authoritative proof of a professional's verified licensing or registration information obtained from provincial regulators such as:

- [**RECO** (Real Estate Council of Ontario)](https://registrantsearch.reco.on.ca/)
- [**BCFSA** (BC Financial Services Authority)](https://www.bcfsa.ca/)

### 1.1 Version History

| Ver.      | Date        | Notes                               | Author(s) |
|-----------|-------------|-------------------------------------|-------------------|
| **0.1**   | 4-Dec-2025  | Initial draft (split from Professional Credential) | Mathieu Glaude    |

---

## 2. Credential Overview

The Accreditation Credential is a verifiable credential (VC) issued to individuals who are confirmed as licensed or registered professionals by their provincial regulator. This credential focuses exclusively on **regulatory standing** and does not include employment or identity information.

The credential references the holder's **Cornerstone ID** for identity binding, rather than duplicating identity claims.

Each issuance is backed by:
- Regulator registry verification (name + licence match)
- Reference to holder's verified Cornerstone ID

The credential is issued directly into the Cornerstone Wallet and can be consumed by relying parties to verify professional licensing status.

|              |                                                                 |
|--------------|-----------------------------------------------------------------|
| **Credential:** | Accreditation Credential                                      |
| **Schema:**     | Accreditation Credential v1.0                                 |
| **Issuer:**     | Cornerstone Platform Inc. <br/> [https://cornerstone.ca](https://cornerstone.ca) |
| **Issuer DID:** | TBA (e.g., `did:web:cornerstone.ca`)                          |

### 2.1 Attribute Summary

| **#** | **Name**             | **Attribute**          | **Data Type** | **Notes** |
|-------|----------------------|------------------------|---------------|-----------|
| 001   | Cornerstone ID Reference | `cornerstone_id`   | DID/URI       | Reference to holder's Cornerstone ID |
| 002   | Profession Category  | `profession_category`  | String        | e.g., Real Estate, Appraiser |
| 003   | Licence Number       | `licence_number`       | String        | Regulatory licence/registration number |
| 004   | Licence Status       | `licence_status`       | String        | REGISTERED, LICENSED, SUSPENDED, etc. |
| 005   | Licence Expiry       | `licence_expiry`       | Date          | Expiry date from regulator record |
| 006   | Regulator Name       | `regulator_name`       | String        | e.g., RECO, BCFSA |
| 007   | Regulator URI        | `regulator_uri`        | URI           | Link to regulator website |
| 008   | Jurisdiction         | `jurisdiction`         | String        | Province of registration (e.g., ON, BC) |
| 009   | Discipline/Conditions | `discipline_notes`    | String        | Any regulator-imposed conditions or disciplinary actions |
| 010   | Evidence Reference   | `evidence`             | URI           | Reference to verification evidence |

---

## 3. Credential Details

### 3.1 Issuer

The Accreditation Credential is issued by **Cornerstone Platform Inc.**, acting as the credential authority. Each credential is issued only after regulator registry checks are successfully completed and matched to a verified Cornerstone ID.

### 3.2 Schema and Credential Definition Governance

The Accreditation Credential schema and definition are managed by Cornerstone and registered on the Cornerstone Trust Registry. Updates follow a change-managed governance process to ensure interoperability.

### 3.3 Issuer Data Source

The data comes from authoritative provincial regulator registries:

- **RECO** (Real Estate Council of Ontario) - licence status, category, expiry
- **BCFSA** (BC Financial Services Authority) - registration status, category, expiry
- Other provincial regulators as supported

The credential binds a verified Cornerstone ID to their professional designation from the regulator.

#### 3.3.1 Data Updates
- A credential reflects the state of records at issuance.
- Licence or status changes require revocation and re-issuance.
- Evidence is retained for five years in compliance with FINTRAC.

### 3.4 Assurance

The credential combines two assurance anchors:
- Verified Cornerstone ID (identity already established)
- Regulator licence/registry record match

### 3.5 Revocation

An Accreditation Credential will be revoked in cases such as:
1. Licence expired, suspended, or revoked by regulator
2. Cornerstone ID revoked or invalidated
3. Fraud or errors detected
4. Holder requests re-issuance

Re-issuance involves re-verification and issuance of a new credential to the holder's Cornerstone Wallet.

---

## 4. Credential Definition

### 4.1 Credential Schema

The Accreditation Credential conforms to W3C Verifiable Credentials and uses a Cornerstone-managed schema:

- **Schema ID (URI):** `https://schema.cornerstoneplatform.ca/v1/accreditation.json`
- **Schema Versioning:** Breaking changes produce a new schema and new capture_base digest.
- **Contexts:**
  - `https://www.w3.org/2018/credentials/v1`
  - `https://schema.cornerstoneplatform.ca/contexts/accreditation-v1.json`

### 4.2 Subject of the Credential

The subject is the **individual holder**, bound to a **professional licence** at issuance. Binding is confirmed by:
- Reference to verified Cornerstone ID
- Regulator record match (name, licence number, status)

### 4.3 Attributes

#### 4.3.1 Identity Reference

*Cornerstone ID Reference (001)*

<table>
  <tr><th>Attribute</th><td><code>cornerstone_id</code></td></tr>
  <tr><th>Description</th><td>Reference to the holder's verified Cornerstone ID credential.</td></tr>
  <tr><th>Source</th><td>Cornerstone ID issuance.</td></tr>
  <tr><th>Data Type</th><td>DID/URI</td></tr>
</table>

#### 4.3.2 Regulatory Attributes

*Profession Category (002)*

<table>
  <tr><th>Attribute</th><td><code>profession_category</code></td></tr>
  <tr><th>Description</th><td>Professional category (e.g., Broker, Representative, Trading).</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
</table>

*Licence Number (003)*

<table>
  <tr><th>Attribute</th><td><code>licence_number</code></td></tr>
  <tr><th>Description</th><td>Unique licence/registration number issued by regulator.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry (e.g., RECO, BCFSA).</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
</table>

*Licence Status (004)*

<table>
  <tr><th>Attribute</th><td><code>licence_status</code></td></tr>
  <tr><th>Description</th><td>Registration/licence status (REGISTERED, LICENSED, SUSPENDED, REVOKED).</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
</table>

*Licence Expiry (005)*

<table>
  <tr><th>Attribute</th><td><code>licence_expiry</code></td></tr>
  <tr><th>Description</th><td>Expiry date of licence/registration.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry.</td></tr>
  <tr><th>Data Type</th><td>Date</td></tr>
</table>

*Regulator Name (006)*

<table>
  <tr><th>Attribute</th><td><code>regulator_name</code></td></tr>
  <tr><th>Description</th><td>Name of the regulatory body that issued the licence.</td></tr>
  <tr><th>Source</th><td>System configuration.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
</table>

*Regulator URI (007)*

<table>
  <tr><th>Attribute</th><td><code>regulator_uri</code></td></tr>
  <tr><th>Description</th><td>URL to the regulator's public registry or website.</td></tr>
  <tr><th>Source</th><td>System configuration.</td></tr>
  <tr><th>Data Type</th><td>URI</td></tr>
</table>

*Jurisdiction (008)*

<table>
  <tr><th>Attribute</th><td><code>jurisdiction</code></td></tr>
  <tr><th>Description</th><td>The province or territorial jurisdiction under which the professional is licensed or registered (e.g., ON for Ontario, BC for British Columbia).</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
</table>

*Discipline / Conditions (009)*

<table>
  <tr><th>Attribute</th><td><code>discipline_notes</code></td></tr>
  <tr><th>Description</th><td>Conditions or discipline history on file with the regulator.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
</table>

#### 4.3.3 Evidence Attributes

*Evidence Reference (010)*

<table>
  <tr><th>Attribute</th><td><code>evidence</code></td></tr>
  <tr><th>Description</th><td>URI referencing the regulator verification record and verification date.</td></tr>
  <tr><th>Source</th><td>Cornerstone verification process.</td></tr>
  <tr><th>Data Type</th><td>URI</td></tr>
</table>

---

## 5. Implementations

### 5.1 Technical Format

This credential uses the **W3C Verifiable Credentials Data Model** and the Accreditation Credential schema.

### 5.2 Issuer List

| Environment       | Issuer Name                | Issuer DID |
|-------------------|----------------------------|------------|
| Production        | Cornerstone Platform Inc.  | TBA        |
| Test/Dev          | Cornerstone Platform Inc.  | TBA        |

### 5.3 Schema Implementation

| Environment   | Ledger/Registry | Schema ID |
|---------------|-----------------|-----------|
| Production    | Cornerstone Trust Registry | TBA |
| Test/Dev      | Cornerstone Trust Registry | `cornerstone:2:accreditation:1.0` |

### 5.4 Credential Implementation

| Environment   | Ledger/Registry | Credential Definition ID | OCA Bundle |
|---------------|-----------------|--------------------------|------------|
| Production    | TBA             | TBA                      | TBA        |
| Test/Dev      | Cornerstone Trust Registry | TBA | TBA |

---

## 6. Relationship to Other Credentials

### 6.1 Cornerstone ID

The Accreditation Credential **requires** a valid Cornerstone ID. The `cornerstone_id` attribute references the holder's identity credential, eliminating the need to duplicate identity claims.

### 6.2 Professional Credential

The **Professional Credential** (issued by employers) attests to employment/affiliation relationships. A professional may hold:
- Only a Professional Credential (employed but not licensed)
- Only an Accreditation Credential (licensed but not currently employed)
- Both credentials (employed and licensed)

These credentials serve different purposes and have different issuers.
