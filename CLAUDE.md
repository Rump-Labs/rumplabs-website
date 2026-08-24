# Project Memory

## Seeker Protocol — Obsidian Memory Layer

> **IMPORTANT: This project uses Obsidian as a persistent memory layer.**
> Before starting work, read the relevant context from the Seeker vault.

### Memory Protocol

1. **Session Start** — Run these commands to load context:
   ```bash
   obsidian vault="Seeker" read path="00 Navigation.md"
   obsidian vault="Seeker" read path="01 Action Register.md"
   ```
   Then read the relevant project note from `Projects/` folder.

2. **During Work** — After significant actions:
   - Update the project note in the vault
   - Log architectural decisions as ADRs in `Architecture/`
   - Record learnings and mistakes in `Learnings/`

3. **Session End** — Update `01 Action Register.md` and audit log in `Audit Log/`

4. **When Asked About Past Decisions** — Search the vault:
   ```bash
   obsidian vault="Seeker" search query="search term"
   ```

### Vault Location
`/Users/agnijdutta/Desktop/Seeker-Protocol/Seeker/`

