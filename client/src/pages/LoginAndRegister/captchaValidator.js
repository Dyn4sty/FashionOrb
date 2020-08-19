// ======= return a callback function With 2 Params ========== //
//   @param1 -> err
//   @param2 -> data

export const captchaValidator = (cb) => {
  window.grecaptcha.ready(async () => {
    try {
      const token = await window.grecaptcha.execute(
        "6Ld7x_8UAAAAAB_OfjERC6aaKAG1ct-7zZ8vOJQy",
        {
          action: "submit",
        }
      );
      const res = await fetch("http://localhost:5000/captcha", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      });
      const data = await res.json();
      cb(data.error, data);
    } catch (err) {
      cb(err);
    }
  });
};
