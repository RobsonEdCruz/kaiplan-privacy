async function readManifest(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Não foi possível carregar ${path}`);
  return response.json();
}

function createScreenshot(item) {
  const figure = document.createElement("figure");
  figure.className = "shot-card";

  const media = document.createElement("div");
  media.className = "shot-media";

  const image = document.createElement("img");
  image.src = `assets/screenshots/${item.file}`;
  image.alt = item.alt || `Tela ${item.title} do Kaiplan`;
  image.loading = "lazy";
  image.decoding = "async";

  const fallback = document.createElement("span");
  fallback.className = "shot-fallback";
  fallback.textContent = `Adicione ${item.file} em assets/screenshots`;

  image.addEventListener("load", () => media.append(image));
  image.addEventListener("error", () => media.append(fallback));

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
    const items = await readManifest("assets/screenshots/manifest.json");
    if (!items.length) throw new Error("Manifesto vazio");
    gallery.replaceChildren(...items.map(createScreenshot));
  } catch {
    gallery.innerHTML = '<p class="empty-state">A galeria está pronta. Adicione as imagens e atualize o manifesto da pasta de screenshots.</p>';
  }
}

function createResource(item) {
  const article = document.createElement("article");
  article.className = "resource";

  const meta = document.createElement("span");
  meta.className = "resource-meta";
  meta.textContent = item.type || "Material";

  const title = document.createElement("h3");
  title.textContent = item.title;

  const description = document.createElement("p");
  description.textContent = item.description || "";

  article.append(meta, title, description);
  if (item.file) {
    const link = document.createElement("a");
    link.href = `content/learning/${item.file}`;
    link.textContent = item.linkLabel || "Abrir material";
    article.append(link);
  }
  return article;
}

async function loadLearningResources() {
  const list = document.querySelector("[data-learning-resources]");
  if (!list) return;

  try {
    const items = await readManifest("content/learning/manifest.json");
    if (!items.length) throw new Error("Manifesto vazio");
    list.replaceChildren(...items.map(createResource));
  } catch {
    list.innerHTML = '<p class="empty-state">A biblioteca está pronta para receber guias, documentos e outros arquivos de aprendizado.</p>';
  }
}

loadScreenshots();
loadLearningResources();
