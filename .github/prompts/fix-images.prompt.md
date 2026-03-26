---
name: fix-images
description: Fix and optimize all image tags across the website
agent: agent
---
Please find and fix all `<img>` tags across the website's HTML files.

For each HTML file in the workspace, ensure that:
1. Every `<img ...>` tag has a meaningful `alt` attribute. Generate a descriptive one based on the filename or context if it is missing or empty.
2. The `src` attribute paths are correct and resolve properly.
3. Where appropriate, add the `loading="lazy"` attribute to improve page performance.
4. Apply any missing standard styling or responsive classes if requested.

Please use the `grep_search` or `file_search` tools to locate HTML files, review their image tags, and apply fixes directly using the `replace_string_in_file` tool.