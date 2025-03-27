"use client";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const providerLogos: Record<string, string> = {
  facebook: "/icons8-facebook-48.png",
  github: "/icons8-github-logo-50.png",
  twitter: "/icons8-x-50.png",
};

export default function SignIn() {
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await fetch("/api/auth/providers");
      const data = await res.json();
      setProviders(data);
    };

    fetchProviders();
  }, []);

  return (
    <>
      <Link href="/" className="text-blue-500 p-6">
        &larr; Back to Home
      </Link>
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-4">Sign In to Movies-HUB</h1>
        <p className="mb-6 text-gray-600">Choose a Way to sign in:</p>
        <div className="space-y-4">
          {providers &&
            (Object.values(providers) as Provider[]).map(
              (provider: Provider) => (
                <button
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                  className="flex flex-row w-48 items-center
              justify-center italic text-center bg-blue-500 hover:bg-slate-600
               text-white px-4 py-2 rounded-lg transition transform hover:scale-105"
                >
                  <Image
                    src={providerLogos[provider.id]}
                    alt={`${provider.name} logo`}
                    className="w-4 h-4 mr-2"
                    loading="lazy"
                    width={500}
                    height={750}
                  />
                  <span>{provider.name}</span>
                </button>
              )
            )}
        </div>
      </div>
    </>
  );
}
