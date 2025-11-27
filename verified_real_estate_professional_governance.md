# Verified Real Estate Professional – Credential Documentation

## Table of Contents

- [1. About this Document](#1-about-this-document)
  - [1.1 Version History](#11-version-history)
- [2. Credential Overview](#2-credential-overview)
  - [2.1 Attribute Summary](#21-attribute-summary)
- [3. Credential Details](#3-credential-details)
  - [3.1 Issuer](#31-issuer)
  - [3.2 Schema and Credential Definition Governance](#32-schema-and-credential-definition-governance)
  - [3.3 Issuer Data Source](#33-issuer-data-source)
  - [3.4 Assurance](#34-assurance)
  - [3.5 Revocation](#35-revocation)
- [4. Credential Definition](#4-credential-definition)
  - [4.1 Credential Schema](#41-credential-schema)
  - [4.2 Subject of the Credential](#42-subject-of-the-credential)
  - [4.3 Attributes](#43-attributes)
- [5. Implementations](#5-implementations)
  - [5.1 Technical Format](#51-technical-format)
  - [5.2 Issuer List](#52-issuer-list)
  - [5.3 Schema Implementation](#53-schema-implementation)
  - [5.4 Credential Implementation](#54-credential-implementation)

---

## 1. About this Document

This document describes the **Verified Real Estate Professional** verifiable credential to help potential verifiers determine whether it is suitable for their needs. The intended audience includes homeowners, real estate brokerages, lenders, insurers, and other participants in the Canadian real estate ecosystem.

The Verified Real Estate Professional Credential is issued by **Sutton Group** to Sutton real estate professionals, and represents authoritative proof of their identity combined with:
- Verified employment/affiliation with their brokerage (from Sutton Homebase system of record)
- Verified professional licensing status (from provincial regulators)

Provincial real estate regulators include:

- [**BCFSA** (BC Financial Services Authority)](https://www.bcfsa.ca/) - British Columbia
- [**RECO** (Real Estate Council of Ontario)](https://www.reco.on.ca/) - Ontario
- [**OACIQ** (Organisme d'autoréglementation du courtage immobilier du Québec)](https://www.oaciq.com/en/) - Quebec

### 1.1 Version History

| Ver.      | Date        | Notes                               | Author(s) |
|-----------|-------------|-------------------------------------|-------------------|
| **0.2**   | 12-Nov-2025  | Restructured into Real Estate Professional credential with 3 attribute categories | Mathieu Glaude    |
| **0.1**   | 3-Sep-2025  | Initial draft                       | Mathieu Glaude    |

[↑ Back to top](#table-of-contents)

---

## 2. Credential Overview

The Verified Real Estate Professional Credential is a verifiable credential (VC) issued to individuals who are confirmed as licensed real estate professionals by their provincial regulator and affiliated with a real estate brokerage.

Each issuance combines **three verification processes**:
- **Identity Verification**: Interac Bank Verification or BC Person Credential
- **Employer Verification**: Brokerage affiliation from employer system of record (e.g., Sutton Homebase)
- **Professional Licensing**: Provincial regulator licence match (e.g., BCFSA, RECO, OACIQ)

The credential is issued directly into the **Cornerstone Wallet** and can be consumed by relying parties without requiring them to re-run identity or licensing checks.

|              |                                                                 |
|--------------|-----------------------------------------------------------------|
| **Credential:** | Verified Real Estate Professional                             |
| **Schema:**     | Verified Real Estate Professional v1.0                        |
| **Issuer:**     | Sutton Group <br/> [https://sutton.com](https://sutton.com) |
| **Issuer DID:** | TBA (e.g., `did:web:sutton.com`)                          |

### 2.1 Attribute Summary

| **#**   | **Name**                   | **Attribute**                | **Data Type**    | **Notes** |
|---------|----------------------------|------------------------------|------------------|-----------|
| **Identity Attributes** ||||
| 001     | Given Names                | `given_names`                | String           | Legal given names. |
| 002     | Family Name                | `family_name`                | String           | Legal family/surname. |
| 003     | Date of Birth              | `birthdate_dateint`          | Integer          | `YYYYMMDD` for ZK proofs. |
| 004     | Verified Email             | `verified_email`             | String           | Verified via OTP or equivalent. |
| 005     | Identity Evidence          | `identity_evidence`          | String / URI     | UUID + source of IDV evidence. |
| **Employer/Organization Attributes** ||||
| 006     | Office/Brokerage Name      | `office_brokerage_name`      | String           | Affiliated office or brokerage. |
| 007     | Office Role                | `office_role`                | String           | Role at brokerage (e.g., Owner, Agent). |
| 008     | Specialties                | `specialties`                | Array of Strings | Areas of specialization (multi-value). |
| 009     | Service Areas              | `service_areas`              | Array of Strings | Territories/neighborhoods served (multi-value). |
| 010     | Join Year                  | `join_year`                  | Integer          | Year joined organization. |
| 011     | Employer Evidence          | `employer_evidence`          | String / URI     | UUID + source of employer verification. |
| **Professional Designation Attributes** ||||
| 012     | Licence Number             | `licence_number`             | String           | Regulatory licence number. |
| 013     | Licence Status             | `licence_status`             | String           | Licensed, Suspended, Revoked, etc. |
| 014     | Licence Effective Date     | `licence_effective_date`     | Date             | Date licence became effective. |
| 015     | Licence Expiry             | `licence_expiry`             | Date             | Licence expiry date. |
| 016     | Licensed As                | `licensed_as`                | String           | Professional designation (e.g., Representative, Broker). |
| 017     | Licensed For               | `licensed_for`               | String           | Services authorized (e.g., Trading, Rental). |
| 018     | Business Name              | `business_name`              | String           | Brokerage name from regulator. |
| 019     | Business Address           | `business_address`           | JSON object      | Business address from regulator. |
| 020     | Jurisdiction               | `jurisdiction`               | String           | Province (BC, ON, QC). |
| 021     | Regulatory Body            | `regulatory_body`            | String           | BCFSA, RECO, or OACIQ. |
| 022     | Licence Conditions         | `licence_conditions`         | String           | Any conditions on licence. |
| 023     | Discipline Notes           | `discipline_notes`           | String           | Discipline history from regulator. |
| 024     | Professional Evidence      | `professional_evidence`      | String / URI     | UUID + source of regulator evidence. |

[↑ Back to top](#table-of-contents)

---

## 3. Credential Details

### 3.1 Issuer

The Verified Real Estate Professional Credential is issued by **Sutton Group**, acting as the credential authority. Each credential is issued only after identity verification, employer affiliation verification, and provincial regulator licence verification are successfully completed.

[↑ Back to section](#3-credential-details)

### 3.2 Schema and Credential Definition Governance

The Verified Real Estate Professional Credential schema and definition are managed by Cornerstone and registered on the **Cornerstone Network Trust Registry**. Updates follow a change-managed governance process to ensure interoperability.

[↑ Back to section](#3-credential-details)

### 3.3 Issuer Data Source

The data comes from three authoritative categories:

#### 3.3.1 Identity Verification
- **Source**: Interac Bank Verification Service or BC Person Credential
- **Purpose**: High-assurance identity verification binding the individual to their government-issued identity
- **Attributes**: Legal names, date of birth, verified email

#### 3.3.2 Employer/Organization Verification
- **Source**: Employer system of record (e.g., Sutton Homebase system)
- **Purpose**: Confirms brokerage affiliation, role, and professional profile
- **Attributes**: Office/brokerage name, office role, specialties, service areas, join year

#### 3.3.3 Professional Licensing Verification
- **Source**: Provincial real estate regulator registries
  - **BC**: BCFSA (BC Financial Services Authority)
  - **ON**: RECO (Real Estate Council of Ontario)
  - **QC**: OACIQ (Organisme d'autoréglementation du courtage immobilier du Québec)
- **Purpose**: Confirms professional licensing, good standing, and regulatory compliance
- **Attributes**: Licence number, status, expiry, designation, business information, discipline history

Together these three sources bind a person's verified identity to their brokerage affiliation and professional licensing status.

#### 3.3.4 Data Updates
- A credential reflects the state of records at issuance.
- Licence changes, employment changes, or identity updates require revocation and re-issuance.
- Evidence is retained for compliance and audit purposes.

[↑ Back to section](#3-credential-details)

### 3.4 Assurance

The credential combines three assurance anchors:
- **Identity**: High-assurance identity (Person Credential or Interac IVS)
- **Employment**: Brokerage system of record confirmation
- **Licensing**: Provincial regulator licence/registry record

[↑ Back to section](#3-credential-details)

### 3.5 Revocation

A Verified Real Estate Professional Credential will be revoked in cases such as:
1. Licence expired, suspended, or revoked by regulator
2. Employment with brokerage terminated
3. Identity evidence expires
4. Fraud or errors detected
5. Holder requests re-issuance

Re-issuance involves re-verification across all three sources and issuance of a new credential to the holder's Cornerstone Wallet.

[↑ Back to section](#3-credential-details)

[↑ Back to top](#table-of-contents)

---

## 4. Credential Definition

### 4.1 Credential Schema

The Verified Real Estate Professional Credential conforms to W3C Verifiable Credentials and uses a Cornerstone-managed schema:

- **Schema ID (URI):** `https://schema.cornerstoneplatform.ca/v1/real-estate-professional.json`
- **Schema Versioning:** Breaking changes produce a new schema and new capture_base digest.
- **Contexts:**
  - `https://www.w3.org/2018/credentials/v1`
  - `https://schema.cornerstoneplatform.ca/contexts/real-estate-professional-v1.json`

[↑ Back to section](#4-credential-definition)

### 4.2 Subject of the Credential

The subject is the **individual holder**, bound to both a **brokerage affiliation** and a **professional licence** at issuance. Binding is confirmed by:
- High-assurance ID verification
- Employer system of record confirmation
- Regulator record match (name, licence number, status)

[↑ Back to section](#4-credential-definition)

### 4.3 Attributes

#### 4.3.1 Identity Attributes

*Given Names (001)*

<table>
  <tr><th>Attribute</th><td><code>given_names</code></td></tr>
  <tr><th>Description</th><td>Legal given names.</td></tr>
  <tr><th>Source</th><td>Interac Bank Verification Service or BC Person Credential.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><strong>BC:</strong> <code>Larry William</code><br/><strong>ON:</strong> <code>Sarah Jane</code><br/><strong>QC:</strong> <code>Marie-Claude</code></td></tr>
</table>

*Family Name (002)*

<table>
  <tr><th>Attribute</th><td><code>family_name</code></td></tr>
  <tr><th>Description</th><td>Legal surname.</td></tr>
  <tr><th>Source</th><td>Interac Bank Verification Service or BC Person Credential.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><strong>BC:</strong> <code>Anderson</code><br/><strong>ON:</strong> <code>Thompson</code><br/><strong>QC:</strong> <code>Tremblay</code></td></tr>
</table>

*Date of Birth (003)*

<table>
  <tr><th>Attribute</th><td><code>birthdate_dateint</code></td></tr>
  <tr><th>Description</th><td>Date of birth in <code>YYYYMMDD</code> format, compatible with ZK proofs.</td></tr>
  <tr><th>Source</th><td>Interac Bank Verification Service or BC Person Credential.</td></tr>
  <tr><th>Data Type</th><td>Integer</td></tr>
  <tr><th>Examples</th><td><code>19750315</code></td></tr>
</table>

*Verified Email (004)*

<table>
  <tr><th>Attribute</th><td><code>verified_email</code></td></tr>
  <tr><th>Description</th><td>Email verified during Cornerstone onboarding process.</td></tr>
  <tr><th>Source</th><td>Cornerstone Onboarding Flow.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><strong>BC:</strong> <code>anderson@sutton.com</code><br/><strong>ON:</strong> <code>sthompson@sutton.com</code><br/><strong>QC:</strong> <code>mtremblay@sutton.com</code></td></tr>
</table>

*Identity Evidence (005)*

<table>
  <tr><th>Attribute</th><td><code>identity_evidence</code></td></tr>
  <tr><th>Description</th><td>UUID referencing IDV source(s), author, and date of verification.</td></tr>
  <tr><th>Source</th><td>Cornerstone IDV process.</td></tr>
  <tr><th>Data Type</th><td>String / URI</td></tr>
  <tr><th>Examples</th><td><code>uuid:a8f3b2c1-4567-89ab-cdef-0123456789ab</code></td></tr>
</table>

#### 4.3.2 Employer/Organization Attributes

*Office/Brokerage Name (006)*

<table>
  <tr><th>Attribute</th><td><code>office_brokerage_name</code></td></tr>
  <tr><th>Description</th><td>Name of the real estate office or brokerage with which the professional is affiliated.</td></tr>
  <tr><th>Source</th><td>Employer system of record (e.g., Sutton Homebase system).</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><strong>BC:</strong> <code>Sutton - Premier Realty (Premier Surrey)</code><br/><strong>ON:</strong> <code>Sutton Group Realty Inc.</code><br/><strong>QC:</strong> <code>Sutton Québec inc.</code></td></tr>
</table>

*Office Role (007)*

<table>
  <tr><th>Attribute</th><td><code>office_role</code></td></tr>
  <tr><th>Description</th><td>The professional's role within the brokerage organization.</td></tr>
  <tr><th>Source</th><td>Employer system of record (e.g., Sutton Homebase system).</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><strong>BC:</strong> <code>Owner</code><br/><strong>ON:</strong> <code>Sales Representative</code><br/><strong>QC:</strong> <code>Residential Broker</code></td></tr>
</table>

*Specialties (008)*

<table>
  <tr><th>Attribute</th><td><code>specialties</code></td></tr>
  <tr><th>Description</th><td>Professional areas of specialization (multi-value array).</td></tr>
  <tr><th>Source</th><td>Employer system of record (e.g., Sutton Homebase system).</td></tr>
  <tr><th>Data Type</th><td>Array of Strings</td></tr>
  <tr><th>Examples</th><td><strong>BC:</strong> <code>["New Construction", "Multi Family", "Commercial"]</code><br/><strong>ON:</strong> <code>["Luxury Homes", "Waterfront Properties"]</code><br/><strong>QC:</strong> <code>["Condominiums", "Luxury Properties"]</code></td></tr>
</table>

*Service Areas (009)*

<table>
  <tr><th>Attribute</th><td><code>service_areas</code></td></tr>
  <tr><th>Description</th><td>Geographic territories or neighborhoods served (multi-value array).</td></tr>
  <tr><th>Source</th><td>Employer system of record (e.g., Sutton Homebase system).</td></tr>
  <tr><th>Data Type</th><td>Array of Strings</td></tr>
  <tr><th>Examples</th><td><strong>BC:</strong> <code>["Surrey", "Langley", "White Rock"]</code><br/><strong>ON:</strong> <code>["Toronto Downtown", "North York", "Etobicoke"]</code><br/><strong>QC:</strong> <code>["Plateau-Mont-Royal", "Mile End", "Outremont"]</code></td></tr>
</table>

*Join Year (010)*

<table>
  <tr><th>Attribute</th><td><code>join_year</code></td></tr>
  <tr><th>Description</th><td>Year the professional joined the organization.</td></tr>
  <tr><th>Source</th><td>Employer system of record (e.g., Sutton Homebase system).</td></tr>
  <tr><th>Data Type</th><td>Integer</td></tr>
  <tr><th>Examples</th><td><strong>BC:</strong> <code>2000</code><br/><strong>ON:</strong> <code>2015</code><br/><strong>QC:</strong> <code>2010</code></td></tr>
</table>

*Employer Evidence (011)*

<table>
  <tr><th>Attribute</th><td><code>employer_evidence</code></td></tr>
  <tr><th>Description</th><td>UUID referencing employer verification source, author, and date of verification.</td></tr>
  <tr><th>Source</th><td>Employer system of record verification process.</td></tr>
  <tr><th>Data Type</th><td>String / URI</td></tr>
  <tr><th>Examples</th><td><code>uuid:b9e4c3d2-5678-90ab-cdef-1234567890cd</code></td></tr>
</table>

#### 4.3.3 Professional Designation Attributes

*Licence Number (012)*

<table>
  <tr><th>Attribute</th><td><code>licence_number</code></td></tr>
  <tr><th>Description</th><td>Unique licence/registration number issued by provincial regulator.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry (BCFSA, RECO, OACIQ).</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><strong>BC (BCFSA):</strong> <code>106104</code><br/><strong>ON (RECO):</strong> <code>R1234567</code><br/><strong>QC (OACIQ):</strong> <code>A9876543</code></td></tr>
</table>

*Licence Status (013)*

<table>
  <tr><th>Attribute</th><td><code>licence_status</code></td></tr>
  <tr><th>Description</th><td>Current status of the professional licence.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry (BCFSA, RECO, OACIQ).</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><strong>BC (BCFSA):</strong> <code>Licensed</code><br/><strong>ON (RECO):</strong> <code>Registered</code><br/><strong>QC (OACIQ):</strong> <code>Valid</code><br/>Other values: <code>Suspended</code>, <code>Revoked</code>, <code>Expired</code></td></tr>
</table>

*Licence Effective Date (014)*

<table>
  <tr><th>Attribute</th><td><code>licence_effective_date</code></td></tr>
  <tr><th>Description</th><td>Date the licence became effective.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry (BCFSA, RECO, OACIQ).</td></tr>
  <tr><th>Data Type</th><td>Date</td></tr>
  <tr><th>Examples</th><td><strong>BC (BCFSA):</strong> <code>2025-05-24</code><br/><strong>ON (RECO):</strong> <code>2020-03-15</code><br/><strong>QC (OACIQ):</strong> <code>2018-06-01</code></td></tr>
</table>

*Licence Expiry (015)*

<table>
  <tr><th>Attribute</th><td><code>licence_expiry</code></td></tr>
  <tr><th>Description</th><td>Expiry date of the licence.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry (BCFSA, RECO, OACIQ).</td></tr>
  <tr><th>Data Type</th><td>Date</td></tr>
  <tr><th>Examples</th><td><strong>BC (BCFSA):</strong> <code>2027-05-23</code><br/><strong>ON (RECO):</strong> <code>2026-03-14</code><br/><strong>QC (OACIQ):</strong> <code>2026-05-31</code></td></tr>
</table>

*Licensed As (016)*

<table>
  <tr><th>Attribute</th><td><code>licensed_as</code></td></tr>
  <tr><th>Description</th><td>Professional designation or role as recognized by the regulator.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry (BCFSA, RECO, OACIQ).</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><strong>BC (BCFSA):</strong> <code>Representative</code><br/><strong>ON (RECO):</strong> <code>Salesperson</code> or <code>Broker</code><br/><strong>QC (OACIQ):</strong> <code>Residential Real Estate Broker</code></td></tr>
</table>

*Licensed For (017)*

<table>
  <tr><th>Attribute</th><td><code>licensed_for</code></td></tr>
  <tr><th>Description</th><td>Services the professional is authorized to provide under their licence.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry (BCFSA, RECO, OACIQ).</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><strong>BC (BCFSA):</strong> <code>Trading</code> or <code>Rental Property Management</code><br/><strong>ON (RECO):</strong> <code>Trading in Real Estate</code><br/><strong>QC (OACIQ):</strong> <code>Residential Brokerage Services</code></td></tr>
</table>

*Business Name (018)*

<table>
  <tr><th>Attribute</th><td><code>business_name</code></td></tr>
  <tr><th>Description</th><td>Name of the brokerage as registered with the provincial regulator.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry (BCFSA, RECO, OACIQ).</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><strong>BC (BCFSA):</strong> <code>Sutton Premier Realty</code><br/><strong>ON (RECO):</strong> <code>Sutton Group Realty Inc., Brokerage</code><br/><strong>QC (OACIQ):</strong> <code>Sutton Québec inc.</code></td></tr>
</table>

*Business Address (019)*

<table>
  <tr><th>Attribute</th><td><code>business_address</code></td></tr>
  <tr><th>Description</th><td>Standardized postal address of the business as registered with the regulator.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry (BCFSA, RECO, OACIQ).</td></tr>
  <tr><th>Data Type</th><td>JSON object</td></tr>
  <tr><th>Examples</th><td><strong>BC (BCFSA):</strong> <code>15483 104 Avenue, Surrey British Columbia V3R 1N9</code><br/><strong>ON (RECO):</strong> <code>40 Eglinton Avenue East, Toronto, Ontario M4P 3A2</code><br/><strong>QC (OACIQ):</strong> <code>1250 René-Lévesque Blvd W, Montréal, Québec H3B 4W8</code></td></tr>
</table>

*Jurisdiction (020)*

<table>
  <tr><th>Attribute</th><td><code>jurisdiction</code></td></tr>
  <tr><th>Description</th><td>The province or territorial jurisdiction under which the professional is licensed.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry (BCFSA, RECO, OACIQ).</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>BC</code>, <code>ON</code>, <code>QC</code></td></tr>
</table>

*Regulatory Body (021)*

<table>
  <tr><th>Attribute</th><td><code>regulatory_body</code></td></tr>
  <tr><th>Description</th><td>The provincial regulatory body that issued and governs the licence.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry (BCFSA, RECO, OACIQ).</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><strong>BC:</strong> <code>BCFSA</code> (BC Financial Services Authority)<br/><strong>ON:</strong> <code>RECO</code> (Real Estate Council of Ontario)<br/><strong>QC:</strong> <code>OACIQ</code> (Organisme d'autoréglementation du courtage immobilier du Québec)</td></tr>
</table>

*Licence Conditions (022)*

<table>
  <tr><th>Attribute</th><td><code>licence_conditions</code></td></tr>
  <tr><th>Description</th><td>Any conditions or restrictions imposed on the licence by the regulator.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry (BCFSA, RECO, OACIQ).</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><strong>BC (BCFSA):</strong> <code>None</code><br/><strong>ON (RECO):</strong> <code>Must work under supervision of managing broker</code><br/><strong>QC (OACIQ):</strong> <code>None</code></td></tr>
</table>

*Discipline Notes (023)*

<table>
  <tr><th>Attribute</th><td><code>discipline_notes</code></td></tr>
  <tr><th>Description</th><td>Discipline history as reported by the regulator (typically last 5-10 years).</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry (BCFSA, RECO, OACIQ).</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><strong>BC (BCFSA):</strong> <code>None</code><br/><strong>ON (RECO):</strong> <code>Administrative penalty in 2022 - late submission of documents</code><br/><strong>QC (OACIQ):</strong> <code>None</code></td></tr>
</table>

*Professional Evidence (024)*

<table>
  <tr><th>Attribute</th><td><code>professional_evidence</code></td></tr>
  <tr><th>Description</th><td>UUID referencing regulator record source, author, and verification date.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry verification process.</td></tr>
  <tr><th>Data Type</th><td>String / URI</td></tr>
  <tr><th>Examples</th><td><code>uuid:c0f5d4e3-6789-01bc-def0-234567890def</code></td></tr>
</table>

[↑ Back to section](#4-credential-definition)

[↑ Back to top](#table-of-contents)

---

## 5. Implementations

### 5.1 Technical Format

This credential uses the **W3C Verifiable Credentials Data Model** and the Verified Real Estate Professional schema.

[↑ Back to section](#5-implementations)

### 5.2 Issuer List

| Environment       | Issuer Name                | Issuer DID |
|-------------------|----------------------------|------------|
| Production        | Sutton Group               | TBA        |
| Test/Dev          | Sutton Group               | TBA        |

[↑ Back to section](#5-implementations)

### 5.3 Schema Implementation

| Environment   | Ledger/Registry | Schema ID |
|---------------|-----------------|-----------|
| Production    | Cornerstone Trust Registry | TBA |
| Test/Dev      | Cornerstone Trust Registry | `cornerstone:2:verified-real-estate-professional:1.0` |

[↑ Back to section](#5-implementations)

### 5.4 Credential Implementation

| Environment   | Ledger/Registry | Credential Definition ID | OCA Bundle |
|---------------|-----------------|--------------------------|------------|
| Production    | TBA             | TBA                      | TBA        |
| Test/Dev      | Cornerstone Trust Registry | `cornerstone:3:CL:xxxxx:verified-real-estate-professional` | [Verified Real Estate Professional OCA Bundle](https://github.com/cornerstone/oca-bundles/tree/main/verified-real-estate-professional) |

[↑ Back to section](#5-implementations)

[↑ Back to top](#table-of-contents)
