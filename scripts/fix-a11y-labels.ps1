# 可访问性批量修复：为 Admin 表单 label 添加 for/id 关联
# 用法：pwsh -File fix-a11y-labels.ps1 <file> <id1,id2,...>
param(
  [Parameter(Mandatory = $true)][string]$File,
  [Parameter(Mandatory = $true)][string[]]$Ids
)

$content = [System.IO.File]::ReadAllText($File, [System.Text.Encoding]::UTF8)

# 匹配：label 标签 → 到下一个 input/textarea/select 开标签为止
$pattern = '(?s)(<label\s+class="block text-sm font-medium mb-1">[^<]*?</label>.*?)(<input|<textarea|<select)(\s)'

foreach ($id in $Ids) {
  $script:done = 0
  $content = [regex]::Replace($content, $pattern, {
    param($m)
    if ($script:done -eq 1) { return $m.Value }
    $script:done = 1

    $labelPart = $m.Groups[1].Value
    $tagPart = $m.Groups[2].Value
    $space = $m.Groups[3].Value

    # label 加 for
    $labelPart = [regex]::Replace($labelPart, '<label\s+class=', "<label for=`"$id`" class=")

    # 输入控件加 id
    "$labelPart$tagPart id=`"$id`"$space"
  })
  if ($script:done -eq 0) {
    Write-Output "WARN: no more labels to match for id=$id"
  }
}

[System.IO.File]::WriteAllText($File, $content, (New-Object System.Text.UTF8Encoding $false))
Write-Output "Processed ${File}: $($Ids.Count) labels linked"
