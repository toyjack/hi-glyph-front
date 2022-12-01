'use client'
import Link from 'next/link';
import {useEffect, useState} from 'react'
import Iframe from "react-iframe";

type PageProps = {
  params: {
    glyphName: string;
  };
};
type Glyph = {
  name: string;
  related: string;
  data: string;
};

async function getGlyphData(glyphName: string) : Promise<Glyph> {
  const res = await fetch(
    `https://glyph.lab.hi.u-tokyo.ac.jp/api/glyph/${glyphName}`,
    {
      cache: "no-cache",
    }
  );
  const data: Glyph = await res.json() ;
  return data;
}

export default function EditPage({ params: { glyphName } }: PageProps) {
  const [glyphData, setGlyphData] = useState<Glyph>();
  let accessToken;
  useEffect(() => {
    getGlyphData(glyphName).then((data) => {
      setGlyphData(data);
    });
    accessToken = localStorage.getItem("accessToken");
  }, [glyphName]);   
  if (!accessToken) {
    return (
      <div>login first</div>
    )
  }

  console.log(glyphData)
  return (
    <div className="py-5 rounded-box overflow-hidden shadow-md absolute h-full w-5/6">
      <div className="flex">
        <h2>Glyph Name: {glyphName}</h2>
        <Link href={`/glyphs/${glyphName}`} className="btn">
          Back
        </Link>
      </div>
      <Iframe
        url={`https://glittery-banoffee-0e4398.netlify.app/#name=${glyphName}&data=${glyphData?.data}&related=${glyphData?.related}&token=${accessToken}`}
        position="relative"
        width="100%"
        height="100%"
      />
    </div>
  );
}

