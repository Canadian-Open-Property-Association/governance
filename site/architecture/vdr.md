# VDR Structure

## GitHub Repository Structure

```
verifiable-credentials/
├── credentials/
│   ├── schemas/                    # JSON Schemas
│   │   ├── cornerstone-id.json
│   │   └── home-credential.json
│   │
│   ├── contexts/                   # JSON-LD Vocabulary (RESO + Cornerstone)
│   │   └── cornerstone-vocab.jsonld
│   │
│   ├── vct/                        # Verifiable Credential Types
│   │   ├── cornerstone-id.json
│   │   └── home-credential.json
│   │
│   ├── entities/                   # Entity metadata & assets
│   │   ├── entity-a.json
│   │   ├── entity-b.json
│   │   └── logos/
│   │       ├── entity-a.png
│   │       └── entity-b.png
│   │
│   ├── harmonization/              # Data mappings
│   │   └── mappings.json
│   │
│   └── governance-docs/            # Human-readable governance frameworks
│       ├── cornerstone-id.md
│       └── home-credential.md
│
└── README.md
```

---

## URL Patterns

| Artifact | URL Pattern |
|----------|-------------|
| Schema | `https://openpropertyassociation.ca/credentials/schemas/{type}.json` |
| VCT | `https://openpropertyassociation.ca/credentials/vct/{type}.json` |
| Vocab | `https://openpropertyassociation.ca/credentials/contexts/cornerstone-vocab.jsonld` |
| Entity | `https://openpropertyassociation.ca/credentials/entities/{id}.json` |
| Logo | `https://openpropertyassociation.ca/credentials/entities/logos/{id}.png` |
| Governance | `https://openpropertyassociation.ca/credentials/governance-docs/{type}.md` |

---

## Identifier Conventions

| Artifact | Pattern | Example |
|----------|---------|---------|
| Entity ID | `{name}` | `furnisher-a` |
| Schema file | `{credential-type}.json` | `home-credential.json` |
| VCT file | `{credential-type}.json` | `home-credential.json` |
| RESO vocab term | `reso:{term}` | `reso:AssessedValue` |
| Cornerstone vocab term | `cornerstone:{term}` | `cornerstone:givenName` |
| Data source field | `{entity}:{field}` | `furnisher:assessed_val` |

---

## Binding Chain: From Data to Credential

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           GOVERNANCE LAYER (VDR)                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Data Furnisher          Harmonization           Vocabulary                  │
│  (Entity Manager)        (Data Harmonization)    (Data Dictionary)           │
│                                                                              │
│  furnisher:assessed_val ─────────┐                                           │
│                                  ├────────────► reso:AssessedValue           │
│  other:property_value ───────────┘                    │                      │
│                                                       │                      │
│                                                       ▼                      │
│                                               Schema Property                │
│                                               (Schema Builder)               │
│                                                       │                      │
│                                        "AssessedValue": { type: "number" }   │
│                                                       │                      │
│                                                       ▼                      │
│                                                  VCT Claim                   │
│                                                (VCT Builder)                 │
│                                                       │                      │
│                                        claims.AssessedValue {                │
│                                          vocab_binding: "reso:AssessedValue",│
│                                          acceptable_evidence: [...]          │
│                                        }                                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          CREDENTIAL EXCHANGE LAYER                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Issuance Service                                                            │
│       │                                                                      │
│       ├── Fetches VCT from VDR (defines credential type)                     │
│       ├── Receives data from furnisher (assessed_val = 500000)               │
│       ├── Queries harmonization → resolves to reso:AssessedValue             │
│       ├── Validates against schema (from VCT.schema_uri)                     │
│       ├── Builds credential with evidence metadata                           │
│       └── Issues credential offer to wallet                                  │
│                                                                              │
│  Verifiable Credential                                                       │
│       │                                                                      │
│       ├── credentialSubject.AssessedValue = 500000                           │
│       └── evidence[0].sourceEntity = "furnisher-example"                     │
│                                                                              │
│  Wallet                                                                      │
│       │                                                                      │
│       ├── Fetches VCT for rendering                                          │
│       ├── Displays card with branding                                        │
│       └── Shows furnisher logo on back (from evidence)                       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```
