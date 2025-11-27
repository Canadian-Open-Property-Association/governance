# Verified Advisor Credential – Credential Documentation

## 1. About this Document

This document describes the **Verified Advisor Credential** verifiable credential to help potential verifiers determine whether it is suitable for their needs. The intended audience includes homeowners, real estate brokerages, mortgage lenders, insurance companies, financial services firms, and other participants in the Cornerstone network.

The Verified Advisor Credential is issued by **Cornerstone Platform Inc.** (with Network Partner attestation) and represents authoritative proof of an advisor's identity combined with verified professional licensing or registration information obtained from provincial regulators.

**This credential replaces and consolidates**: "Verified Professional" and "Verified Real Estate Professional" credentials. The name "Advisor" was chosen to support future expansion across multiple advisory domains (real estate, mortgage, insurance, financial planning, legal services) while maintaining a single unified credential schema.

**External terminology note**: This credential is referred to as "Verified Advisor" internally and in technical specifications. Network Partners may brand this differently in their applications (e.g., "Real Estate Professional," "Wealth Advisor," "Community Builder") without changing the underlying credential schema.

Provincial regulators include:
- **Real Estate**: [BCFSA (BC)](https://www.bcfsa.ca/), [RECO (ON)](https://www.reco.on.ca/), [OACIQ (QC)](https://www.oaciq.com/en/)
- **Mortgage**: Provincial mortgage broker regulators (future)
- **Insurance**: Provincial insurance regulators (future)
- **Financial Planning**: Securities regulators, financial planning associations (future)
- **Legal Services**: Provincial law societies (future)

### 1.1 Version History

| Ver.      | Date        | Notes                               | Author(s) |
|-----------|-------------|-------------------------------------|-------------------|
| **1.0**   | TBA  | Consolidated Verified Advisor credential (replaces Verified Professional and Verified Real Estate Professional) | Mathieu Glaude    |

## 2. Credential Overview

The Verified Advisor Credential is a verifiable credential (VC) issued to individuals who are confirmed as licensed or registered advisors by their provincial regulator. This credential supports advisors across multiple domains (real estate, mortgage, insurance, financial planning, legal services) with a single unified schema.

Each issuance is backed by **dual-process verification**:
- **Identity Verification**: Interac Bank Verification, BC Person Credential, or Cornerstone email+phone verification
- **Professional Licensing Verification**: Provincial regulator registry match (name, licence number, status)

**Optional third verification source** (for advisors with employer affiliations):
- **Employer/Organization Verification**: Brokerage, firm, or organization system of record confirmation

The credential is issued directly into the **Cornerstone Wallet** and can be consumed by relying parties without requiring them to re-run identity or licensing checks.

|              |                                                                 |
|--------------|-----------------------------------------------------------------|
| **Credential:** | Verified Advisor Credential                                            |
| **Schema:**     | Verified Advisor v1.0                                       |
| **Issuer:**     | Cornerstone Platform Inc. (with Network Partner attestation where applicable) <br/> [https://cornerstoneplatform.ca](https://cornerstoneplatform.ca) |
| **Issuer DID:** | `did:web:cornerstoneplatform.ca`                          |

### 2.1 Prerequisite Credentials

**Required Before Issuance:**
- **Cornerstone ID** (base identity credential) - ALL users must hold this first

**Credential Hierarchy:**
```
Cornerstone ID (foundation)
└── Verified Advisor Credential (professional licensing)
    └── Portfolio Issuer Credential (capability - optional)
```

### 2.2 Attribute Summary

| **#**       | **Name**          | **Attribute**        | **Data Type** | **Notes** |
|-------------|-------------------|----------------------|---------------|-----------|
| **Core Identity Attributes (from Cornerstone ID)** ||||
| 001         | Given Names       | `given_names`        | String        | Legal given names (may include middle names). |
| 002         | Family Name       | `family_name`        | String        | Legal family/surname. |
| 003         | Date of Birth     | `birthdate_dateint`  | Integer       | `YYYYMMDD` for ZK proofs. |
| 004         | Verified Email    | `verified_email`     | String        | Verified via OTP or equivalent. |
| **Advisor Classification Attributes (Required)** ||||
| 005         | Advisor Type      | `advisor_type`       | String (enum) | Type of advisor: REALTOR, MORTGAGE_BROKER, LAWYER, FINANCIAL_ADVISOR, WEALTH_MANAGER, ACCOUNTANT, INSURANCE_BROKER, etc. |
| 006         | Domain            | `domain`             | String (enum) | Professional domain: REAL_ESTATE, MORTGAGE, INSURANCE, FINANCIAL_PLANNING, LEGAL_SERVICES, ACCOUNTING. |
| 007         | Specialization    | `specialization`     | String (enum) | Specialization within domain (aligned with Identity Model). |
| **Professional Licensing Attributes (Required)** ||||
| 008         | Licence Number    | `licence_number`     | String        | Regulatory licence/registration number. |
| 009         | Licence Status    | `licence_status`     | String (enum) | REGISTERED, LICENSED, ACTIVE, SUSPENDED, REVOKED. |
| 010         | Licensed As       | `licensed_as`        | String        | Professional designation (handles provincial variations - see notes). |
| 011         | Jurisdiction      | `jurisdiction`       | String        | Province of registration (e.g., BC, ON, QC). |
| 012         | Regulatory Body   | `regulatory_body`    | String        | Regulatory authority (e.g., BCFSA, RECO, OACIQ). |
| **Location/Region Attributes (Required)** ||||
| 013         | Office Headquarters Location | `office_hq_location` | JSON object | City and province of office headquarters. |
| 014         | Service Region    | `service_region`     | JSON object   | Geographic service territory/regions. |
| **Professional Licensing Attributes (Optional - Provincial Variations)** ||||
| 015         | Licence Effective Date | `licence_effective_date` | Date | Date licence became effective (not provided by all regulators). |
| 016         | Licence Expiry    | `licence_expiry`     | Date          | Expiry date from regulator record (not provided by all regulators). |
| 017         | Licensed For      | `licensed_for`       | String        | Services authorized (e.g., Trading, Rental - not provided by all regulators). |
| 018         | Licence Conditions | `licence_conditions` | String       | Any regulator-imposed conditions (not provided by all regulators). |
| 019         | Discipline Notes  | `discipline_notes`   | String        | Regulator-imposed disciplinary actions or history. |
| **Employer/Organization Attributes (Optional)** ||||
| 020         | Business Name     | `business_name`      | String        | Name of affiliated brokerage, firm, or organization. |
| 021         | Business Address  | `business_address`   | JSON object   | Business address from regulator or employer record. |
| 022         | Office/Brokerage Name | `office_brokerage_name` | String    | Affiliated office name (from employer system). |
| 023         | Office Role       | `office_role`        | String        | Role within organization (e.g., Owner, Agent, Broker). |
| 024         | Join Year         | `join_year`          | Integer       | Year joined organization. |
| **Self-Declared Attributes (Optional - Data Quality Caveat)** ||||
| 025         | Specialties       | `specialties`        | Array of Strings | Areas of specialization (self-declared or from employer system; data quality may vary; subject to verification and re-issuance). |
| 026         | Service Areas     | `service_areas`      | Array of Strings | Territories/neighborhoods served (self-declared or from employer system; data quality may vary; subject to verification and re-issuance). |
| **Network Partner Context (Optional)** ||||
| 027         | Network Partner   | `networkPartner`     | JSON object   | Network Partner affiliation details (npId, npName, affiliationDate). |
| **Evidence Attributes** ||||
| 028         | Identity Evidence | `identity_evidence`  | String / URI  | UUID + source of IDV evidence. |
| 029         | Professional Evidence | `professional_evidence` | String / URI | UUID + source of regulator evidence. |
| 030         | Employer Evidence | `employer_evidence`  | String / URI  | UUID + source of employer verification (if applicable). |

## 3. Credential Details

### 3.1 Issuer

The Verified Advisor Credential is issued by **Cornerstone Platform Inc.**, acting as the credential authority. Where advisors are affiliated with Network Partners, the credential includes Network Partner attestation in the `networkPartner` attribute and evidence array.

Each credential is issued only after identity and professional licensing verification are successfully completed. Employer verification is optional and included when available.

### 3.2 Schema and Credential Definition Governance

The Verified Advisor Credential schema and definition are managed by **COPA** and registered on the **COPA Trust Registry**. COPA governs badge schemas, trust lists, data catalogues, and network policies across the ecosystem. Updates to the Verified Advisor schema follow a change-managed governance process to ensure interoperability across all applications accessing the Cornerstone network.

### 3.3 Issuer Data Source

The data comes from multiple authoritative sources:

#### 3.3.1 Identity Verification
- **Source**: Interac Bank Verification Service, BC Person Credential, or Cornerstone email+phone verification
- **Purpose**: High-assurance identity verification binding the individual to their government-issued identity or platform identity
- **Attributes**: Legal names, date of birth, verified email

#### 3.3.2 Professional Licensing Verification
- **Source**: Provincial regulator registries
  - **Real Estate (BC)**: BCFSA (BC Financial Services Authority)
  - **Real Estate (ON)**: RECO (Real Estate Council of Ontario)
  - **Real Estate (QC)**: OACIQ (Organisme d'autoréglementation du courtage immobilier du Québec)
  - **Future**: Mortgage broker regulators, insurance regulators, law societies, financial planning associations
- **Purpose**: Confirms professional licensing, good standing, and regulatory compliance
- **Attributes**: Licence number, status, designation, jurisdiction, regulatory body
- **Provincial Variations**: Not all regulators provide the same fields. Fields marked "optional - provincial variations" may not be available from all regulatory sources.

#### 3.3.3 Employer/Organization Verification (Optional)
- **Source**: Employer system of record (e.g., brokerage management systems, HR systems)
- **Purpose**: Confirms organizational affiliation, role, and professional profile
- **Attributes**: Office/brokerage name, office role, join year
- **Note**: This verification is optional and included only when advisor has an organizational affiliation

#### 3.3.4 Network Partner Attestation (Optional)
- **Source**: Network Partner attestation records
- **Purpose**: Documents Network Partner relationship and affiliation date
- **Attributes**: Network Partner ID (`npId`), Network Partner name (`npName`), affiliation date
- **Note**: Included when advisor is affiliated with a Network Partner (e.g., Sutton Group, Dominion Lending)

#### 3.3.5 Data Updates
- A credential reflects the state of records at issuance.
- Licence changes, employment changes, or identity updates require revocation and re-issuance.
- Evidence is retained for five years in compliance with regulatory requirements (FINTRAC where applicable).

### 3.4 Assurance

The credential provides professional advisor assurance through:
- **Identity verification**: High-assurance (Interac/BC Person) or basic (Cornerstone email+phone)
- **Professional licensing verification**: Provincial regulator registry confirmation
- **Optional employer verification**: Organization system of record confirmation (when applicable)
- **Optional Network Partner attestation**: Network Partner affiliation confirmation (when applicable)

**Note**: No assurance level indicator is included in the credential itself. Relying parties evaluate assurance based on the evidence array, which documents verification sources and methods.

### 3.5 Revocation

A Verified Advisor Credential will be revoked in cases such as:
1. Licence expired, suspended, or revoked by regulator
2. Professional status changes (no longer licensed, registration lapsed)
3. Identity verification expires or is invalidated
4. Fraud or identity mismatch detected
5. Regulatory or legal request
6. User requests credential refresh
7. Data quality issues detected in self-declared fields (specialties, service areas) requiring re-issuance with corrected data

**Cascade Revocation**: If the underlying **Cornerstone ID** is revoked, the Verified Advisor Credential MUST also be automatically revoked.

Re-issuance involves re-verification through identity and professional licensing sources, and issuance of a new credential to the holder's Cornerstone Wallet.

## 4. Credential Definition

### 4.1 Credential Schema

The Verified Advisor Credential conforms to W3C Verifiable Credentials and uses a COPA-managed schema:

- **Schema ID (URI):** `https://schema.cornerstoneplatform.ca/v1/verified-advisor.json`
- **Schema Versioning:** Breaking changes produce a new schema version.
- **Contexts:**
  - `https://www.w3.org/2018/credentials/v1`
  - `https://schema.cornerstoneplatform.ca/contexts/verified-advisor-v1.json`

### 4.2 Subject of the Credential

The subject is the **individual advisor**, bound to their Cornerstone platform account and professional licensing. Binding is confirmed by:
- Valid Cornerstone ID (prerequisite)
- Identity verification through trusted sources
- Professional licensing verification from provincial regulator

### 4.3 Attributes

#### 4.3.1 Core Identity Attributes (Required)

*Given Names (001)*

<table>
  <tr><th>Attribute</th><td><code>given_names</code></td></tr>
  <tr><th>Description</th><td>Legal given names (may include middle names).</td></tr>
  <tr><th>Source</th><td>Cornerstone ID credential (from Interac, BC Person, or Cornerstone verification).</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>John Michael</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Family Name (002)*

<table>
  <tr><th>Attribute</th><td><code>family_name</code></td></tr>
  <tr><th>Description</th><td>Legal family/surname.</td></tr>
  <tr><th>Source</th><td>Cornerstone ID credential.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>Smith</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Date of Birth (003)*

<table>
  <tr><th>Attribute</th><td><code>birthdate_dateint</code></td></tr>
  <tr><th>Description</th><td>Date of birth in <code>YYYYMMDD</code> format, compatible with ZK proofs.</td></tr>
  <tr><th>Source</th><td>Cornerstone ID credential.</td></tr>
  <tr><th>Data Type</th><td>Integer</td></tr>
  <tr><th>Examples</th><td><code>19850621</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Verified Email (004)*

<table>
  <tr><th>Attribute</th><td><code>verified_email</code></td></tr>
  <tr><th>Description</th><td>Email verified via OTP during Cornerstone onboarding or from identity verification source.</td></tr>
  <tr><th>Source</th><td>Cornerstone ID credential.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>john.smith@example.com</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

#### 4.3.2 Advisor Classification Attributes (Required)

*Advisor Type (005)*

<table>
  <tr><th>Attribute</th><td><code>advisor_type</code></td></tr>
  <tr><th>Description</th><td>Type of advisor. Defines the professional category and determines applicable regulations.</td></tr>
  <tr><th>Source</th><td>Derived from professional licensing verification or advisor self-declaration with regulator confirmation.</td></tr>
  <tr><th>Data Type</th><td>String (enum: <code>REALTOR</code>, <code>MORTGAGE_BROKER</code>, <code>LAWYER</code>, <code>FINANCIAL_ADVISOR</code>, <code>WEALTH_MANAGER</code>, <code>ACCOUNTANT</code>, <code>INSURANCE_BROKER</code>, extensible)</td></tr>
  <tr><th>Examples</th><td><code>REALTOR</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
  <tr><th>Notes</th><td>This field enables the platform to apply appropriate regulatory requirements and policies. Future advisor types can be added without breaking schema changes.</td></tr>
</table>

*Domain (006)*

<table>
  <tr><th>Attribute</th><td><code>domain</code></td></tr>
  <tr><th>Description</th><td>Professional domain. Aligns with Identity Model specification.</td></tr>
  <tr><th>Source</th><td>Derived from advisor_type and regulatory body.</td></tr>
  <tr><th>Data Type</th><td>String (enum: <code>REAL_ESTATE</code>, <code>MORTGAGE</code>, <code>INSURANCE</code>, <code>FINANCIAL_PLANNING</code>, <code>LEGAL_SERVICES</code>, <code>ACCOUNTING</code>, extensible)</td></tr>
  <tr><th>Examples</th><td><code>REAL_ESTATE</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
  <tr><th>Notes</th><td>Domain determines which COPA badge schemas and network policies apply. Extensible for future domains.</td></tr>
</table>

*Specialization (007)*

<table>
  <tr><th>Attribute</th><td><code>specialization</code></td></tr>
  <tr><th>Description</th><td>Specialization within domain. Aligns with Identity Model specification.</td></tr>
  <tr><th>Source</th><td>Derived from advisor_type, licensed_as, or licensing category.</td></tr>
  <tr><th>Data Type</th><td>String (enum: <code>REALTOR</code>, <code>MORTGAGE_BROKER</code>, <code>REAL_ESTATE_LAWYER</code>, <code>INSURANCE_BROKER</code>, <code>ACCOUNTANT</code>, <code>FINANCIAL_PLANNER</code>, extensible)</td></tr>
  <tr><th>Examples</th><td><code>REALTOR</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
  <tr><th>Notes</th><td>Specialization enables fine-grained policy rules and feature provisioning. Maps to Identity Model <code>specialization</code> field.</td></tr>
</table>

#### 4.3.3 Professional Licensing Attributes (Required)

*Licence Number (008)*

<table>
  <tr><th>Attribute</th><td><code>licence_number</code></td></tr>
  <tr><th>Description</th><td>Unique licence/registration number issued by provincial regulator.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry (e.g., BCFSA, RECO, OACIQ).</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>123456</code> (BCFSA), <code>7890123</code> (RECO)</td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Licence Status (009)*

<table>
  <tr><th>Attribute</th><td><code>licence_status</code></td></tr>
  <tr><th>Description</th><td>Current status of licence/registration.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry.</td></tr>
  <tr><th>Data Type</th><td>String (enum: <code>REGISTERED</code>, <code>LICENSED</code>, <code>ACTIVE</code>, <code>SUSPENDED</code>, <code>REVOKED</code>, <code>EXPIRED</code>)</td></tr>
  <tr><th>Examples</th><td><code>REGISTERED</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Licensed As (010)*

<table>
  <tr><th>Attribute</th><td><code>licensed_as</code></td></tr>
  <tr><th>Description</th><td>Professional designation from regulator. <strong>Handles provincial variations</strong> - different provinces use different terminology (e.g., BC: "Representative" vs ON: "Salesperson" for similar roles).</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><strong>BC (BCFSA):</strong> <code>Representative</code>, <code>Associate Broker</code>, <code>Managing Broker</code><br/><strong>ON (RECO):</strong> <code>Salesperson</code>, <code>Broker</code><br/><strong>QC (OACIQ):</strong> <code>Residential Broker</code>, <code>Commercial Broker</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
  <tr><th>Notes</th><td>This field preserves the exact designation from the regulatory source without normalization. Applications can map to standardized categories if needed for UI display.</td></tr>
</table>

*Jurisdiction (011)*

<table>
  <tr><th>Attribute</th><td><code>jurisdiction</code></td></tr>
  <tr><th>Description</th><td>Province or territorial jurisdiction under which the advisor is licensed.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry.</td></tr>
  <tr><th>Data Type</th><td>String (province code: BC, ON, QC, AB, etc.)</td></tr>
  <tr><th>Examples</th><td><code>BC</code>, <code>ON</code>, <code>QC</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Regulatory Body (012)*

<table>
  <tr><th>Attribute</th><td><code>regulatory_body</code></td></tr>
  <tr><th>Description</th><td>Name of the regulatory authority that issued the licence.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>BCFSA</code>, <code>RECO</code>, <code>OACIQ</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

#### 4.3.4 Location/Region Attributes (Required)

*Office Headquarters Location (013)*

<table>
  <tr><th>Attribute</th><td><code>office_hq_location</code></td></tr>
  <tr><th>Description</th><td>City and province of office headquarters.</td></tr>
  <tr><th>Source</th><td>Business address from regulator registry or employer system of record.</td></tr>
  <tr><th>Data Type</th><td>JSON object containing: <code>city</code>, <code>province</code></td></tr>
  <tr><th>Examples</th><td><code>{"city": "Vancouver", "province": "BC"}</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

*Service Region (014)*

<table>
  <tr><th>Attribute</th><td><code>service_region</code></td></tr>
  <tr><th>Description</th><td>Geographic service territory or regions where advisor operates.</td></tr>
  <tr><th>Source</th><td>Derived from service_areas, jurisdiction, or employer system of record.</td></tr>
  <tr><th>Data Type</th><td>JSON object containing: <code>provinces</code> (array), <code>cities</code> (array, optional), <code>regions</code> (array, optional)</td></tr>
  <tr><th>Examples</th><td><code>{"provinces": ["BC"], "cities": ["Vancouver", "Surrey"], "regions": ["Lower Mainland"]}</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
</table>

#### 4.3.5 Professional Licensing Attributes (Optional - Provincial Variations)

**Note**: These fields are marked optional because **not all provincial regulators provide this data**. When available, they should be included. Applications should handle missing fields gracefully.

*Licence Effective Date (015)*

<table>
  <tr><th>Attribute</th><td><code>licence_effective_date</code></td></tr>
  <tr><th>Description</th><td>Date when licence became effective. <strong>Not provided by all regulators</strong> (e.g., Ontario RECO does not provide this field).</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry (when available).</td></tr>
  <tr><th>Data Type</th><td>Date (ISO 8601)</td></tr>
  <tr><th>Examples</th><td><code>2020-03-15</code></td></tr>
  <tr><th>Required</th><td>No - optional, may not be provided by all regulators</td></tr>
</table>

*Licence Expiry (016)*

<table>
  <tr><th>Attribute</th><td><code>licence_expiry</code></td></tr>
  <tr><th>Description</th><td>Expiry date of licence/registration. <strong>Not provided by all regulators</strong>.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry (when available).</td></tr>
  <tr><th>Data Type</th><td>Date (ISO 8601)</td></tr>
  <tr><th>Examples</th><td><code>2025-12-31</code></td></tr>
  <tr><th>Required</th><td>No - optional, may not be provided by all regulators</td></tr>
</table>

*Licensed For (017)*

<table>
  <tr><th>Attribute</th><td><code>licensed_for</code></td></tr>
  <tr><th>Description</th><td>Services authorized by licence (e.g., Trading, Rental, Strata Management). <strong>Not provided by all regulators</strong> (e.g., Ontario RECO does not provide this field).</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry (when available).</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>Trading Services</code>, <code>Rental Property Management</code></td></tr>
  <tr><th>Required</th><td>No - optional, may not be provided by all regulators</td></tr>
</table>

*Licence Conditions (018)*

<table>
  <tr><th>Attribute</th><td><code>licence_conditions</code></td></tr>
  <tr><th>Description</th><td>Any conditions imposed on the licence by the regulator.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>Must work under direct supervision</code> or empty/null if no conditions</td></tr>
  <tr><th>Required</th><td>No - optional</td></tr>
</table>

*Discipline Notes (019)*

<table>
  <tr><th>Attribute</th><td><code>discipline_notes</code></td></tr>
  <tr><th>Description</th><td>Disciplinary history or actions from regulator.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>Fined $5,000 for advertising violations (2023)</code> or empty/null if no discipline history</td></tr>
  <tr><th>Required</th><td>No - optional</td></tr>
</table>

#### 4.3.6 Employer/Organization Attributes (Optional)

*Business Name (020)*

<table>
  <tr><th>Attribute</th><td><code>business_name</code></td></tr>
  <tr><th>Description</th><td>Name of affiliated brokerage, firm, or organization from regulator record.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry or employer system of record.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>Sutton Group Realty Inc.</code></td></tr>
  <tr><th>Required</th><td>No - optional</td></tr>
</table>

*Business Address (021)*

<table>
  <tr><th>Attribute</th><td><code>business_address</code></td></tr>
  <tr><th>Description</th><td>Business address from regulator record or employer system.</td></tr>
  <tr><th>Source</th><td>Provincial regulator registry or employer system of record.</td></tr>
  <tr><th>Data Type</th><td>JSON object containing: <code>street_address</code>, <code>locality</code>, <code>region</code>, <code>postal_code</code>, <code>country</code></td></tr>
  <tr><th>Examples</th><td><code>{"street_address": "123 Main St", "locality": "Vancouver", "region": "BC", "postal_code": "V6B 1A1", "country": "CA"}</code></td></tr>
  <tr><th>Required</th><td>No - optional</td></tr>
</table>

*Office/Brokerage Name (022)*

<table>
  <tr><th>Attribute</th><td><code>office_brokerage_name</code></td></tr>
  <tr><th>Description</th><td>Affiliated office name from employer system of record (more specific than business_name).</td></tr>
  <tr><th>Source</th><td>Employer system of record (e.g., brokerage management system).</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>Sutton - Premier Realty (Premier Surrey)</code></td></tr>
  <tr><th>Required</th><td>No - optional</td></tr>
</table>

*Office Role (023)*

<table>
  <tr><th>Attribute</th><td><code>office_role</code></td></tr>
  <tr><th>Description</th><td>Role within the organization.</td></tr>
  <tr><th>Source</th><td>Employer system of record.</td></tr>
  <tr><th>Data Type</th><td>String</td></tr>
  <tr><th>Examples</th><td><code>Owner</code>, <code>Sales Representative</code>, <code>Agent</code></td></tr>
  <tr><th>Required</th><td>No - optional</td></tr>
</table>

*Join Year (024)*

<table>
  <tr><th>Attribute</th><td><code>join_year</code></td></tr>
  <tr><th>Description</th><td>Year the advisor joined the organization.</td></tr>
  <tr><th>Source</th><td>Employer system of record.</td></tr>
  <tr><th>Data Type</th><td>Integer</td></tr>
  <tr><th>Examples</th><td><code>2018</code></td></tr>
  <tr><th>Required</th><td>No - optional</td></tr>
</table>

#### 4.3.7 Self-Declared Attributes (Optional - Data Quality Caveat)

**Important Note**: These fields are included based on user feedback, with the understanding that **data quality may be inconsistent** from source systems (e.g., Homebase for real estate). When data quality issues are detected, credentials can be **revoked and re-issued with corrected data**.

*Specialties (025)*

<table>
  <tr><th>Attribute</th><td><code>specialties</code></td></tr>
  <tr><th>Description</th><td>Areas of professional specialization (multi-value array). <strong>Data quality may vary</strong> - this is often self-declared or from employer systems without verification. <strong>Subject to verification and re-issuance if inaccurate</strong>.</td></tr>
  <tr><th>Source</th><td>Employer system of record or advisor self-declaration.</td></tr>
  <tr><th>Data Type</th><td>Array of Strings</td></tr>
  <tr><th>Examples</th><td><code>["Luxury Homes", "Waterfront Properties", "New Construction"]</code></td></tr>
  <tr><th>Required</th><td>No - optional</td></tr>
  <tr><th>Notes</th><td>If inaccurate data is detected, credential should be revoked and re-issued with corrected specialties. This field provides value despite data quality concerns, as incorrect information creates an opportunity for quality improvement through revocation/re-issuance.</td></tr>
</table>

*Service Areas (026)*

<table>
  <tr><th>Attribute</th><td><code>service_areas</code></td></tr>
  <tr><th>Description</th><td>Geographic territories or neighborhoods served (multi-value array). <strong>Data quality may vary</strong> - this is often self-declared or from employer systems without verification. <strong>Subject to verification and re-issuance if inaccurate</strong>.</td></tr>
  <tr><th>Source</th><td>Employer system of record or advisor self-declaration.</td></tr>
  <tr><th>Data Type</th><td>Array of Strings</td></tr>
  <tr><th>Examples</th><td><code>["Vancouver Downtown", "North Shore", "Burnaby"]</code></td></tr>
  <tr><th>Required</th><td>No - optional</td></tr>
  <tr><th>Notes</th><td>If inaccurate data is detected, credential should be revoked and re-issued with corrected service areas. This field provides value despite data quality concerns, as incorrect information creates an opportunity for quality improvement through revocation/re-issuance.</td></tr>
</table>

#### 4.3.8 Network Partner Context (Optional)

*Network Partner (027)*

<table>
  <tr><th>Attribute</th><td><code>networkPartner</code></td></tr>
  <tr><th>Description</th><td>Network Partner affiliation details. Aligns with Identity Model specification.</td></tr>
  <tr><th>Source</th><td>Network Partner attestation records.</td></tr>
  <tr><th>Data Type</th><td>JSON object containing: <code>npId</code> (UUID), <code>npName</code> (String), <code>affiliationDate</code> (ISO 8601 date)</td></tr>
  <tr><th>Examples</th><td><code>{"npId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890", "npName": "Sutton Group", "affiliationDate": "2023-01-15"}</code></td></tr>
  <tr><th>Required</th><td>No - optional (included when advisor is affiliated with a Network Partner)</td></tr>
  <tr><th>Notes</th><td>Network Partner context enables NP-specific policies, branding, and features. Advisors not affiliated with NPs will not have this field.</td></tr>
</table>

#### 4.3.9 Evidence Attributes

*Identity Evidence (028)*

<table>
  <tr><th>Attribute</th><td><code>identity_evidence</code></td></tr>
  <tr><th>Description</th><td>UUID referencing IDV source(s), author, and date of verification. Links to stored evidence record for audit and compliance purposes.</td></tr>
  <tr><th>Source</th><td>Cornerstone IDV process (Interac, BC Person, or Cornerstone verification).</td></tr>
  <tr><th>Data Type</th><td>String (UUID) or URI</td></tr>
  <tr><th>Examples</th><td><code>urn:uuid:a1b2c3d4-e5f6-7890-abcd-ef1234567890</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
  <tr><th>Notes</th><td>Evidence retained for five years in compliance with regulatory requirements. Full evidence details available in the <code>evidence</code> array of the credential.</td></tr>
</table>

*Professional Evidence (029)*

<table>
  <tr><th>Attribute</th><td><code>professional_evidence</code></td></tr>
  <tr><th>Description</th><td>UUID referencing regulator registry record and verification date.</td></tr>
  <tr><th>Source</th><td>Provincial regulator verification process.</td></tr>
  <tr><th>Data Type</th><td>String (UUID) or URI</td></tr>
  <tr><th>Examples</th><td><code>urn:uuid:b2c3d4e5-f6a7-8901-bcde-f12345678901</code></td></tr>
  <tr><th>Required</th><td>Yes</td></tr>
  <tr><th>Notes</th><td>Evidence retained for five years. Full evidence details available in the <code>evidence</code> array.</td></tr>
</table>

*Employer Evidence (030)*

<table>
  <tr><th>Attribute</th><td><code>employer_evidence</code></td></tr>
  <tr><th>Description</th><td>UUID referencing employer system of record verification (if applicable).</td></tr>
  <tr><th>Source</th><td>Employer verification process.</td></tr>
  <tr><th>Data Type</th><td>String (UUID) or URI</td></tr>
  <tr><th>Examples</th><td><code>urn:uuid:c3d4e5f6-a7b8-9012-cdef-123456789012</code></td></tr>
  <tr><th>Required</th><td>No - only if employer verification was performed</td></tr>
</table>

## 5. Evidence Requirements

The `evidence` section of the credential follows the same format used in the Cornerstone ID Credential governance. Each verification source used must appear as an object in the `evidence` array.

### 5.1 Evidence Array Structure

Each evidence object must include:

<table>
  <tr><th>Field</th><th>Description</th><th>Required</th></tr>
  <tr><td><code>type</code></td><td>Type of evidence (e.g., "DocumentVerification", "IdentityProofing", "ProfessionalVerification", "EmployerVerification")</td><td>Yes</td></tr>
  <tr><td><code>method</code></td><td>Verification method used (e.g., "InteracBankVerification", "BCPersonCredential", "RECORegistryCheck", "EmployerSystemOfRecord")</td><td>Yes</td></tr>
  <tr><td><code>verificationDate</code></td><td>ISO 8601 timestamp of when verification occurred</td><td>Yes</td></tr>
  <tr><td><code>matchFields</code></td><td>Array of fields that were verified (e.g., ["name", "dob", "licence_number", "licence_status"])</td><td>Yes</td></tr>
  <tr><td><code>recordLocator</code></td><td>Reference to stored evidence record (UUID or URI)</td><td>Yes</td></tr>
  <tr><td><code>verifier</code></td><td>Entity that performed verification (e.g., "Interac Corp.", "RECO", "Sutton Group")</td><td>Yes</td></tr>
</table>

### 5.2 What Goes in Evidence

- Type of verification performed
- Method/source used (identity provider, regulator, employer, Network Partner)
- Verification timestamp
- Fields that were matched/verified
- Reference locator for audit trail
- Verifier entity information
- Any metadata required for regulatory auditability (e.g., FINTRAC compliance)

### 5.3 What Must NOT Go in Evidence

- **No assurance level indicators** (e.g., HIGH, MODERATE, LOW) - relying parties infer assurance from verification sources
- **No role or persona indicators** beyond what was verified
- **No derived predicates or analysis**
- **No financial information or sensitive personal data**

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
    },
    {
      "type": "ProfessionalVerification",
      "method": "BCFSARegistryCheck",
      "verificationDate": "2025-01-15T14:35:00Z",
      "matchFields": ["name", "licence_number", "licence_status", "licensed_as", "jurisdiction"],
      "recordLocator": "urn:uuid:b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "verifier": "BC Financial Services Authority"
    },
    {
      "type": "EmployerVerification",
      "method": "EmployerSystemOfRecord",
      "verificationDate": "2025-01-15T14:40:00Z",
      "matchFields": ["office_brokerage_name", "office_role", "join_year"],
      "recordLocator": "urn:uuid:c3d4e5f6-a7b8-9012-cdef-123456789012",
      "verifier": "Sutton Group"
    },
    {
      "type": "NetworkPartnerAttestation",
      "method": "NetworkPartnerAttestation",
      "verificationDate": "2025-01-15T14:42:00Z",
      "matchFields": ["networkPartner.npId", "networkPartner.npName", "networkPartner.affiliationDate"],
      "recordLocator": "urn:uuid:d4e5f6a7-b8c9-0123-def0-123456789012",
      "verifier": "Sutton Group"
    }
  ]
}
```

## 6. Issuance Rules

### 6.1 When Credential is Issued

The Verified Advisor Credential is issued when:
1. Holder possesses valid Cornerstone ID (prerequisite)
2. Identity verification successfully completes (Interac, BC Person, or Cornerstone email+phone)
3. Professional licensing verification successfully completes (provincial regulator registry match)
4. Optional: Employer verification completes (if advisor has organizational affiliation)
5. Optional: Network Partner attestation completes (if advisor is affiliated with NP)

**No property or homeownership verification is required** for Verified Advisor issuance. This is purely professional licensing verification.

### 6.2 Credential Binding

The credential is bound to:
- A DID generated by the holder's wallet (stored in `credentialSubject.id`)
- A Cornerstone user account (via Cornerstone ID reference)
- A provincial regulator licence (via `licence_number`)

### 6.3 Multi-Source Verification

If an advisor verifies through multiple sources (e.g., Interac identity verification + BCFSA registry + employer system + Network Partner attestation), the evidence array contains multiple objects documenting each verification source. This increases assurance without requiring an explicit assurance level field.

## 7. Refresh & Expiration

### 7.1 Expiration Period

Verified Advisor credentials expire **1-3 years** after issuance (exact period determined by operational policy and provincial regulator requirements).

### 7.2 Refresh Triggers

Credential refresh is required when:
- Expiration date approaches (90 days prior)
- Licence status changes (renewal, suspension, conditions imposed)
- Licence expires or is renewed by regulator
- Identity verification source expires (e.g., BC Person credential expires)
- Employment affiliation changes (different brokerage, different role)
- Network Partner affiliation changes
- User requests refresh for any reason
- Data quality issues detected in self-declared fields (specialties, service areas) requiring correction

### 7.3 Refresh Process

Refresh requires:
1. Re-verification through identity source (if needed)
2. Re-verification through provincial regulator registry
3. Re-verification through employer system (if applicable)
4. Network Partner re-attestation (if applicable)
5. Revocation of previous credential
6. Issuance of new credential with updated `issuance_date` and `expiration_date`

**Important**: Refresh must maintain alignment with Cornerstone ID. If Cornerstone ID is refreshed, Verified Advisor credential should also be refreshed to maintain consistency.

## 8. Revocation Policy

### 8.1 Revocation Triggers

The Verified Advisor Credential will be revoked when:
1. Licence expired, suspended, or revoked by regulator
2. Professional status changes (no longer licensed, registration lapsed)
3. Identity verification expires or is invalidated
4. Cornerstone ID (prerequisite) is revoked or expired
5. Fraud or identity mismatch detected
6. Employment affiliation ends (if credential includes employer verification)
7. Network Partner affiliation ends (if credential includes NP attestation)
8. Regulatory or legal request for revocation
9. User explicitly requests revocation
10. Data quality issues detected in self-declared fields requiring re-issuance with corrected data

### 8.2 Cascade Revocation Rules

**Critical Dependency**: Verified Advisor credentials depend on Cornerstone ID. If the underlying **Cornerstone ID** is revoked:
- Verified Advisor credential MUST be automatically revoked
- Holder loses professional credential verification
- Any Portfolio Issuer credentials (which depend on Verified Advisor) MUST also be revoked

### 8.3 Revocation Method

Revocation is managed through the Cornerstone revocation registry. Revoked credentials are marked in the registry, and relying parties check revocation status before accepting credentials.

### 8.4 Post-Revocation

After revocation:
- Holder may request re-issuance by completing identity and professional licensing verification again
- Dependent credentials (Portfolio Issuer) must also be re-issued separately

## 9. Policy Integration: What This Credential Enables

### 9.1 Access Control Implications

The Verified Advisor Credential enables specific capabilities within the Cornerstone network:

**Capabilities Granted:**
- **Professional workspace access**: Access professional features and tools in applications
- **Trust network participation**: Join homeowner trust networks as verified advisor
- **Service provider marketplace access**: Offer services to homeowners through verified marketplace
- **Professional badge display**: Display verified professional status in applications and public profiles

**Example Policy Rules:**

1. **Professional Workspace Access Policy**:
   ```
   IF holder presents:
      - Valid Cornerstone ID AND
      - Valid Verified Advisor Credential
   THEN authorize: Access professional workspace features
   ```

2. **Portfolio Issuer Eligibility Policy**:
   ```
   IF holder presents:
      - Valid Cornerstone ID AND
      - Valid Verified Advisor Credential
   THEN eligible for: Portfolio Issuer Credential (subject to Network Partner approval)
   ```

3. **Domain-Specific Feature Policy**:
   ```
   IF Verified Advisor Credential.domain == "REAL_ESTATE"
   THEN authorize: Real estate professional features
   ELSE IF Verified Advisor Credential.domain == "MORTGAGE"
   THEN authorize: Mortgage broker professional features
   ```

### 9.2 Related Credentials

**Prerequisites (must exist before Verified Advisor credential can be issued):**
- **Cornerstone ID** - Base identity credential required for all users

**Dependents (credentials that build upon Verified Advisor):**
- **Portfolio Issuer Credential** - Capability credential granted to advisors authorized to create portfolios (requires Verified Advisor as prerequisite)

**Cascade Effect:**
- If **Cornerstone ID** is revoked → Verified Advisor credential revoked (foundation dependency)
- If **Verified Advisor credential** is revoked → Portfolio Issuer credential revoked (if held)

## 10. Schema Versioning

### 10.1 Version Management

The Verified Advisor credential schema follows semantic versioning:
- **Major version changes** (v1 → v2): Breaking changes requiring new schema URI
- **Minor version changes** (v1.0 → v1.1): Backward-compatible additions
- **Patch version changes** (v1.0.0 → v1.0.1): Non-breaking fixes

### 10.2 Breaking Changes

Examples of breaking changes requiring new major version:
- Removing required attributes (e.g., removing `adviser_type`)
- Changing attribute data types (e.g., `specialties` from array to string)
- Renaming attributes (e.g., `domain` to `professional_domain`)
- Changing credential structure

### 10.3 Backward Compatibility

Non-breaking changes (adding optional attributes, adding evidence types, adding enum values to `advisor_type`/`domain`/`specialization`) maintain backward compatibility within same major version.

## 11. Validation Rules

### 11.1 Required Fields

All of the following fields MUST be present in a valid Verified Advisor Credential:

**credentialSubject:**
- `given_names`
- `family_name`
- `birthdate_dateint`
- `verified_email`
- `advisor_type`
- `domain`
- `specialization`
- `licence_number`
- `licence_status`
- `licensed_as`
- `jurisdiction`
- `regulatory_body`
- `office_hq_location`
- `service_region`
- `identity_evidence`
- `professional_evidence`

**Envelope:**
- `issuer` (must be `did:web:cornerstoneplatform.ca`)
- `issuanceDate`
- `expirationDate`
- `credentialSchema`
- `termsOfUse`

**Evidence:**
- At least one identity verification `evidence` object
- At least one professional verification `evidence` object

### 11.2 Forbidden Fields

The following fields MUST NEVER appear in a Verified Advisor Credential:

**Homeownership/Property Data:**
- PID (Parcel Identifier)
- Property addresses (distinct from business address)
- Title information
- Property assessment data
- Homeowner-specific attributes

**Financial/Portfolio Data:**
- Mortgage balance or terms
- Credit information
- Portfolio data
- Transaction history
- Commission structures

**Role/Persona Information beyond verified professional status:**
- Portfolio Issuer status (separate credential)
- Homeowner status (separate credential)
- Trust network authorizations (separate credentials)

**Predicates:**
- Age predicates (handled by Cornerstone ID)
- Derived boolean or comparative fields

**Assurance Indicators:**
- `proof_level` or assurance level fields
- Trust level indicators
- Verification strength scores

## 12. Schema Definition (High-Level)

The JSON Schema for Verified Advisor Credential is located at:

**`/schemas/v1/verified-advisor.json`**

High-level structure:

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://schema.cornerstoneplatform.ca/contexts/verified-advisor-v1.json"
  ],
  "type": ["VerifiableCredential", "VerifiedAdvisorCredential"],
  "issuer": "did:web:cornerstoneplatform.ca",
  "issuanceDate": "2025-01-15T14:32:00Z",
  "expirationDate": "2028-01-15T14:32:00Z",
  "credentialSubject": {
    "id": "did:example:advisor123",
    "given_names": "John Michael",
    "family_name": "Smith",
    "birthdate_dateint": 19850621,
    "verified_email": "john.smith@example.com",
    "advisor_type": "REALTOR",
    "domain": "REAL_ESTATE",
    "specialization": "REALTOR",
    "licence_number": "123456",
    "licence_status": "REGISTERED",
    "licensed_as": "Representative",
    "jurisdiction": "BC",
    "regulatory_body": "BCFSA",
    "office_hq_location": {
      "city": "Vancouver",
      "province": "BC"
    },
    "service_region": {
      "provinces": ["BC"],
      "cities": ["Vancouver", "Surrey"],
      "regions": ["Lower Mainland"]
    },
    "licence_effective_date": "2020-03-15",
    "licence_expiry": "2025-12-31",
    "business_name": "Sutton Group Realty Inc.",
    "office_brokerage_name": "Sutton - Premier Realty (Premier Surrey)",
    "office_role": "Sales Representative",
    "join_year": 2020,
    "specialties": ["Luxury Homes", "Waterfront Properties"],
    "service_areas": ["Vancouver Downtown", "North Shore"],
    "networkPartner": {
      "npId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "npName": "Sutton Group",
      "affiliationDate": "2020-01-15"
    },
    "identity_evidence": "urn:uuid:a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "professional_evidence": "urn:uuid:b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "employer_evidence": "urn:uuid:c3d4e5f6-a7b8-9012-cdef-123456789012"
  },
  "evidence": [
    {
      "type": "IdentityProofing",
      "method": "InteracBankVerification",
      "verificationDate": "2025-01-15T14:32:00Z",
      "matchFields": ["given_name", "middle_name", "family_name", "birthdate"],
      "recordLocator": "urn:uuid:a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "verifier": "Interac Corp."
    },
    {
      "type": "ProfessionalVerification",
      "method": "BCFSARegistryCheck",
      "verificationDate": "2025-01-15T14:35:00Z",
      "matchFields": ["name", "licence_number", "licence_status", "licensed_as"],
      "recordLocator": "urn:uuid:b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "verifier": "BC Financial Services Authority"
    },
    {
      "type": "EmployerVerification",
      "method": "EmployerSystemOfRecord",
      "verificationDate": "2025-01-15T14:40:00Z",
      "matchFields": ["office_brokerage_name", "office_role", "join_year"],
      "recordLocator": "urn:uuid:c3d4e5f6-a7b8-9012-cdef-123456789012",
      "verifier": "Sutton Group"
    }
  ],
  "credentialSchema": {
    "id": "https://schema.cornerstoneplatform.ca/v1/verified-advisor.json",
    "type": "JsonSchemaValidator2018"
  },
  "termsOfUse": {
    "type": "IssuerPolicy",
    "id": "https://cornerstoneplatform.ca/governance/verified-advisor-v1",
    "profile": "https://cornerstoneplatform.ca/governance/verified-advisor-v1"
  }
}
```

