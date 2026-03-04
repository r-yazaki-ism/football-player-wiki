"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { PlayerFormData, CareerInput } from "@/types/player";
import type { TeamSummary } from "@/types/team";
import { categoryLabel } from "@/types/labels";

type Props = {
  initialData?: Partial<PlayerFormData & { id: string }>;
  mode: "create" | "edit";
};

export default function PlayerForm({ initialData, mode }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [teams, setTeams] = useState<TeamSummary[]>([]);
  const [teamSearch, setTeamSearch] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamCategory, setNewTeamCategory] = useState("COLLEGE");
  const [newTeamCountry, setNewTeamCountry] = useState("日本");
  const [showAddTeam, setShowAddTeam] = useState(false);

  const [form, setForm] = useState<PlayerFormData>({
    nameJa: initialData?.nameJa || "",
    nameEn: initialData?.nameEn || "",
    nameKana: initialData?.nameKana || "",
    nationality: initialData?.nationality || "日本",
    birthday: initialData?.birthday || "",
    position: initialData?.position || "FW",
    currentTeamId: initialData?.currentTeamId || "",
    bio: initialData?.bio || "",
    careers: initialData?.careers || [],
    changeNote: "",
  });

  useEffect(() => {
    fetch("/api/teams")
      .then((r) => r.json())
      .then(setTeams)
      .catch(console.error);
  }, []);

  const filteredTeams = teamSearch
    ? teams.filter((t) =>
        t.name.toLowerCase().includes(teamSearch.toLowerCase())
      )
    : teams;

  const addCareer = () => {
    setForm((prev) => ({
      ...prev,
      careers: [
        ...prev.careers,
        { teamId: "", startYear: new Date().getFullYear(), endYear: null, notes: "" },
      ],
    }));
  };

  const removeCareer = (index: number) => {
    setForm((prev) => ({
      ...prev,
      careers: prev.careers.filter((_, i) => i !== index),
    }));
  };

  const updateCareer = (index: number, field: keyof CareerInput, value: string | number | null) => {
    setForm((prev) => ({
      ...prev,
      careers: prev.careers.map((c, i) =>
        i === index ? { ...c, [field]: value } : c
      ),
    }));
  };

  const handleAddTeam = async () => {
    if (!newTeamName) return;
    const res = await fetch("/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newTeamName,
        category: newTeamCategory,
        country: newTeamCountry,
      }),
    });
    if (res.ok) {
      const team = await res.json();
      setTeams((prev) => [...prev, team]);
      setNewTeamName("");
      setShowAddTeam(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url =
      mode === "create" ? "/api/players" : `/api/players/${initialData?.id}`;
    const method = mode === "create" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const player = await res.json();
      router.push(`/players/${player.id}`);
    } else {
      const data = await res.json();
      setError(data.error || "エラーが発生しました");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 rounded p-3 text-sm">
          {error}
        </div>
      )}

      {/* 基本情報 */}
      <section className="bg-white rounded-lg border border-gray-200 p-5">
        <h2 className="font-bold text-gray-700 mb-4 text-lg">基本情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              選手名（日本語）<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.nameJa}
              onChange={(e) => setForm({ ...form, nameJa: e.target.value })}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="山田 太郎"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ふりがな
            </label>
            <input
              type="text"
              value={form.nameKana}
              onChange={(e) => setForm({ ...form, nameKana: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="やまだ たろう"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              選手名（英語）
            </label>
            <input
              type="text"
              value={form.nameEn}
              onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="Taro Yamada"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              国籍
            </label>
            <input
              type="text"
              value={form.nationality}
              onChange={(e) => setForm({ ...form, nationality: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="日本"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              生年月日
            </label>
            <input
              type="date"
              value={form.birthday}
              onChange={(e) => setForm({ ...form, birthday: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ポジション<span className="text-red-500">*</span>
            </label>
            <select
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="GK">GK（ゴールキーパー）</option>
              <option value="DF">DF（ディフェンダー）</option>
              <option value="MF">MF（ミッドフィルダー）</option>
              <option value="FW">FW（フォワード）</option>
            </select>
          </div>
        </div>
      </section>

      {/* 現所属チーム */}
      <section className="bg-white rounded-lg border border-gray-200 p-5">
        <h2 className="font-bold text-gray-700 mb-4 text-lg">現所属チーム</h2>
        <input
          type="text"
          placeholder="チーム名で絞り込み"
          value={teamSearch}
          onChange={(e) => setTeamSearch(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        <select
          value={form.currentTeamId}
          onChange={(e) => setForm({ ...form, currentTeamId: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          <option value="">（所属チームなし）</option>
          {filteredTeams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}（{categoryLabel[t.category] || t.category}）
              {t.country !== "日本" ? ` / ${t.country}` : ""}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setShowAddTeam(!showAddTeam)}
          className="mt-2 text-sm text-sky-600 hover:underline"
        >
          + チームが見つからない場合はここをクリック
        </button>
        {showAddTeam && (
          <div className="mt-3 p-3 bg-gray-50 rounded border border-gray-200 space-y-2">
            <input
              type="text"
              placeholder="チーム名"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <select
                value={newTeamCategory}
                onChange={(e) => setNewTeamCategory(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="COLLEGE">大学</option>
                <option value="HIGH_SCHOOL">高校</option>
                <option value="MIDDLE_SCHOOL">中学</option>
                <option value="AMATEUR">アマチュア</option>
              </select>
              <input
                type="text"
                placeholder="国（例: 日本）"
                value={newTeamCountry}
                onChange={(e) => setNewTeamCountry(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <button
              type="button"
              onClick={handleAddTeam}
              className="bg-slate-800 text-white px-4 py-2 rounded text-sm hover:bg-slate-700"
            >
              チームを追加
            </button>
          </div>
        )}
      </section>

      {/* 経歴 */}
      <section className="bg-white rounded-lg border border-gray-200 p-5">
        <h2 className="font-bold text-gray-700 mb-4 text-lg">経歴</h2>
        <div className="space-y-3">
          {form.careers.map((career, i) => (
            <div key={i} className="p-3 bg-gray-50 rounded border border-gray-200">
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">チーム</label>
                  <select
                    value={career.teamId}
                    onChange={(e) => updateCareer(i, "teamId", e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value="">チームを選択</option>
                    {teams.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}（{categoryLabel[t.category]}）
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">開始年</label>
                    <input
                      type="number"
                      value={career.startYear}
                      onChange={(e) => updateCareer(i, "startYear", parseInt(e.target.value))}
                      min="1900"
                      max="2099"
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">終了年</label>
                    <input
                      type="number"
                      value={career.endYear || ""}
                      onChange={(e) =>
                        updateCareer(i, "endYear", e.target.value ? parseInt(e.target.value) : null)
                      }
                      min="1900"
                      max="2099"
                      placeholder="現在"
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              </div>
              <input
                type="text"
                value={career.notes}
                onChange={(e) => updateCareer(i, "notes", e.target.value)}
                placeholder="メモ（例: 主将、得点王など）"
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              />
              <button
                type="button"
                onClick={() => removeCareer(i)}
                className="mt-2 text-red-500 text-xs hover:underline"
              >
                この経歴を削除
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addCareer}
          className="mt-3 text-sm text-sky-600 border border-slate-800 px-3 py-1 rounded hover:bg-sky-50"
        >
          + 経歴を追加
        </button>
      </section>

      {/* 特徴・説明 */}
      <section className="bg-white rounded-lg border border-gray-200 p-5">
        <h2 className="font-bold text-gray-700 mb-4 text-lg">特徴・プロフィール</h2>
        <textarea
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          rows={5}
          placeholder="選手の特徴、プレースタイル、実績などを自由に記述してください"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      </section>

      {/* 編集メモ */}
      <section className="bg-white rounded-lg border border-gray-200 p-5">
        <h2 className="font-bold text-gray-700 mb-2 text-base">編集メモ（任意）</h2>
        <input
          type="text"
          value={form.changeNote}
          onChange={(e) => setForm({ ...form, changeNote: e.target.value })}
          placeholder="何を変更したか簡潔に記入（例: 移籍情報を更新）"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      </section>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-800 text-white px-6 py-2 rounded font-semibold hover:bg-slate-700 disabled:opacity-50"
        >
          {loading ? "保存中..." : mode === "create" ? "選手を登録" : "変更を保存"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-50"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
