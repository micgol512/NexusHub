"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("smarttech", {
      redirect: false,
      contact,
      password,
      callbackUrl,
    });

    if (res?.error) {
      setError("Nieprawidłowe dane logowania");
    } else {
      router.push(callbackUrl);
    }
  };

  const handleOAuthLogin = (provider: string) => () => {
    signIn(provider, { callbackUrl });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow-md space-y-6">
      <h1 className="text-2xl font-bold text-center">Zaloguj się</h1>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="contact" className="block text-sm font-medium">
            Email lub numer telefonu
          </label>
          <input
            id="contact"
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Hasło
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Zaloguj się
        </button>
      </form>

      <div className="text-center text-sm text-gray-500">
        lub zaloguj się przez
      </div>

      <div className="flex flex-col space-y-2">
        <button
          onClick={handleOAuthLogin("github")}
          className="w-full border py-2 rounded hover:bg-gray-100"
        >
          GitHub
        </button>
        <button
          onClick={handleOAuthLogin("google")}
          className="w-full border py-2 rounded hover:bg-gray-100"
        >
          Google
        </button>
        <button
          onClick={handleOAuthLogin("facebook")}
          className="w-full border py-2 rounded hover:bg-gray-100"
        >
          Facebook
        </button>
        <button
          onClick={handleOAuthLogin("apple")}
          className="w-full border py-2 rounded hover:bg-gray-100"
        >
          Apple
        </button>
      </div>
    </div>
  );
}
