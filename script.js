function generateQRCode() {
  var input = document.getElementById("url-input").value;
  if (input) {
    var canvas = document.getElementById("qrcode");
    QRCode.toCanvas(canvas, input, function (error) {
      if (error) console.error(error);
      console.log("QR Code generated successfully!");
      document.getElementById("download-btn").style.display = "block"; // Show download button after QR code is generated
    });
  }
}

function downloadQRCode() {
  var canvas = document.getElementById("qrcode");
  var link = document.createElement("a");
  link.href = canvas.toDataURL("image/png"); // Convert canvas to PNG data URL
  link.download = "qrcode.png"; // Set file name for download
  link.click(); // Trigger download
}
