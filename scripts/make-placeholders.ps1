Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$dir = Join-Path $root "public\photos"
New-Item -ItemType Directory -Force -Path $dir | Out-Null

# light, mid, dark — warm plates so the album has variety before real photos are added
$palettes = @(
  @(255,214,176, 232,140,120, 92,42,48),
  @(244,196,186, 196,110,118, 110,48,58),
  @(226,214,186, 150,158,120, 78,72,48),
  @(236,176,110, 186,104,72, 92,52,36),
  @(186,206,214, 212,184,150, 48,62,82),
  @(244,220,170, 232,170,160, 150,84,62),
  @(206,190,204, 168,130,150, 78,48,72),
  @(240,196,120, 220,150,96, 120,64,36),
  @(196,204,210, 150,156,168, 42,48,58),
  @(244,150,110, 210,96,110, 110,32,42),
  @(214,220,226, 196,186,150, 70,78,90),
  @(196,186,140, 230,220,190, 72,78,48),
  @(244,226,160, 236,210,186, 120,110,96),
  @(226,230,234, 170,190,210, 48,52,60),
  @(190,210,190, 220,200,160, 70,90,78),
  @(230,170,160, 212,164,96, 110,36,48),
  @(236,214,180, 214,170,160, 92,58,48),
  @(210,140,80, 140,48,58, 36,18,22),
  @(255,220,196, 236,196,170, 120,84,64),
  @(160,42,52, 196,140,78, 22,12,14)
)

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoder = [System.Drawing.Imaging.Encoder]::Quality
$encParams = New-Object System.Drawing.Imaging.EncoderParameters 1
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter $encoder, ([long]82)

function New-Rgb([int]$r, [int]$g, [int]$b, [int]$a = 255) {
  return [System.Drawing.Color]::FromArgb($a, $r, $g, $b)
}

for ($i = 1; $i -le 20; $i++) {
  $p = $palettes[$i - 1]
  $rand = New-Object System.Random ($i * 7919)
  $bmp = New-Object System.Drawing.Bitmap 800, 1000
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

  $rect = New-Object System.Drawing.Rectangle 0, 0, 800, 1000
  $c1 = New-Rgb $p[0] $p[1] $p[2]
  $c2 = New-Rgb $p[3] $p[4] $p[5]
  $angle = 28 + (($i * 17) % 130)
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, $c1, $c2, $angle
  $g.FillRectangle($brush, $rect)
  $brush.Dispose()

  for ($n = 0; $n -lt 16; $n++) {
    $rr = $rand.Next(50, 220)
    $x = $rand.Next(-60, 760)
    $y = $rand.Next(-60, 960)
    $alpha = $rand.Next(22, 58)
    if ($n % 2 -eq 0) {
      $col = New-Rgb $p[0] $p[1] $p[2] $alpha
    } else {
      $col = New-Rgb $p[3] $p[4] $p[5] $alpha
    }
    $b = New-Object System.Drawing.SolidBrush $col
    $g.FillEllipse($b, $x, $y, $rr, [int]($rr * 0.86))
    $b.Dispose()
  }

  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddRectangle($rect)
  $pgb = New-Object System.Drawing.Drawing2D.PathGradientBrush $path
  $pgb.CenterColor = (New-Rgb 0 0 0 0)
  $pgb.SurroundColors = @((New-Rgb $p[6] $p[7] $p[8] 120))
  $g.FillRectangle($pgb, 0, 0, 800, 1000)
  $pgb.Dispose()
  $path.Dispose()

  $pen = New-Object System.Drawing.Pen (New-Rgb 255 250 245 50), 10
  $g.DrawRectangle($pen, 10, 10, 780, 980)
  $pen.Dispose()

  $font = New-Object System.Drawing.Font "Georgia", 20, ([System.Drawing.FontStyle]::Italic)
  $text = New-Object System.Drawing.SolidBrush (New-Rgb $p[6] $p[7] $p[8] 150)
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::Far
  $label = "photo{0:D2}" -f $i
  $box = New-Object System.Drawing.RectangleF 0, 930, 760, 48
  $g.DrawString($label, $font, $text, $box, $format)
  $format.Dispose()
  $text.Dispose()
  $font.Dispose()

  $g.Dispose()
  $out = Join-Path $dir ("photo{0:D2}.jpg" -f $i)
  $bmp.Save($out, $codec, $encParams)
  $bmp.Dispose()
  Write-Output $out
}

$encParams.Dispose()
