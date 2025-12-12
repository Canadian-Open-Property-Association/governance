# Vocabulary

## RESO Data Dictionary

COPA uses the **Real Estate Standards Organization (RESO) Data Dictionary** as the foundation for our vocabulary. This provides:

- Industry-standard property and real estate terminology
- Broad coverage of property-related attributes
- Established adoption in the real estate industry

**COPA Extensions**: Where RESO doesn't cover our needs (e.g., identity attributes, financial data), we define COPA-specific extensions that follow the same patterns.

```
Vocabulary Structure:
├── RESO Data Dictionary (base)
│   ├── Property (address, assessment, listing)
│   ├── Member (agent, broker info)
│   └── ...
│
└── COPA Extensions
    ├── Person (identity attributes)
    ├── Financial (income, credit)
    └── Badge (achievement indicators)
```

---

## Core Concepts

### Terminology

| Term | Context | Definition |
|------|---------|------------|
| **Property** | JSON Schema | An attribute of a credential (e.g., `givenName`, `AssessedValue`) |
| **Claim** | VCT | A property as referenced in a VCT, bound to vocab and display metadata |
| **Vocab Term** | JSON-LD Context | Canonical semantic identifier (e.g., `reso:AssessedValue`, `copa:givenName`) |
| **Data Source** | Entity Manager | Raw field from a furnisher in their native format |

---

## Identifier Conventions

| Artifact | Pattern | Example |
|----------|---------|---------|
| RESO vocab term | `reso:{term}` | `reso:AssessedValue` |
| COPA vocab term | `copa:{term}` | `copa:givenName` |
| Entity ID | `copa-{name}` | `copa-furnisher-a` |
| Data source field | `{entity}:{field}` | `furnisher:assessed_val` |
