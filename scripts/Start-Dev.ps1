$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

function Get-ListeningProcessOnPort {
  param([int]$Port)

  try {
    return Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction Stop |
      Select-Object -First 1 -ExpandProperty OwningProcess
  } catch {
    return $null
  }
}

$port = 3000
$existingProcessId = Get-ListeningProcessOnPort -Port $port

if ($existingProcessId) {
  $existingProcess = Get-Process -Id $existingProcessId -ErrorAction SilentlyContinue

  if ($existingProcess -and $existingProcess.ProcessName -like 'node*') {
    Write-Host "Stopping existing Node process on port $port (PID $existingProcessId)..."
    Stop-Process -Id $existingProcessId -Force
    Start-Sleep -Seconds 1
  } elseif ($existingProcess) {
    Write-Error "Port $port is already in use by process '$($existingProcess.ProcessName)' (PID $existingProcessId). Stop it manually before running dev."
    exit 1
  }
}

Write-Host "Starting Next.js dev server for my-website-2026 on http://localhost:$port ..."
& npm.cmd run dev:web
$exitCode = $LASTEXITCODE

Write-Host "Dev server exited with code $exitCode."
exit $exitCode
