async function readManifest(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Não foi possível carregar ${path}`);
  return response.json();
}

const isEnglish = document.documentElement.lang === "en";
const messages = isEnglish
  ? {
      screenshotAlt: (title) => `Kaiplan ${title} screen`,
      missingScreenshot: (file) => `Add ${file} to assets/screenshots`,
      emptyGallery: "The gallery is ready. Add the images and update the screenshot manifest.",
      material: "Material",
      openMaterial: "Open material",
      emptyLibrary: "The library is ready to receive guides, documents, and other learning materials.",
    }
  : {
      screenshotAlt: (title) => `Tela ${title} do Kaiplan`,
      missingScreenshot: (file) => `Adicione ${file} em assets/screenshots`,
      emptyGallery: "A galeria está pronta. Adicione as imagens e atualize o manifesto da pasta de screenshots.",
      material: "Material",
      openMaterial: "Abrir material",
      emptyLibrary: "A biblioteca está pronta para receber guias, documentos e outros arquivos de aprendizado.",
    };

function createScreenshot(item) {
  const figure = document.createElement("figure");
  figure.className = "shot-card";

  const media = document.createElement("div");
  media.className = "shot-media";

  const image = document.createElement("img");
  image.alt = item.alt || messages.screenshotAlt(item.title);
  image.loading = "lazy";
  image.decoding = "async";

  const fallback = document.createElement("span");
  fallback.className = "shot-fallback";
  fallback.textContent = messages.missingScreenshot(item.file);

  image.addEventListener("error", () => media.replaceChildren(fallback), { once: true });
  media.append(image);
  image.src = `assets/screenshots/${item.file}`;

  const caption = document.createElement("figcaption");
  const title = document.createElement("strong");
  title.textContent = item.title;
  const description = document.createElement("span");
  description.textContent = item.description || "";
  caption.append(title, description);
  figure.append(media, caption);
  return figure;
}

async function loadScreenshots() {
  const gallery = document.querySelector("[data-screenshot-gallery]");
  if (!gallery) return;

  try {
    const manifest = gallery.dataset.manifest || "assets/screenshots/manifest.json";
    const items = await readManifest(manifest);
    if (!items.length) throw new Error("Manifesto vazio");
    gallery.replaceChildren(...items.map(createScreenshot));
  } catch {
    gallery.innerHTML = `<p class="empty-state">${messages.emptyGallery}</p>`;
  }
}

function createResource(item) {
  const article = document.createElement("article");
  article.className = "resource";

  const meta = document.createElement("span");
  meta.className = "resource-meta";
  meta.textContent = item.type || messages.material;

  const title = document.createElement("h3");
  title.textContent = item.title;

  const description = document.createElement("p");
  description.textContent = item.description || "";

  article.append(meta, title, description);
  if (item.file) {
    const link = document.createElement("a");
    link.href = `content/learning/${item.file}`;
    link.textContent = item.linkLabel || messages.openMaterial;
    article.append(link);
  }
  return article;
}

async function loadLearningResources() {
  const list = document.querySelector("[data-learning-resources]");
  if (!list) return;

  try {
    const manifest = list.dataset.manifest || "content/learning/manifest.json";
    const items = await readManifest(manifest);
    if (!items.length) throw new Error("Manifesto vazio");
    list.replaceChildren(...items.map(createResource));
  } catch {
    list.innerHTML = `<p class="empty-state">${messages.emptyLibrary}</p>`;
  }
}

loadScreenshots();
loadLearningResources();
