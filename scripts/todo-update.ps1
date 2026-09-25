$file = "D:\workspace\developer-portfolio-lab\TODO.md"
$c = [System.IO.File]::ReadAllText($file)
$repl = @{
  "> **更新日期**：2026-09-22" = "> **更新日期**：2026-09-25"
  "> **状态**：Phase 0-5 完成，Phase 6 进行中（已部署 Vercel）" = "> **状态**：Phase 0-6 全部完成（Vercel 部署 + SEO 上线）"
  "Phase 4  Backend + Admin       ████████████░░░░░░░░  ~60% 🟡" = "Phase 4  Backend + Admin       ████████████████████  100% ✅"
  "Phase 6  Launch                ░░░░░░░░░░░░░░░░░░    0% ⬜" = "Phase 6  Launch                ████████████████████  100% ✅"
}
foreach ($k in $repl.Keys) {
  if ($c.Contains($k)) { $c = $c.Replace($k, $repl[$k]); Write-Output ("replaced: " + $k.Substring(0, 12)) }
  else { Write-Output ("NOT FOUND: " + $k.Substring(0, 12)) }
}
[System.IO.File]::WriteAllText($file, $c)
Write-Output "TODO saved"
