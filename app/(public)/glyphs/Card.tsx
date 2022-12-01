import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Props ={
  name: string,
  key: string,
}
function Card(props:Props) {
  const glyphImgUrl = `https://glyph.lab.hi.u-tokyo.ac.jp/api/glyph/${props.name}/png`;
  const detailsUrl = `/glyphs/${props.name}`;
  return (
    <div className="card card-compact w-64 bg-base-100 shadow-xl p-2">
      <figure className="w-full h-full">
        <Image src={glyphImgUrl} alt={props.name} height={64} width={64} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.name}</h2>
        <div className="card-actions justify-end">
          <Link href={detailsUrl} className="btn btn-info">
            詳細
          </Link>
          <button className="btn btn-warning">編集</button>
        </div>
      </div>
    </div>
  );
}

export default Card