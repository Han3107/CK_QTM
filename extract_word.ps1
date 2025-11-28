# Script trích xuất nội dung từ file Word
$wordPath = "d:\1HK125\DIEN_TOAN_DAM_MAY\CUOI_KY\DeCK.docx"
$outputPath = "questions_extracted.txt"

try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $doc = $word.Documents.Open($wordPath)
    
    $content = $doc.Content.Text
    $content | Out-File -FilePath $outputPath -Encoding UTF8
    
    $doc.Close()
    $word.Quit()
    
    Write-Host "Đã trích xuất nội dung vào file: $outputPath"
    Write-Host "`nNội dung:`n"
    Get-Content $outputPath
}
catch {
    Write-Host "Lỗi: $_"
}
finally {
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()
}
