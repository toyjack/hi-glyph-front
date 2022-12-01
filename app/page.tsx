import Link from 'next/link';
import Footer from './Footer'

export default function Home() {
  return (
    <div>
      <div className="hero min-h-screen bg-base-200 pt-1">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">字形サーバー</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <Link href={'glyphs'} className="btn btn-primary">開始</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
