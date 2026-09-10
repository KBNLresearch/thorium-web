"use client";

import { useEffect, useState } from "react";
import { PublicationGrid } from "@/components/Misc/PublicationGrid";
import Image from "next/image";

import { isManifestRouteEnabled } from "./ManifestRouteEnabled";

import "./reset.css";
import "./home.css";

const books = [
  {
    title: "Lesboek Versie 1",
    author: "Marre Westerbeek",
    cover: "https://kbresearch.nl/epub/TGVzYm9laywgdmVyc2llIDEuZXB1Yg/images/image.jpeg",
    url: `/read/manifest/${encodeURIComponent("https://kbresearch.nl/epub/TGVzYm9laywgdmVyc2llIDEuZXB1Yg/manifest.json")}`,
  }
];


export default function Home() {
  const [isManifestEnabled, setIsManifestEnabled] = useState<boolean>(true);

  useEffect(() => {
    const checkManifestRoute = async () => {
      try {
        const enabled = await isManifestRouteEnabled();
        setIsManifestEnabled(enabled);
      } catch (error) {
        console.error("Error checking manifest route:", error);
        setIsManifestEnabled(false);
      }
    };

    checkManifestRoute();
  }, []);

  return (
    <main id="home">
      <header className="header">
        <h1>Welcome to Thorium Web</h1>

        <p className="subtitle">An open-source ebook/audiobook/comics Web Reader</p>
      </header>

      <h2>Our selection</h2>

      <PublicationGrid
        publications={ books }
        renderCover={ (publication) => (
          <Image
            src={ publication.cover }
            alt=""
            loading="lazy"
            width={ 120 }
            height={ 180 }
          />
        ) }
      />
    </main>
  );
}
