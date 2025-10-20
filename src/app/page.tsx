"use client";

import { useEffect, useState } from "react";
import { PublicationGrid } from "@/components/PublicationGrid";
import Image from "next/image";

import { isManifestRouteEnabled } from "./ManifestRouteEnabled";

import "./home.css";

const books = [
  // {
  //   title: "Moby Dick",
  //   author: "Herman Melville",
  //   cover: "/images/MobyDick.jpg",
  //   url: "/read/moby-dick",
  //   rendition: "Reflowable"
  // },
  // {
  //   title: "The House of the Seven Gables",
  //   author: "Nathaniel Hawthorne",
  //   cover: "/images/TheHouseOfTheSevenGables.jpg",
  //   url: "/read/the-house-of-seven-gables",
  //   rendition: "Reflowable"
  // },
  // {
  //   title: "Les Diaboliques",
  //   author: "Jules Barbey d'Aurevilly",
  //   cover: "/images/LesDiaboliques.png",
  //   url: "/read/les-diaboliques",
  //   rendition: "Reflowable"
  // },
  // {
  //   title: "Bella the Dragon",
  //   author: "Barbara Nick, Elaine Steckler",
  //   cover: "/images/Bella.jpg",
  //   url: "/read/bella-the-dragon",
  //   rendition: "Fixed Layout"
  // }
];

const onlineBooks = [
  {
    title: "Demo 1: Verhaal A1 A2, versie 1",
    author: "Marre",
    cover: "",
    url: `/read/manifest/${encodeURIComponent("https://www.kbresearch.nl/epub/ZGVtbzF2ZXJoYWFsQTFBMnZlcnNpZTEuZXB1Yg/manifest.json")}`,
    rendition: "Moet Meer Reflowable worden"
  },
  {
    title: "Demo 2: Verhaal A1 B2, versie 1",
    author: "Marre",
    cover: "",
    url: `/read/manifest/${encodeURIComponent("https://www.kbresearch.nl/epub/ZGVtbzJ2ZXJoYWFsQTJCMXZlcnNpZTEuZXB1Yg/manifest.json")}`,
    rendition: "Moet Meer Reflowable worden"
  },
  {
    title: "Demo 3: Lesboek, versie 1",
    author: "Marre",
    cover: "",
    url: `/read/manifest/${encodeURIComponent("https://www.kbresearch.nl/epub/ZGVtbzNsZXNib2VrMS5lcHVi/manifest.json")}`,
    rendition: "Moet Meer Reflowable worden"
  }
  // {
  //   title: "Accessible EPUB3",
  //   author: "Matt Garrish",
  //   cover: "/images/accessibleEpub3.jpg",
  //   url: "/read/manifest/https%3A%2F%2Fpublication-server.readium.org%2FaHR0cHM6Ly9naXRodWIuY29tL0lEUEYvZXB1YjMtc2FtcGxlcy9yZWxlYXNlcy9kb3dubG9hZC8yMDIzMDcwNC9hY2Nlc3NpYmxlX2VwdWJfMy5lcHVi%2Fmanifest.json",
  //   rendition: "Reflowable"
  // },
  // {
  //   title: "Children Literature",
  //   author: "Charles Madison Curry, Erle Elsworth Clippinger",
  //   cover: "/images/ChildrensLiterature.png",
  //   url: "/read/manifest/https%3A%2F%2Fpublication-server.readium.org%2FaHR0cHM6Ly9naXRodWIuY29tL0lEUEYvZXB1YjMtc2FtcGxlcy9yZWxlYXNlcy9kb3dubG9hZC8yMDIzMDcwNC9jaGlsZHJlbnMtbGl0ZXJhdHVyZS5lcHVi%2Fmanifest.json",
  //   rendition: "Reflowable"
  // }
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

      <PublicationGrid
        publications={ onlineBooks }
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
