---
description: Tools usage
---

When calling create_new_file, you MUST provide the contents argument as a single, escaped string. Do NOT pass a JSON object as the value for contents.
{
    "filepath": "src/main.ts",
}

When using the edit_existing_file tool, you MUST strictly follow the JSON schema. Always include the 'filepath' and 'changes' keys in your tool call. Do not provide code blocks outside of the tool call."
{
    "filepath": "src/main.ts",
    "changes": {
    // Your changes here, e.g.,
    "content": "def new_function():\n return 'updated'"
    }
}
