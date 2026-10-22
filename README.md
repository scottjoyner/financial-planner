# Financial Planner

<!-- repo-entrypoint-guide:start -->
## Repository guide

**Project goal:** A personal-finance dashboard that consolidates accounts, transactions, and accounting statements. This README describes an intended product direction, not evidence of linked financial institutions or a live service.

**Next milestone:** Document supported data import formats, reconciliation logic, local development steps, and a synthetic-data demo. Protect account records and API credentials, and avoid publishing transaction exports.
<!-- repo-entrypoint-guide:end -->

This project will be a home dashboard where you can see all your accounts, and transactions in one place.
The inital goal was to produce a automated Accounting statement generator for personal bussinesses. 
The idea was expanded into a wider scope; however, the core principle stays the same, that all my "personal bussiness" transactions can be tracked, and logged here. 


## Current source and development boundaries (2026-10-22)

This repository contains a historical **React + Express + GraphQL + Sequelize** web stack, not only a project concept. Its `package.json` declares `yarn start`, `yarn test` (Jest), linting, build, bundle, and server tasks; they have **not** been verified against installed dependencies in this audit. The repository also includes `src/`, `test/`, `tools/`, and `docs/`.

**Privacy checkpoint:** `database.sqlite` is tracked in this **public** repository. Its contents were not inspected here, so this is **not a confirmed personal-data leak**, but the file must be classified before copying, indexing, sharing or using it as a fixture. If it contains real customer/financial records, use a replacement synthetic fixture, investigate history/artifacts, and follow the relevant incident handling process. Removing it from the current branch would not erase Git history.

Do not assume account-provider connectivity, production authentication, accurate reconciliation, or deployability. Run future tests only with synthetic data and disabled external financial connectors. Dependency support and security advisories also require fresh review.
