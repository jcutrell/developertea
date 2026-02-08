import { useState } from "react";
import tw, { styled } from "twin.macro";

const FormWrapper = styled.form`
  align-items: start;
  background-color: unset;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  width: 100%;
  max-width: 100%;
`;

const InputContainer = styled.div`
  background-color: #ffffff;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-color: #394251;
  border-radius: 0px 0px 0px 0px;
  border-style: solid;
  border-width: 1px;
  display: flex;
  flex-direction: row;
  gap: 0px;
  overflow: hidden;
  padding: 0px 0px 0px 0px;
  width: 100%;
  max-width: 100%;
`;

const InputWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const EmailInput = styled.input`
  background-color: #ffffff;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-color: #000000;
  border-radius: 0px 0px 0px 0px;
  border-style: solid;
  border-width: 0px;
  color: #000000;
  display: block;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  height: calc(24px + 21px + (2 * 0px));
  padding: 12px 16px;
  width: 100%;

  &::placeholder {
    color: #9ca3af;
  }
`;

const SubmitButton = styled.button`
  align-items: center;
  background-color: #1e3a8a;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-color: #1e3a8a;
  border-radius: 0px 0px 0px 0px;
  border-style: solid;
  border-width: 0px;
  color: #ffffff;
  display: flex;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  height: calc(24px + 21px + (2 * 0px));
  justify-content: center;
  padding: 12px 16px;
  width: auto;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #1e40af;
  }
`;

const ErrorMessage = styled.div`
  width: 100%;
  text-align: center;
  color: red;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const SuccessMessage = styled.div`
  width: 100%;
  text-align: center;
  color: green;
  display: ${(props) => (props.show ? "block" : "none")};
`;

export default function BeehiivSubscribeForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          utm_source: new URLSearchParams(window.location.search).get("utm_source"),
          utm_medium: new URLSearchParams(window.location.search).get("utm_medium"),
          utm_campaign: new URLSearchParams(window.location.search).get("utm_campaign"),
          referrer: document.referrer,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <InputContainer>
        <InputWrapper>
          <EmailInput
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </InputWrapper>
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Subscribing..." : "Subscribe"}
        </SubmitButton>
      </InputContainer>
      <ErrorMessage show={!!error}>{error}</ErrorMessage>
      <SuccessMessage show={success}>
        Thanks for subscribing! Check your email to confirm.
      </SuccessMessage>
    </FormWrapper>
  );
}
