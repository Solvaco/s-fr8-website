// src/lib/send-email.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import emailjs from "@emailjs/browser";
import { sendFormEmail } from "./send-email";

vi.mock("@emailjs/browser", () => ({
  default: { send: vi.fn() },
}));

describe("sendFormEmail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_SERVICE_ID", "service_1");
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY", "pub_1");
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_TEMPLATE_QUOTE", "tmpl_quote");
  });

  it("returns a 'not-configured' result when env vars are missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_SERVICE_ID", "");
    const result = await sendFormEmail("quote", { name: "Jean" });
    expect(result).toEqual({ status: "not-configured" });
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  it("calls emailjs.send with the right template id and returns 'sent'", async () => {
    (emailjs.send as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ status: 200 });
    const result = await sendFormEmail("quote", { name: "Jean" });
    expect(result).toEqual({ status: "sent" });
    expect(emailjs.send).toHaveBeenCalledWith(
      "service_1",
      "tmpl_quote",
      { name: "Jean" },
      { publicKey: "pub_1" }
    );
  });

  it("returns 'error' when emailjs.send rejects", async () => {
    (emailjs.send as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error("network"));
    const result = await sendFormEmail("quote", { name: "Jean" });
    expect(result).toEqual({ status: "error" });
  });
});
