const feedbackForm = document.querySelector("#feedback-form");

if (feedbackForm) {
  const status = document.querySelector("#feedback-status");
  const submitButton = feedbackForm.querySelector('button[type="submit"]');
  const defaultButtonLabel = submitButton.textContent;

  feedbackForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    submitButton.disabled = true;
    submitButton.textContent = "Enviando…";
    status.hidden = true;
    status.dataset.state = "";

    try {
      const response = await fetch(feedbackForm.action, {
        method: "POST",
        body: new FormData(feedbackForm),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Falha no envio");

      feedbackForm.reset();
      status.textContent = "Relato enviado. Obrigado por ajudar o Kaiplan a evoluir!";
      status.dataset.state = "success";
    } catch {
      status.textContent = "Não foi possível enviar agora. Verifique sua conexão e tente novamente.";
      status.dataset.state = "error";
    } finally {
      status.hidden = false;
      submitButton.disabled = false;
      submitButton.textContent = defaultButtonLabel;
    }
  });
}
