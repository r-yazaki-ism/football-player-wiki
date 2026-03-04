"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-wide">
          ⚽ アマチュアサッカー選手名鑑
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <SearchBar />
          <Link href="/players" className="hover:underline text-sm">
            選手一覧
          </Link>
          <Link href="/teams" className="hover:underline text-sm">
            チーム一覧
          </Link>
          {session ? (
            <>
              <Link
                href="/players/new"
                className="bg-white text-blue-700 px-3 py-1 rounded text-sm font-semibold hover:bg-blue-50"
              >
                + 選手を追加
              </Link>
              <span className="text-sm">{session.user?.name}</span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm hover:underline"
              >
                ログアウト
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm hover:underline">
                ログイン
              </Link>
              <Link
                href="/register"
                className="bg-white text-blue-700 px-3 py-1 rounded text-sm font-semibold hover:bg-blue-50"
              >
                新規登録
              </Link>
            </>
          )}
        </div>

        {/* モバイルメニュー */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニューを開く"
        >
          <span className="text-2xl">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-blue-900 px-4 py-3 flex flex-col gap-3">
          <SearchBar />
          <Link href="/players" onClick={() => setMenuOpen(false)}>
            選手一覧
          </Link>
          <Link href="/teams" onClick={() => setMenuOpen(false)}>
            チーム一覧
          </Link>
          {session ? (
            <>
              <Link href="/players/new" onClick={() => setMenuOpen(false)}>
                + 選手を追加
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-left"
              >
                ログアウト ({session.user?.name})
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                ログイン
              </Link>
              <Link href="/register" onClick={() => setMenuOpen(false)}>
                新規登録
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
