# Authentication — Chifanlema

## Overview

Chifanlema uses Supabase Auth for user authentication. The app is a mobile application (React Native / Expo) — there is no public REST API available for third-party agent access.

## Supported Authentication Methods

| Method          | Platform                   |
| --------------- | -------------------------- |
| Email/password  | All                        |
| Google OAuth    | All                        |
| Apple Sign-In   | iOS only                   |
| Anonymous guest | All (with account linking) |

## Agent Access

Direct API access for third-party agents is **not currently supported**. The backend (Supabase Edge Functions) is rate-limited and requires authenticated user sessions.

## Contact

For partnership or integration inquiries:

- Email: <hungcq.chifanlema@gmail.com>
