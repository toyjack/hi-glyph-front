import Image from "next/image";
import Link from "next/link";
import React from "react";

type PageProps = {
  params: {
    glyphName: string;
  };
};

type Response = {
  name : string,
  related : string,
  data : string,
}

async function getGlyphData(glyphName: string) {
  const res = await fetch(
    `https://glyph.lab.hi.u-tokyo.ac.jp/api/glyph/${glyphName}`,
    {
      cache: "no-cache",
    }
  );
  const data: Response = await res.json();
  return data
}

async function GlyphDetails({ params: { glyphName } }: PageProps) {
  const glyphImgUrlPng = `https://glyph.lab.hi.u-tokyo.ac.jp/api/glyph/${glyphName}/png`;
  const glyphImgUrlSvg = `https://glyph.lab.hi.u-tokyo.ac.jp/api/glyph/${glyphName}/svg`;
  const glyphData = await getGlyphData(glyphName)

  return (
    <div className="flex py-5 gap-5">
      <div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <Image
              src={glyphImgUrlPng}
              alt={glyphImgUrlPng}
              height={200}
              width={200}
            />
          </figure>
        </div>
      </div>
      <div className="flex-col flex-grow py-4">
        <h2 className="text-xl font-bold">字形情報</h2>
        <div className="flex text-lg font-normal">
          <div>Name:&nbsp;</div>
          <div className=" underline">{glyphName}</div>
        </div>
        <div className="flex text-lg font-normal">
          <div>Related:&nbsp;</div>
          <div className=" underline">{glyphData.related}</div>
        </div>
        <div className="flex text-lg font-normal">
          <div>Kage:&nbsp;</div>
          <div className=" underline">{glyphData.data}</div>
        </div>
        <div className="flex text-lg font-normal">
          <div>Image url:&nbsp;</div>
          <div>
            <div className=" underline">{glyphImgUrlSvg}</div>
            <div className=" underline">{glyphImgUrlPng}</div>
          </div>
        </div>

        <div className="justify-self-end w-full">
          <Link href={`/glyphs/${glyphName}/edit`} className=" btn btn-warning">
            編集
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GlyphDetails;