## 13. FINTRAC Compliance

### 13.1 Regulatory Context

Advisors in certain domains (e.g., real estate professionals) are subject to FINTRAC (Proceeds of Crime, Money Laundering and Terrorist Financing Regulations) compliance requirements, including:
- **Identity verification obligations**: Must verify client identity through approved methods
- **5-year relationship maintenance**: Must maintain ongoing relationships with clients (for real estate professionals)
- **Record retention**: Must retain identity verification records for 5 years

The Verified Advisor Credential supports FINTRAC compliance by:
- Documenting high-assurance identity verification
- Providing portable verified identity that reduces redundant verification
- Retaining evidence records for audit purposes

### 13.2 Evidence Retention

Evidence supporting Verified Advisor credentials is retained for **five years** in compliance with FINTRAC regulations (where applicable) and general audit requirements. This includes:
- Identity verification records
- Professional licensing verification records
- Employer verification records (if applicable)
- Network Partner attestation records (if applicable)

## 14. References

### 14.1 Related Documents

- **Cornerstone Identity, Persona, and Access Model** - Conceptual framework describing Professional role (now Advisor), credential-based access control, domain/specialization attributes, and policy catalogue

- **Building Canada's Homeownership Trust Network** - Platform vision and architecture describing advisor roles, Network Partner relationships, and platform intelligence

- **Cornerstone ID Credential Governance** - Base identity credential required as prerequisite

- **Portfolio Issuer Credential Governance** - Capability credential that builds upon Verified Advisor credential

- **Verified Homeowner Credential Governance** - Separate credential for homeowners (not held by advisors unless they are also homeowners)

### 14.2 Schema Resources

- **W3C Verifiable Credentials Data Model**: https://www.w3.org/TR/vc-data-model/
- **Cornerstone Schema Registry**: https://schema.cornerstoneplatform.ca/
- **COPA Trust Registry**: https://trust.cornerstoneplatform.ca/

### 14.3 Provincial Regulator Resources

- **BCFSA (BC)**: https://www.bcfsa.ca/industry-resources/real-estate-services/registrant-search
- **RECO (ON)**: https://registrantsearch.reco.on.ca/
- **OACIQ (QC)**: https://www.oaciq.com/en/

---

**Document Control**

- **Owner**: COPA Trust Network
- **Governance Body**: COPA
- **Review Cycle**: Annual or upon breaking schema changes
- **Contact**: governance@cornerstoneplatform.ca
