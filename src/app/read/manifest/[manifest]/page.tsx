"use client";

import { use } from "react";
import { StatefulReader } from "@/components/Epub";
import { StatefulLoader } from "@/components/StatefulLoader";
import { usePublication } from "@/hooks/usePublication";
import { useAppSelector } from "@/lib/hooks";

import "@/app/app.css";

type Params = { manifest: string };

type Props = {
  params: Promise<Params>;
};

export default function ManifestPage({ params }: Props) {
  const isLoading = useAppSelector(state => state.reader.isLoading);
  const manifestUrl = use(params).manifest;

  const { error, manifest, selfLink } = usePublication({
    url: manifestUrl,
    onError: (error) => {
      console.error("Manifest loading error:", error);
    }
  });


  if (error) {
    return (
      <div className="container">
        <h1>Error</h1>
        <p>{ error }</p>
      </div>
    );
  }

  return (
    <StatefulLoader isLoading={ isLoading }>
      { manifest && selfLink && <StatefulReader rawManifest={ manifest } selfHref={ selfLink } /> }
    </StatefulLoader>
  );
}
