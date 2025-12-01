# Verified Professional Credential Documentation

## 1. About this Document

This document describes the **Verified Professional** verifiable credential to help potential verifiers determine whether it is suitable for their needs. The intended audience includes entities that need to confirm the licensing and good-standing status of professionals.

The Verified Professional Credential is issued by **Cornerstone Platform Inc.** and represents authoritative proof of a professional’s identity combined with verified licensing or registration information obtained from provincial regulators such as:

- [**RECO** (Real Estate Council of Ontario)](https://registrantsearch.reco.on.ca/)
- [**BCFSA** (BC Financial Services Authority)](https://www.bcfsa.ca/)

### 1.1 Version History

| Ver.      | Date        | Notes                               | Author(s) |
|-----------|-------------|-------------------------------------|-------------------|
| **0.1**   | 3-Sep-2025  | Initial draft                       | Mathieu Glaude    |

---

## 2. Credential Overview

The Verified Professional Credential is a verifiable credential (VC) issued to individuals who are confirmed as licensed or registered professionals by their provincial regulator.  

Each issuance is backed by **FINTRAC-compliant dual-process checks**:
- Interac Bank Verification or BC Person Credential, and  
- Regulator registry name + licence match (e.g., RECO, BCFSA).  

The credential is issued directly into the Cornerstone Wallet and can be consumed by relying parties without requiring them to re-run identity or licensing checks.

|              |                                                                 |
|--------------|-----------------------------------------------------------------|
| **Credential:** | Verified Professional                                         |
| **Schema:**     | Verified Professional v1.0                                    |
| **Issuer:**     | Cornerstone Platform Inc. <br/> [https://cornerstone.ca](https://cornerstone.ca) |
| **Issuer DID:** | TBA (e.g., `did:web:cornerstone.ca`)                          |

### 2.1 Attribute Summary

| **#**             | **Name**             | **Attribute**          | **Data Type** | **Notes** |
|----------------------|----------------------|------------------------|---------------|-----------|
| 001         | Given Names          | `given_names`          | String        | Legal given names. |
| 002         | Family Name          | `family_name`          | String        | Legal family/surname. |
| 003         | Date of Birth        | `birthdate_dateint`    | Integer       | `YYYYMMDD` for ZK proofs. |
| 004         | Verified Email       | `verified_email`       | String        | Verified via OTP or equivalent. |
| 005         | Profession Category  | `profession_category`  | String        | e.g., Real Estate, Appraiser. |
| 006         | Licence Number       | `licence_number`       | String        | Regulatory licence/registration number. |
| 007         | Licence Status       | `licence_status`       | String        | REGISTERED, LICENSED, SUSPENDED, etc. |
| 008         | Licence Expiry       | `licence_expiry`       | Date          | Expiry date from regulator record. |
| 009         | Business Name        | `business_name`        | String        | Brokerage or corporate entity. |
| 010         | Business Address     | `business_address`     | JSON object   | Standardized postal address. |
| 011         | Business Contact     | `business_contact`     | JSON object   | Phone/email/fax from regulator listing. |
| 012         | Jurisdiction         | `jurisdiction`         | String        | Province of registration (e.g., ON, BC). |
| 013         | Conditions / Discipline | `discipline_notes` | String        | Any regulator-imposed conditions or disciplinary actions. |
| 014         | Identity Evidence | `identity_evidence`       | String / URI  | UUID + source of IDV evidence. |
| 015         | Professional Evidence | `professional_evidence` | String / URI | UUID + source of regulator evidence. |

---

## 3. Credential Details

### 3.1 Issuer

The Verified Professional Credential is issued by **Cornerstone Platform Inc.**, acting as the credential authority. Each credential is issued only after both identity and regulator registry checks are successfully completed.

### 3.2 Schema and Credential Definition Governance

The Verified Professional Credential schema and definition are managed by Cornerstone and registered on the Cornerstone Trust Registry. Updates follow a change-managed governance process to ensure interoperability.

### 3.3 Issuer Data Source

The data comes from two authoritative categories:

- **Identity Verification**: Remote photo ID + liveness, Interac Bank Verification Service, or BC Person Credential.  
- **Professional Verification**: Provincial real estate regulator registries (e.g., RECO, BCFSA) providing licence status, category, expiry, and business affiliation.  

Together these bind a person’s verified identity to their professional designation.

#### 3.3.1 Data Updates
- A credential reflects the state of records at issuance.  
- Licence or status changes require revocation and re-issuance.  
- Evidence is retained for five years in compliance with FINTRAC.  

### 3.4 Assurance

The credential combines three assurance anchors:
- High-assurance identity (Person Credential or Interac IVS),  
- Remote photo ID + liveness,  
- Regulator licence/registry record.  

### 3.5 Revocation

A Verified Professional Credential will be revoked in cases such as:
1. Licence expired, suspended, or revoked,  
2. Identity evidence expires,  
3. Fraud or errors detected,  
4. Holder requests re-issuance.  

Re-issuance involves re-verification and issuance of a new credential to the holder’s Cornerstone Wallet.

---

## 4. Credential Definition

### 4.1 Credential Schema

The Verified Professional Credential conforms to W3C Verifiable Credentials and uses a Cornerstone-managed schema:

- **Schema ID (URI):** `https://schema.cornerstoneplatform.ca/v1/professional.json`  
- **Schema Versioning:** Breaking changes produce a new schema and new capture_base digest.  
- **Contexts:**  
  - `https://www.w3.org/2018/credentials/v1`  
  - `https://schema.cornerstoneplatform.ca/contexts/professional-v1.json`

### 4.2 Subject of the Credential

The subject is the **individual holder**, bound to a **professional licence** at issuance. Binding is confirmed by:
- High-assurance ID verification, and  
- Regulator record match (name, licence number, status).  

### 4.3 Attributes

#### 4.3.1 Identity Attributes

*Given Names (001)*

<table>
  <tr><th>Attribute</th><td><code>given_names</code></td></tr>
  <tr><th>Description</th><td>Legal given names.</td></tr>
  <tr><th>Source</th><td>Interac or BC Person Credential.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
</table>

*Family Name (002)*

<table>
  <tr><th>Attribute</th><td><code>family_name</code></td></tr>
  <tr><th>Description</th><td>Legal surname.</td></tr>
  <tr><th>Source</th><td>Interac or BC Person Credential.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
</table>

*Date of Birth (003)*

<table>
  <tr><th>Attribute</th><td><code>birthdate_dateint</code></td></tr>
  <tr><th>Description</th><td>Date of birth (YYYYMMDD).</td></tr>
  <tr><th>Source</th><td>Interac or BC Person Credential.</td></tr>
  <tr><th>Data Type</th><td>Integer</td></tr>
</table>

*Verified Email (004)*

<table>
  <tr><th>Attribute</th><td><code>verified_email</code></td></tr>
  <tr><th>Description</th><td>Email verified during Onboarding process.</td></tr>
  <tr><th>Source</th><td>Cornerstone Onboarding flow.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
</table>

#### 4.3.2 Professional Attributes

*Profession Category (005)*

<table>
  <tr><th>Attribute</th><td><code>profession_category</code></td></tr>
  <tr><th>Description</th><td>Professional category (e.g., Broker, Representative, Trading).</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
</table>

*Licence Number (006)*

<table>
  <tr><th>Attribute</th><td><code>licence_number</code></td></tr>
  <tr><th>Description</th><td>Unique licence/registration number issued by regulator.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry (e.g., RECO, BCFSA).</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
</table>

*Licence Status (007)*

<table>
  <tr><th>Attribute</th><td><code>licence_status</code></td></tr>
  <tr><th>Description</th><td>Registration/licence status (REGISTERED, LICENSED, SUSPENDED, REVOKED).</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
</table>

*Licence Expiry (008)*

<table>
  <tr><th>Attribute</th><td><code>licence_expiry</code></td></tr>
  <tr><th>Description</th><td>Expiry date of licence/registration.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry.</td></tr>
  <tr><th>Data Type</th><td>Date</td></tr>
</table>

*Business Name (009)*

<table>
  <tr><th>Attribute</th><td><code>business_name</code></td></tr>
  <tr><th>Description</th><td>Name of affiliated brokerage or firm.</td></tr>
  <tr><th>Source</th><td>Regulator record.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
</table>

*Business Address (010)*

<table>
  <tr><th>Attribute</th><td><code>business_address</code></td></tr>
  <tr><th>Description</th><td>Standardized postal address of business entity.</td></tr>
  <tr><th>Source</th><td>Regulator record.</td></tr>
  <tr><th>Data Type</th><td>JSON object</td></tr>
</table>

*Business Contact (011)*

<table>
  <tr><th>Attribute</th><td><code>business_contact</code></td></tr>
  <tr><th>Description</th><td>Phone/email/fax from regulator listing.</td></tr>
  <tr><th>Source</th><td>Regulator record.</td></tr>
  <tr><th>Data Type</th><td>JSON object</td></tr>
</table>

*Jurisdiction (012)*

<table>
  <tr><th>Attribute</th><td><code>jurisdiction</code></td></tr>
  <tr><th>Description</th><td>The province or territorial jurisdiction under which the professional is licensed or registered (e.g., ON for Ontario, BC for British Columbia).</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry (e.g., RECO, BCFSA).</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
</table>

*Discipline / Conditions (013)*

<table>
  <tr><th>Attribute</th><td><code>discipline_notes</code></td></tr>
  <tr><th>Description</th><td>Conditions or discipline history on file.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
</table>

#### 4.3.3 Evidence Attributes

*Identity Evidence (014)*

<table>
  <tr><th>Attribute</th><td><code>identity_evidence</code></td></tr>
  <tr><th>Description</th><td>UUID referencing IDV source(s), author, and date of verification.</td></tr>
  <tr><th>Source</th><td>Cornerstone IDV process.</td></tr>
  <tr><th>Data Type</th><td>String / URI</td></tr>
</table>

*Professional Evidence (015)*

<table>
  <tr><th>Attribute</th><td><code>professional_evidence</code></td></tr>
  <tr><th>Description</th><td>UUID referencing regulator record and verification date.</td></tr>
  <tr><th>Source</th><td>Cornerstone IDV process + regulator registry.</td></tr>
  <tr><th>Data Type</th><td>String / URI</td></tr>
</table>

---

## 5. Implementations

### 5.1 Technical Format

This credential uses the **W3C Verifiable Credentials Data Model** and the Verified Professional schema.

### 5.2 Issuer List

| Environment       | Issuer Name                | Issuer DID |
|-------------------|----------------------------|------------|
| Production        | Cornerstone Platform Inc.  | TBA        |
| Test/Dev          | Cornerstone Platform Inc.  | TBA        |

### 5.3 Schema Implementation

| Environment   | Ledger/Registry | Schema ID |
|---------------|-----------------|-----------|
| Production    | Cornerstone Trust Registry | TBA |
| Test/Dev      | Cornerstone Trust Registry | `cornerstone:2:verified-professional:1.0` |

### 5.4 Credential Implementation

| Environment   | Ledger/Registry | Credential Definition ID | OCA Bundle |
|---------------|-----------------|--------------------------|------------|
| Production    | TBA             | TBA                      | TBA        |
| Test/Dev      | Cornerstone Trust Registry | `cornerstone:3:CL:56789:verified-professional` | [Verified Professional OCA Bundle](https://github.com/cornerstone/oca-bundles/tree/main/verified-professional) |

