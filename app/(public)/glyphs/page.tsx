import React from "react";
import Card from "./Card";

type GlyphResult = {
  name: string;
  related: string;
  data: string;
};

type GlyphResponse = {
  query: any;
  results: GlyphResult[];
};

async function getGlyphs() {
  const res = await fetch("https://glyph.lab.hi.u-tokyo.ac.jp/api/glyphs", {
    cache: "no-cache",
  });
  const data: GlyphResponse = await res.json();
  return data.results;
}

async function GlyphPage() {
  const glyphs = await getGlyphs();
  return (
    <div className="py-5 flex flex-wrap gap-3 items-center justify-center">
      {glyphs.map((glyph) => (
        <Card name={glyph.name} key={glyph.name} />
      ))}
    </div>
  );
}

export default GlyphPage;
