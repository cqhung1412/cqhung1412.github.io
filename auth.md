# auth.md

## Overview

This is a static portfolio site hosted on GitHub Pages. There is no server-side API, no database, and no authenticated endpoints.

## Agent Access

- **Authentication required:** No
- **API available:** No (static site only)
- **Interaction mechanism:** WebMCP (browser-side tools available when the page is loaded in a WebMCP-capable agent browser)

## WebMCP Tools

When loaded in a compatible browser, the page registers the following tools:

| Tool                  | Description                                      |
| --------------------- | ------------------------------------------------ |
| get_contact_info      | Returns email, LinkedIn, and GitHub URLs          |
| get_skills            | Returns skills organized by category             |
| get_experience        | Returns work experience data                     |
| get_cv_link           | Returns URL to downloadable CV PDF               |
| navigate_to_section   | Scrolls viewport to a named section              |

## Rate Limits

None (static site — no server-side processing).

## Contact

For integration inquiries: cqhung1412@gmail.com
