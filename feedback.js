const feedbackForm = document.querySelector("#feedback-form");
const feedbackIsEnglish = document.documentElement.lang === "en";
const feedbackMessages = feedbackIsEnglish
  ? {
      sending: "Sending…",
      success: "Report sent. Thank you for helping Kaiplan improve!",
      error: "We could not send it right now. Check your connection and try again.",
    }
  : {
      sending: "Enviando…",
      success: "Relato enviado. Obrigado por ajudar o Kaiplan a evoluir!",
      error: "Não foi possível enviar agora. Verifique sua conexão e tente novamente.",
    };

if (feedbackForm) {
  const status = document.querySelector("#feedback-status");
  const submitButton = feedbackForm.querySelector('button[type="submit"]');
  const defaultButtonLabel = submitButton.textContent;

  feedbackForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    submitButton.disabled = true;
    submitButton.textContent = feedbackMessages.sending;
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
      status.textContent = feedbackMessages.success;
      status.dataset.state = "success";
    } catch {
      status.textContent = feedbackMessages.error;
      status.dataset.state = "error";
    } finally {
      status.hidden = false;
      submitButton.disabled = false;
      submitButton.textContent = defaultButtonLabel;
    }
  });
}
