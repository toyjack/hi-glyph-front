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
  const [accessToken, setAccessToken] = useState<string>();
  useEffect(() => {
    getGlyphData(glyphName).then((data) => {
      setGlyphData(data);
    });
    setAccessToken(localStorage.getItem("accessToken")||"");
  }, [glyphName]);   

  return (
    <div className="flex flex-col items-center justify-center py-5 rounded-box overflow-hidden shadow-md absolute h-full w-full md:w-5/6">
      <div className="flex items-center justify-center">
        <h2 className="font-bold text-xl">
          Glyph Name: <span className="text-primary">{glyphName}</span>
        </h2>

        <div className="p-3">
          <Link href={`/glyphs/${glyphName}`} className="btn btn-info ">
            Back
          </Link>
        </div>
      </div>
      <div>
        <p>
          編集をクリックすると保存となります。「BACK」をクリックして確認できます。
        </p>
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

