export const categoryLabel: Record<string, string> = {
  COLLEGE: "大学",
  HIGH_SCHOOL: "高校",
  CLUB_YOUTH_U18: "クラブユースU-18",
  MIDDLE_SCHOOL: "中学",
  CLUB_YOUTH_U15: "クラブユースU-15",
  AMATEUR: "アマチュア",
};

export const categoryOrder = ["COLLEGE", "HIGH_SCHOOL", "CLUB_YOUTH_U18", "MIDDLE_SCHOOL", "CLUB_YOUTH_U15", "AMATEUR"] as const;

export const positionLabel: Record<string, string> = {
  GK: "GK",
  DF: "DF",
  MF: "MF",
  FW: "FW",
};

export const positionLabelFull: Record<string, string> = {
  GK: "GK（ゴールキーパー）",
  DF: "DF（ディフェンダー）",
  MF: "MF（ミッドフィルダー）",
  FW: "FW（フォワード）",
};

export const positionColor: Record<string, string> = {
  GK: "bg-yellow-100 text-yellow-800",
  DF: "bg-indigo-100 text-indigo-800",
  MF: "bg-sky-100 text-sky-800",
  FW: "bg-red-100 text-red-800",
};

export function getAge(birthday: Date | null): string {
  if (!birthday) return "-";
  const today = new Date();
  const birth = new Date(birthday);
  const age = today.getFullYear() - birth.getFullYear();
  const hasBirthdayPassed =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() >= birth.getDate());
  return `${hasBirthdayPassed ? age : age - 1}歳`;
}

export function formatBirthday(birthday: Date | null): string {
  if (!birthday) return "-";
  const d = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  if (
    today.getMonth() < d.getMonth() ||
    (today.getMonth() === d.getMonth() && today.getDate() < d.getDate())
  ) {
    age--;
  }
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${age}歳）`;
}
