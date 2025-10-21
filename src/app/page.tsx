"use client";

import { useEffect, useState } from "react";
import { PublicationGrid } from "@/components/PublicationGrid";
import Image from "next/image";

import { isManifestRouteEnabled } from "./ManifestRouteEnabled";

import "./home.css";

const onlineBooks = [
  {
    title: "De Nieuwe Fiets (A1 / A2)",
    author: "Marre",
    cover: "/images/1-verhaal-a1-a2.png",
    url: `/read/manifest/ZGVtbzF2ZXJoYWFsQTFBMnZlcnNpZTEuZXB1Yg`,
    rendition: "Reflowable"
  },
  {
    title: "Een Nieuwe Start (A1 / B2)",
    author: "Marre",
    cover: "/images/2-verhaal-a1-b2.png",
    url: `/read/manifest/ZGVtbzJ2ZXJoYWFsQTJCMXZlcnNpZTEuZXB1Yg`,
    rendition: "Reflowable"
  },
  {
    title: "Demo 3: Lesboek, versie 1",
    author: "Marre",
    cover: "/images/3-lesboek.png",
    url: `/read/manifest/ZGVtbzNsZXNib2VrMS5lcHVi`,
    rendition: "Reflowable"
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
        <h1>Gecontroleerd ReadAloud Experiment met Thorium Web</h1>
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
