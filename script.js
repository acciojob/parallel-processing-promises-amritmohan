//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

async function downloadImages() {
  output.innerHTML = "<p>Loading images...</p>";

  try {
    const imageElements = await Promise.all(images.map(img => downloadImage(img.url)));
    output.innerHTML = ""; 
    imageElements.forEach(img => output.appendChild(img));
  } catch (error) {
    output.innerHTML = `<p style="color:red;">${error}</p>`;
  }
}

btn.addEventListener("click", downloadImages);
