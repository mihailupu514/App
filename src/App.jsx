import { useState } from "react";
import lovesvg from "./assets/All You Need Is Love SVG Cut File.svg";
import lovesvg2 from "./assets/Love In The Air SVG Cut File.svg";

const LOG_ENDPOINT = "/api/log";

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 20 + 16;

  const sendLog = async (choice, extra = {}) => {
  if (!LOG_ENDPOINT) return; // no logging in production

  try {
    await fetch(LOG_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        choice,
        noCount,
        path: window.location.pathname,
        at: new Date().toISOString(),
        ...extra,
      }),
    });
  } catch (e) {
    console.warn("Could not send log to server:", e?.message || e);
  }
};

  const handleNoClick = () => {
    // log first (with current noCount)
    sendLog("NO", { noCountBefore: noCount });
    setNoCount((c) => c + 1);
  };

  const handleYesClick = () => {
    sendLog("YES", { noCountAtYes: noCount });
    setYesPressed(true);
  };

  const getNoButtonText = () => {
    const phrases = [
        "Nu",
        "Ești sigură?",
        "Chiar sigură?",
        "Mai gândește-te puțin 🙂",
        "Ultima șansă!",
        "Sigur nu vrei?",
        "S-ar putea să regreți 😅",
        "Hai, mai gândește-te",
        "Ești absolut sigură?",
        "Cred că faci o mică greșeală 😬",
        "Puțină inimă, te rog ❤️",
        "Nu fi așa rece 🥶",
        "Nu te-ai răzgândit?",
        "Chiar asta e răspunsul tău final?",
        "Îmi frângi inimioara 💔",
        "Serios? 😢",
        "Ultima întrebare… sigură?",
        "Te rog… 🥺",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="overflow-hidden flex flex-col items-center justify-center pt-4 h-screen -mt-16 selection:bg-rose-600 selection:text-white text-zinc-900">
      {yesPressed ? (
        <>
          <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" />
          <div className="text-4xl md:text-6xl font-bold my-4">
            Te iubesc! 💕
          </div>
        </>
      ) : (
        <>
          <img
            className="h-[230px] rounded-lg shadow-lg"
            src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.webp"
            alt="Bear"
          />
          <h1 className="text-4xl md:text-6xl my-4 text-center">
            Vrei să fii Valentine-ul meu?
          </h1>
          <div className="flex flex-wrap justify-center gap-2 items-center">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mr-4"
              style={{ fontSize: yesButtonSize }}
              onClick={handleYesClick}
            >
              Da
            </button>
            <button
              onClick={handleNoClick}
              className="bg-rose-500 hover:bg-rose-600 rounded-lg text-white font-bold py-2 px-4"
            >
              {noCount === 0 ? "Nu" : getNoButtonText()}
            </button>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

const Footer = () => {
  return (
    <a
      className="fixed bottom-2 right-2 backdrop-blur-md opacity-80 hover:opacity-95 border p-1 rounded border-rose-300"
      href="https://www.youtube.com/watch?v=cNGjD0VG4R8&list=RDcNGjD0VG4R8"
      target="__blank"
      rel="noreferrer"
    >
      Made with{" "}
      <span role="img" aria-label="heart">
        ❤️
      </span>
    </a>
  );
};
