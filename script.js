function isValidURL(url) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(url);
}

function generateQRCode() {
  var input = document.getElementById("url-input").value;
  var size = document.getElementById("size").value;
  var color = document.getElementById("color").value;
  var errorMessage = document.getElementById("error-message");

  // Validate URL
  if (!isValidURL(input)) {
    errorMessage.style.display = "block";
    return;
  } else {
    errorMessage.style.display = "none";
  }

  var canvas = document.getElementById("qrcode");
  QRCode.toCanvas(
    canvas,
    input,
    {
      width: parseInt(size),
      color: {
        dark: color, // Set QR Code color
        light: "#ffffff", // Background color (white)
      },
    },
    function (error) {
      if (error) console.error(error);
      console.log("QR Code generated successfully!");
      document.getElementById("download-btn").style.display = "block"; // Show download button after QR code is generated
    }
  );
}

function downloadQRCode() {
  var canvas = document.getElementById("qrcode");
  var link = document.createElement("a");
  link.href = canvas.toDataURL("image/png"); // Convert canvas to PNG data URL
  link.download = "qrcode.png"; // Set file name for download
  link.click(); // Trigger download
}
