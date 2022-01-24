
export const captchaValidator = () => {
    return new Promise((resolve, reject) => {
        window.grecaptcha.ready(async () => {
            try {
                const token = await window.grecaptcha.execute(
                    "6Ld7x_8UAAAAAB_OfjERC6aaKAG1ct-7zZ8vOJQy",
                    {
                        action: "submit",
                    }
                );
                const res = await fetch("/api/captcha", {
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
                if (data.error) {
                    return reject(data.error);
                }
                return resolve(data);
            } catch (err) {
                return reject(err);
            }
        });
    });
};
