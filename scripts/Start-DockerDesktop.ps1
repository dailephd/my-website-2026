$ErrorActionPreference = 'Stop'

function Test-DockerReady {
  try {
    & docker info 1>$null 2>$null
    return ($LASTEXITCODE -eq 0)
  } catch {
    return $false
  }
}

function Start-DockerDesktopApp {
  $started = $false

  try {
    if (Get-Command docker -ErrorAction SilentlyContinue) {
      & docker desktop start | Out-Null
      $started = $true
    }
  } catch {
  }

  if ($started) {
    return
  }

  $candidatePaths = @(
    "$Env:ProgramFiles\Docker\Docker\Docker Desktop.exe",
    "$Env:ProgramFiles\Docker\Docker\Docker Desktop\Docker Desktop.exe",
    "$Env:LocalAppData\Docker\Docker Desktop.exe"
  ) | Where-Object { $_ -and (Test-Path $_) }

  if ($candidatePaths.Count -gt 0) {
    Start-Process -FilePath $candidatePaths[0] -WindowStyle Hidden | Out-Null
    return
  }

  throw 'Docker Desktop could not be started automatically. Install Docker Desktop or add it to PATH.'
}

$timeoutSeconds = 180
if ($Env:DOCKER_START_TIMEOUT_SECONDS) {
  $parsed = 0
  if ([int]::TryParse($Env:DOCKER_START_TIMEOUT_SECONDS, [ref]$parsed) -and $parsed -gt 0) {
    $timeoutSeconds = $parsed
  }
}

Write-Host 'Checking Docker engine readiness...'

if (Test-DockerReady) {
  Write-Host 'Docker is ready.'
  exit 0
}

Write-Host 'Docker is not ready. Attempting to start Docker Desktop...'
Start-DockerDesktopApp

$deadline = (Get-Date).AddSeconds($timeoutSeconds)
while ((Get-Date) -lt $deadline) {
  if (Test-DockerReady) {
    Write-Host 'Docker is ready.'
    exit 0
  }

  Start-Sleep -Seconds 3
}

Write-Error "Docker did not become ready within $timeoutSeconds seconds."
exit 1
