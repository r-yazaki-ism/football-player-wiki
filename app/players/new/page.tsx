import PlayerForm from "@/components/PlayerForm";

export default function NewPlayerPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">選手を新規登録</h1>
      <PlayerForm mode="create" />
    </div>
  );
}
