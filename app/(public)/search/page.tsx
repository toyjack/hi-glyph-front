"use client";
import { useState, useRef } from "react";
import Card from './Card'

type Glyph = {
  name: string;
  related: string;
  data: string;
};

function SearchPage() {
  const userRef = useRef<HTMLInputElement>(null);
  const relatedRef = useRef<HTMLInputElement>(null);
  const containsRef = useRef<HTMLInputElement>(null);
  
  const [searchResults, setSearchResults] = useState<Glyph[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = userRef.current?.value;
    const related = relatedRef.current?.value;
    const contains = containsRef.current?.value;

    const res = await fetch(
      `https://glyph.lab.hi.u-tokyo.ac.jp/api/glyphs?contains=${contains}&related=${related}&skip=0&take=50&user=${user}`,
      {
        cache: "no-cache",
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    setSearchResults(data.results);
  };
  return (
    <div className="py-5 flex">
      <div className="w-1/4 ">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold">字形検索</h2>
          <form action="#" onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">作成ユーザー</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                ref={userRef}
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">関連漢字</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                ref={relatedRef}
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">含める字形名</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                ref={containsRef}
              />
            </div>
            <div className="py-5 flex gap-5 ">
              <button className="btn btn-error">クリア</button>
              <input type="submit" className="btn btn-primary" value="検索" />
            </div>
          </form>
        </div>
      </div>

      <div className="w-3/4 px-5">
        <div className=" flex flex-wrap gap-1 items-start justify-start">
          {searchResults.map((result) => (
            <Card name={result.name} key={result.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
