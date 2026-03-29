#!/usr/bin/env -S just --justfile
# Cross platform shebang:

shebang := if os() == 'windows' { 'pwsh.exe' } else { '/usr/bin/env bash' }

set shell := ["/usr/bin/env", "pwsh", "-noprofile", "-nologo", "-c"]

# set shell := ["/usr/bin/env", "bash" ,"-c"]

set windows-shell := ["pwsh.exe", "-NoLogo", "-noprofile", "-c"]

output_path := "/mnt/x/GitHub/instance-id/unity/projects/ProStream.package/Packages/id.instance.prostream/Documentation"

build-docs:
    @echo "Building docs..."
    npx playwright install chromium && npm run docs:offline:pdf
    @echo "Copying docs to package..."
    node scripts/copy-offline-docs-to-package.mjs {{output_path}}
