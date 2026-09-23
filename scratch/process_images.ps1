Add-Type -AssemblyName System.Drawing

$src3 = "C:\Users\saumy\.gemini\antigravity-ide\brain\a69eef7b-1908-4e6e-a1cf-0df8e7b44b69\.user_uploaded\media_1790150740687.png"
$src4 = "C:\Users\saumy\.gemini\antigravity-ide\brain\a69eef7b-1908-4e6e-a1cf-0df8e7b44b69\.user_uploaded\media_1790150743891.png"

$destDir = "c:\Users\saumy\OneDrive\Documents\flat\public\UI IMG"

# Copy the exact user screenshots
Copy-Item $src3 -Destination (Join-Path $destDir "google_map_toggle_3.png") -Force
Copy-Item $src4 -Destination (Join-Path $destDir "google_satellite_toggle_4.png") -Force

# Now crop the inner rounded button from image 3 (Map)
# Img3 is 201 x 176. The button is roughly x=16, y=16, w=150, h=136
$bmp3 = [System.Drawing.Bitmap]::FromFile($src3)
$cropRect3 = New-Object System.Drawing.Rectangle(16, 16, 150, 136)
$cropped3 = $bmp3.Clone($cropRect3, $bmp3.PixelFormat)
$cropped3.Save((Join-Path $destDir "map_toggle_btn.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$cropped3.Dispose()
$bmp3.Dispose()

# Now crop the inner rounded button from image 4 (Satellite)
# Img4 is 133 x 140. The button is roughly x=4, y=16, w=116, h=105
$bmp4 = [System.Drawing.Bitmap]::FromFile($src4)
$cropRect4 = New-Object System.Drawing.Rectangle(4, 16, 116, 105)
$cropped4 = $bmp4.Clone($cropRect4, $bmp4.PixelFormat)
$cropped4.Save((Join-Path $destDir "sat_toggle_btn.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$cropped4.Dispose()
$bmp4.Dispose()

Write-Output "Successfully processed toggle images!"
