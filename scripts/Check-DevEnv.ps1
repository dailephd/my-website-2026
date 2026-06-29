$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

$requiredPaths = @(
  'package.json',
  'src\app',
  'docs\PROJECT_OVERVIEW.md',
  'docs\milestones.json',
  'docs\project_tree.txt'
)

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Error 'Node.js is not installed or not available on PATH.'
  exit 1
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Write-Error 'npm is not installed or not available on PATH.'
  exit 1
}

foreach ($path in $requiredPaths) {
  if (-not (Test-Path $path)) {
    Write-Error "Required path is missing: $path"
    exit 1
  }
}

if ((Test-Path '.env.example') -and -not (Test-Path '.env.local')) {
  Write-Host 'Optional environment setup: copy .env.example to .env.local if you need local overrides.'
}

Write-Host 'Development environment check passed.'
Write-Host "Repo root: $repoRoot"
Write-Host "Node: $(node --version)"
Write-Host "npm: $(npm --version)"
exit 0
