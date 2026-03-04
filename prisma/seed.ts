import { PrismaClient, Category, Position, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // テストユーザー作成
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@soccer-wiki.jp" },
    update: {},
    create: {
      email: "admin@soccer-wiki.jp",
      name: "管理者",
      passwordHash: await bcrypt.hash("password123", 10),
      role: Role.ADMIN,
    },
  });

  const testUser = await prisma.user.upsert({
    where: { email: "test@soccer-wiki.jp" },
    update: {},
    create: {
      email: "test@soccer-wiki.jp",
      name: "テストユーザー",
      passwordHash: await bcrypt.hash("password123", 10),
      role: Role.USER,
    },
  });

  // ===== チーム作成（既存サンプル） =====
  await Promise.all([
    prisma.team.upsert({
      where: { id: "team-urawa" },
      update: {},
      create: {
        id: "team-urawa",
        name: "浦和レッズ",
        country: "日本",
        league: "Jリーグ1部",
        category: Category.PRO,
      },
    }),
    prisma.team.upsert({
      where: { id: "team-gamba" },
      update: {},
      create: {
        id: "team-gamba",
        name: "ガンバ大阪",
        country: "日本",
        league: "Jリーグ1部",
        category: Category.PRO,
      },
    }),
    prisma.team.upsert({
      where: { id: "team-realma" },
      update: {},
      create: {
        id: "team-realma",
        name: "レアル・マドリード",
        country: "スペイン",
        league: "ラ・リーガ",
        category: Category.PRO,
      },
    }),
    prisma.team.upsert({
      where: { id: "team-samplehs" },
      update: {},
      create: {
        id: "team-samplehs",
        name: "サンプル高校",
        country: "日本",
        league: "全国高校サッカー選手権",
        category: Category.HIGH_SCHOOL,
      },
    }),
    prisma.team.upsert({
      where: { id: "team-samplems" },
      update: {},
      create: {
        id: "team-samplems",
        name: "サンプル中学校",
        country: "日本",
        league: "全国中学校サッカー大会",
        category: Category.MIDDLE_SCHOOL,
      },
    }),
  ]);

  // ===== チーム作成（高校カテゴリ） =====
  await Promise.all([
    prisma.team.upsert({
      where: { id: "team-shizuokagakuen" },
      update: {},
      create: {
        id: "team-shizuokagakuen",
        name: "静岡学園",
        country: "日本",
        league: "全国高校サッカー選手権",
        category: Category.HIGH_SCHOOL,
      },
    }),
    prisma.team.upsert({
      where: { id: "team-yokohama-fm-y" },
      update: {},
      create: {
        id: "team-yokohama-fm-y",
        name: "横浜F・マリノスユース",
        country: "日本",
        league: "Jリーグ U-18",
        category: Category.CLUB_YOUTH_U18,
      },
    }),
    prisma.team.upsert({
      where: { id: "team-kashima-y" },
      update: {},
      create: {
        id: "team-kashima-y",
        name: "鹿島アントラーズユース",
        country: "日本",
        league: "Jリーグ U-18",
        category: Category.CLUB_YOUTH_U18,
      },
    }),
    prisma.team.upsert({
      where: { id: "team-nisshogakuen" },
      update: {},
      create: {
        id: "team-nisshogakuen",
        name: "日章学園",
        country: "日本",
        league: "全国高校サッカー選手権",
        category: Category.HIGH_SCHOOL,
      },
    }),
    prisma.team.upsert({
      where: { id: "team-gamba-y" },
      update: {},
      create: {
        id: "team-gamba-y",
        name: "ガンバ大阪ユース",
        country: "日本",
        league: "Jリーグ U-18",
        category: Category.CLUB_YOUTH_U18,
      },
    }),
    prisma.team.upsert({
      where: { id: "team-higashiyama" },
      update: {},
      create: {
        id: "team-higashiyama",
        name: "東山",
        country: "日本",
        league: "全国高校サッカー選手権",
        category: Category.HIGH_SCHOOL,
      },
    }),
    prisma.team.upsert({
      where: { id: "team-urawa-y" },
      update: {},
      create: {
        id: "team-urawa-y",
        name: "浦和レッズユース",
        country: "日本",
        league: "Jリーグ U-18",
        category: Category.CLUB_YOUTH_U18,
      },
    }),
    prisma.team.upsert({
      where: { id: "team-tohokugakuin" },
      update: {},
      create: {
        id: "team-tohokugakuin",
        name: "東北学院",
        country: "日本",
        league: "全国高校サッカー選手権",
        category: Category.HIGH_SCHOOL,
      },
    }),
  ]);

  // ===== チーム作成（中学カテゴリ） =====
  await Promise.all([
    prisma.team.upsert({
      where: { id: "team-shizuokagakuen-j" },
      update: {},
      create: {
        id: "team-shizuokagakuen-j",
        name: "静岡学園中",
        country: "日本",
        category: Category.MIDDLE_SCHOOL,
      },
    }),
    prisma.team.upsert({
      where: { id: "team-yokohama-fm-jy" },
      update: {},
      create: {
        id: "team-yokohama-fm-jy",
        name: "横浜FMジュニアユース",
        country: "日本",
        category: Category.CLUB_YOUTH_U15,
      },
    }),
    prisma.team.upsert({
      where: { id: "team-kashima-jy" },
      update: {},
      create: {
        id: "team-kashima-jy",
        name: "鹿島アントラーズジュニアユース",
        country: "日本",
        category: Category.CLUB_YOUTH_U15,
      },
    }),
    prisma.team.upsert({
      where: { id: "team-nisshogakuen-j" },
      update: {},
      create: {
        id: "team-nisshogakuen-j",
        name: "日章学園中",
        country: "日本",
        category: Category.MIDDLE_SCHOOL,
      },
    }),
    prisma.team.upsert({
      where: { id: "team-gamba-jy" },
      update: {},
      create: {
        id: "team-gamba-jy",
        name: "ガンバ大阪ジュニアユース",
        country: "日本",
        category: Category.CLUB_YOUTH_U15,
      },
    }),
    prisma.team.upsert({
      where: { id: "team-kyoto-sanga-u15" },
      update: {},
      create: {
        id: "team-kyoto-sanga-u15",
        name: "京都サンガF.C. U-15",
        country: "日本",
        category: Category.CLUB_YOUTH_U15,
      },
    }),
    prisma.team.upsert({
      where: { id: "team-urawa-jy" },
      update: {},
      create: {
        id: "team-urawa-jy",
        name: "浦和レッズジュニアユース",
        country: "日本",
        category: Category.CLUB_YOUTH_U15,
      },
    }),
    prisma.team.upsert({
      where: { id: "team-fctokyo-u15" },
      update: {},
      create: {
        id: "team-fctokyo-u15",
        name: "FC東京U-15深川",
        country: "日本",
        category: Category.CLUB_YOUTH_U15,
      },
    }),
    prisma.team.upsert({
      where: { id: "team-vegalta-jy" },
      update: {},
      create: {
        id: "team-vegalta-jy",
        name: "ベガルタ仙台ジュニアユース",
        country: "日本",
        category: Category.CLUB_YOUTH_U15,
      },
    }),
  ]);

  // ===== 既存サンプル選手 =====
  await prisma.player.upsert({
    where: { id: "player-yamada" },
    update: {},
    create: {
      id: "player-yamada",
      nameJa: "山田 太郎",
      nameEn: "Taro Yamada",
      nameKana: "やまだ たろう",
      nationality: "日本",
      birthday: new Date("1995-04-15"),
      position: Position.FW,
      currentTeamId: "team-urawa",
      bio: "浦和レッズのエースストライカー。スピードと決定力を兼ね備えた日本代表クラスのフォワード。",
    },
  });

  await prisma.player.upsert({
    where: { id: "player-tanaka" },
    update: {},
    create: {
      id: "player-tanaka",
      nameJa: "田中 健二",
      nameEn: "Kenji Tanaka",
      nameKana: "たなか けんじ",
      nationality: "日本",
      birthday: new Date("2006-08-20"),
      position: Position.MF,
      currentTeamId: "team-samplehs",
      bio: "サンプル高校の司令塔。視野の広さとパスセンスが光る次世代の才能。",
    },
  });

  // ===== 実データ10選手（koko-soccer.com より） =====

  // 1. 青木 豪琉（静岡学園 DF 2年）
  await prisma.player.upsert({
    where: { id: "player-aoki-goryu" },
    update: {},
    create: {
      id: "player-aoki-goryu",
      nameJa: "青木 豪琉",
      nameKana: "あおき ごうりゅう",
      nationality: "日本",
      position: Position.DF,
      currentTeamId: "team-shizuokagakuen",
      bio: "静岡学園の2年生DF。静岡学園中出身の生え抜き選手。",
    },
  });

  // 2. 浅田 大翔（横浜F・マリノスユース MF 3年）
  await prisma.player.upsert({
    where: { id: "player-asada-taisho" },
    update: {},
    create: {
      id: "player-asada-taisho",
      nameJa: "浅田 大翔",
      nameKana: "あさだ たいしょう",
      nationality: "日本",
      birthday: new Date("2008-01-16"),
      position: Position.MF,
      currentTeamId: "team-yokohama-fm-y",
      bio: "身長180cm・体重77kgの大型MF。U-15(2023)、U-16(2024)、U-17(2025)と日本代表に連続選出。来季横浜F・マリノスへのトップ昇格が決定している注目選手。",
    },
  });

  // 3. 朝比奈 叶和（鹿島アントラーズユース DF 3年）
  await prisma.player.upsert({
    where: { id: "player-asahina-yowa" },
    update: {},
    create: {
      id: "player-asahina-yowa",
      nameJa: "朝比奈 叶和",
      nameKana: "あさひな ようわ",
      nationality: "日本",
      birthday: new Date("2007-07-15"),
      position: Position.DF,
      currentTeamId: "team-kashima-y",
      bio: "身長177cm・体重69kgの鹿島アントラーズユース3年DF。鹿島アントラーズジュニアユース出身の生え抜き選手。",
    },
  });

  // 4. 秋鷹 青杜（日章学園 FW 1年）
  await prisma.player.upsert({
    where: { id: "player-akitaka-aoto" },
    update: {},
    create: {
      id: "player-akitaka-aoto",
      nameJa: "秋鷹 青杜",
      nameKana: "あきたか あおと",
      nationality: "日本",
      birthday: new Date("2009-07-02"),
      position: Position.FW,
      currentTeamId: "team-nisshogakuen",
      bio: "身長177cm・体重70kg。日章学園の1年生FWながら2025年U-16日本代表に選出された将来有望な選手。",
    },
  });

  // 5. 阿児 尚哉（ガンバ大阪ユース DF 3年）
  await prisma.player.upsert({
    where: { id: "player-ako-naoya" },
    update: {},
    create: {
      id: "player-ako-naoya",
      nameJa: "阿児 尚哉",
      nameKana: "あこ なおや",
      nationality: "日本",
      birthday: new Date("2007-04-30"),
      position: Position.DF,
      currentTeamId: "team-gamba-y",
      bio: "身長170cm・体重62kgのガンバ大阪ユース3年DF。ガンバ大阪ジュニアユース出身の生え抜き選手。",
    },
  });

  // 6. 麻生 太朗（東山 GK 2年）
  await prisma.player.upsert({
    where: { id: "player-aso-taro" },
    update: {},
    create: {
      id: "player-aso-taro",
      nameJa: "麻生 太朗",
      nameKana: "あそう たろう",
      nationality: "日本",
      birthday: new Date("2008-05-08"),
      position: Position.GK,
      currentTeamId: "team-higashiyama",
      bio: "身長183cm・体重82kgの東山2年GK。京都サンガF.C. U-15出身。全国屈指の強豪・東山高校の守護神。",
    },
  });

  // 7. 阿部 湧心（浦和レッズユース MF 3年）
  await prisma.player.upsert({
    where: { id: "player-abe-yushin" },
    update: {},
    create: {
      id: "player-abe-yushin",
      nameJa: "阿部 湧心",
      nameKana: "あべ ゆうしん",
      nationality: "日本",
      birthday: new Date("2007-07-19"),
      position: Position.MF,
      currentTeamId: "team-urawa-y",
      bio: "キックとスピードが武器の浦和レッズユース3年MF。元日本代表MF阿部勇樹氏の長男として注目を集める。トップチーム昇格が期待されるスピードスター。",
    },
  });

  // 8. 荒木 琉偉（ガンバ大阪ユース GK 3年）
  await prisma.player.upsert({
    where: { id: "player-araki-ryui" },
    update: {},
    create: {
      id: "player-araki-ryui",
      nameJa: "荒木 琉偉",
      nameKana: "あらき りゅうい",
      nationality: "日本",
      birthday: new Date("2007-10-14"),
      position: Position.GK,
      currentTeamId: "team-gamba-y",
      bio: "身長191cm・体重80kgの大型GK。U-15(2022)からU-21(2026)まで複数世代の日本代表に選出された逸材。ガンバ大阪と仮契約（2種登録）済みで来季のトップ昇格が内定している。",
    },
  });

  // 9. 有竹 拓海（静岡学園 GK 3年）
  await prisma.player.upsert({
    where: { id: "player-aritake-takumi" },
    update: {},
    create: {
      id: "player-aritake-takumi",
      nameJa: "有竹 拓海",
      nameKana: "ありたけ たくみ",
      nationality: "日本",
      birthday: new Date("2007-12-01"),
      position: Position.GK,
      currentTeamId: "team-shizuokagakuen",
      bio: "身長184cm・体重79kgの静岡学園3年GK。埼玉県出身でFC東京U-15深川から静岡学園へ。2024年選手権では無失点での活躍により8強入りに貢献。2025年U-17日本高校選抜に選出。",
    },
  });

  // 10. 壱岐 翼（東北学院 DF 3年）
  await prisma.player.upsert({
    where: { id: "player-iki-tsubasa" },
    update: {},
    create: {
      id: "player-iki-tsubasa",
      nameJa: "壱岐 翼",
      nameKana: "いき つばさ",
      nationality: "日本",
      birthday: new Date("2007-12-19"),
      position: Position.DF,
      currentTeamId: "team-tohokugakuin",
      bio: "身長176cm・体重68kgの東北学院3年DF。積極的な攻撃参加がうりのSBで、2024年の選手権ではゲームチェンジャーとして活躍した。ベガルタ仙台ジュニアユース出身。",
    },
  });

  // ===== 経歴（既存サンプル） =====
  await prisma.career.createMany({
    skipDuplicates: true,
    data: [
      { playerId: "player-yamada", teamId: "team-samplems", startYear: 2007, endYear: 2010, notes: "U-13全国大会出場" },
      { playerId: "player-yamada", teamId: "team-samplehs", startYear: 2010, endYear: 2013, notes: "高校3年時に選手権準優勝" },
      { playerId: "player-yamada", teamId: "team-gamba", startYear: 2013, endYear: 2018, notes: "J1リーグ優勝経験" },
      { playerId: "player-yamada", teamId: "team-urawa", startYear: 2018, notes: "現在も在籍" },
      { playerId: "player-tanaka", teamId: "team-samplems", startYear: 2019, endYear: 2022 },
      { playerId: "player-tanaka", teamId: "team-samplehs", startYear: 2022, notes: "現在も在籍" },
    ],
  });

  // ===== 経歴（実データ10選手） =====
  await prisma.career.createMany({
    skipDuplicates: true,
    data: [
      // 青木 豪琉
      { playerId: "player-aoki-goryu", teamId: "team-shizuokagakuen-j", startYear: 2021, endYear: 2024 },
      { playerId: "player-aoki-goryu", teamId: "team-shizuokagakuen", startYear: 2024, notes: "2年生（2026年現在）" },

      // 浅田 大翔
      { playerId: "player-asada-taisho", teamId: "team-yokohama-fm-jy", startYear: 2021, endYear: 2024, notes: "U-15日本代表(2023)" },
      { playerId: "player-asada-taisho", teamId: "team-yokohama-fm-y", startYear: 2024, notes: "U-16(2024)、U-17(2025)日本代表。来季トップ昇格決定" },

      // 朝比奈 叶和
      { playerId: "player-asahina-yowa", teamId: "team-kashima-jy", startYear: 2021, endYear: 2024 },
      { playerId: "player-asahina-yowa", teamId: "team-kashima-y", startYear: 2024, notes: "現在も在籍" },

      // 秋鷹 青杜
      { playerId: "player-akitaka-aoto", teamId: "team-nisshogakuen-j", startYear: 2022, endYear: 2025 },
      { playerId: "player-akitaka-aoto", teamId: "team-nisshogakuen", startYear: 2025, notes: "1年生。2025年U-16日本代表" },

      // 阿児 尚哉
      { playerId: "player-ako-naoya", teamId: "team-gamba-jy", startYear: 2021, endYear: 2024 },
      { playerId: "player-ako-naoya", teamId: "team-gamba-y", startYear: 2024, notes: "現在も在籍" },

      // 麻生 太朗
      { playerId: "player-aso-taro", teamId: "team-kyoto-sanga-u15", startYear: 2021, endYear: 2024 },
      { playerId: "player-aso-taro", teamId: "team-higashiyama", startYear: 2024, notes: "2年生（2026年現在）" },

      // 阿部 湧心
      { playerId: "player-abe-yushin", teamId: "team-urawa-jy", startYear: 2021, endYear: 2024, notes: "浦和レッズジュニアユース" },
      { playerId: "player-abe-yushin", teamId: "team-urawa-y", startYear: 2024, notes: "現在も在籍。トップ昇格期待" },

      // 荒木 琉偉
      { playerId: "player-araki-ryui", teamId: "team-gamba-jy", startYear: 2021, endYear: 2024, notes: "U-15日本代表(2022)" },
      { playerId: "player-araki-ryui", teamId: "team-gamba-y", startYear: 2024, notes: "U-21日本代表(2026)。仮契約済み" },

      // 有竹 拓海
      { playerId: "player-aritake-takumi", teamId: "team-fctokyo-u15", startYear: 2021, endYear: 2024, notes: "FC東京U-15深川" },
      { playerId: "player-aritake-takumi", teamId: "team-shizuokagakuen", startYear: 2024, notes: "2024年選手権8強。2025年U-17日本高校選抜" },

      // 壱岐 翼
      { playerId: "player-iki-tsubasa", teamId: "team-vegalta-jy", startYear: 2021, endYear: 2024 },
      { playerId: "player-iki-tsubasa", teamId: "team-tohokugakuin", startYear: 2024, notes: "2024年選手権でゲームチェンジャーとして活躍" },
    ],
  });

  // ===== 初期リビジョン =====
  // 既存選手
  await prisma.revision.createMany({
    skipDuplicates: true,
    data: [
      {
        playerId: "player-yamada",
        editorId: adminUser.id,
        snapshot: { nameJa: "山田 太郎", nameEn: "Taro Yamada", position: "FW", bio: "浦和レッズのエースストライカー。" },
        changeNote: "初期登録",
      },
      {
        playerId: "player-tanaka",
        editorId: testUser.id,
        snapshot: { nameJa: "田中 健二", position: "MF", bio: "サンプル高校の司令塔。" },
        changeNote: "初期登録",
      },
    ],
  });

  // 実データ10選手のリビジョン
  const realPlayers = [
    { id: "player-aoki-goryu", name: "青木 豪琉", pos: "DF" },
    { id: "player-asada-taisho", name: "浅田 大翔", pos: "MF" },
    { id: "player-asahina-yowa", name: "朝比奈 叶和", pos: "DF" },
    { id: "player-akitaka-aoto", name: "秋鷹 青杜", pos: "FW" },
    { id: "player-ako-naoya", name: "阿児 尚哉", pos: "DF" },
    { id: "player-aso-taro", name: "麻生 太朗", pos: "GK" },
    { id: "player-abe-yushin", name: "阿部 湧心", pos: "MF" },
    { id: "player-araki-ryui", name: "荒木 琉偉", pos: "GK" },
    { id: "player-aritake-takumi", name: "有竹 拓海", pos: "GK" },
    { id: "player-iki-tsubasa", name: "壱岐 翼", pos: "DF" },
  ];

  for (const p of realPlayers) {
    await prisma.revision.create({
      data: {
        playerId: p.id,
        editorId: adminUser.id,
        snapshot: { nameJa: p.name, position: p.pos, source: "koko-soccer.com" },
        changeNote: "koko-soccer.comより初期登録",
      },
    });
  }

  // ===== 大学チーム（COLLEGEカテゴリ） =====
  await Promise.all([
    prisma.team.upsert({
      where: { id: "team-waseda" },
      update: {},
      create: { id: "team-waseda", name: "早稲田大学", country: "日本", league: "関東大学サッカーリーグ1部", category: Category.COLLEGE },
    }),
    prisma.team.upsert({
      where: { id: "team-meiji" },
      update: {},
      create: { id: "team-meiji", name: "明治大学", country: "日本", league: "関東大学サッカーリーグ1部", category: Category.COLLEGE },
    }),
    prisma.team.upsert({
      where: { id: "team-hosei" },
      update: {},
      create: { id: "team-hosei", name: "法政大学", country: "日本", league: "関東大学サッカーリーグ1部", category: Category.COLLEGE },
    }),
    prisma.team.upsert({
      where: { id: "team-tsukuba" },
      update: {},
      create: { id: "team-tsukuba", name: "筑波大学", country: "日本", league: "関東大学サッカーリーグ1部", category: Category.COLLEGE },
    }),
  ]);

  // ===== 大学生選手100名（gekisaka.jp より） =====
  type CollegePlayer = {
    id: string;
    nameJa: string;
    nameKana: string;
    position: Position;
    currentTeamId: string;
    birthday?: Date;
    bio?: string;
  };

  const collegePlayers: CollegePlayer[] = [
    // ── 早稲田大学 (25名) ──
    { id: "col-48394", nameJa: "海本 慶太朗", nameKana: "かいもと けいたろう", position: Position.GK, currentTeamId: "team-waseda", birthday: new Date("2004-07-06"), bio: "身長189cm・82kg。大宮アルディージャU-15・U-18出身。U-19全日本大学選抜（イタリア遠征）、U-15日本代表経験。" },
    { id: "col-52661", nameJa: "佐久間 真寛", nameKana: "さくま まさひろ", position: Position.DF, currentTeamId: "team-waseda", birthday: new Date("2003-07-14"), bio: "身長181cm・78kg。藤枝東高出身の早稲田大DF。" },
    { id: "col-48110", nameJa: "川辺 球尊", nameKana: "かわべ きゅうと", position: Position.MF, currentTeamId: "team-waseda", birthday: new Date("2003-05-20"), bio: "身長164cm・64kg。大宮アルディージャJrユース・U-18出身の早稲田大MF。" },
    { id: "col-48409", nameJa: "西 凜誓", nameKana: "にし りんせい", position: Position.DF, currentTeamId: "team-waseda", birthday: new Date("2004-08-14"), bio: "身長174cm・68kg。名古屋グランパスU-15・U-18出身。U-15日本代表（2019年ブラジル遠征）経験。" },
    { id: "col-45842", nameJa: "石井 玲於奈", nameKana: "いしい れおな", position: Position.DF, currentTeamId: "team-waseda", birthday: new Date("2003-06-28"), bio: "身長172cm・71kg。FC東京U-15深川・U-18出身の早稲田大DF。U-15日本代表経験者。" },
    { id: "col-59049", nameJa: "網代 陽勇", nameKana: "あじろ ひゆう", position: Position.FW, currentTeamId: "team-waseda", birthday: new Date("2005-12-25"), bio: "身長178cm・70kg。尚志高出身。U-17日本高校選抜候補、U-18日本代表候補（2023年）選出。" },
    { id: "col-58695", nameJa: "瀧澤 暖", nameKana: "たきざわ だん", position: Position.FW, currentTeamId: "team-waseda", birthday: new Date("2003-09-02"), bio: "身長173cm・67kg。北海道コンサドーレ札幌U-18出身の早稲田大FW。" },
    { id: "col-48209", nameJa: "鈴木 大翔", nameKana: "すずき ひろと", position: Position.FW, currentTeamId: "team-waseda", birthday: new Date("2004-04-08"), bio: "身長180cm・73kg。ガンバ大阪ユース出身。U-15・U-16日本代表（2020年トルコ遠征）経験。" },
    { id: "col-48423", nameJa: "小笠原 幹太", nameKana: "おがさわら かんた", position: Position.GK, currentTeamId: "team-waseda" },
    { id: "col-49714", nameJa: "村田 新直", nameKana: "むらた あらなお", position: Position.GK, currentTeamId: "team-waseda" },
    { id: "col-60902", nameJa: "岡井 陶歩", nameKana: "おかい とうほ", position: Position.DF, currentTeamId: "team-waseda" },
    { id: "col-58967", nameJa: "金指 功汰", nameKana: "かなさし こうた", position: Position.DF, currentTeamId: "team-waseda" },
    { id: "col-58732", nameJa: "泉 新之助", nameKana: "いずみ しんのすけ", position: Position.DF, currentTeamId: "team-waseda" },
    { id: "col-62025", nameJa: "武沢 健伸", nameKana: "たけざわ けんしん", position: Position.DF, currentTeamId: "team-waseda" },
    { id: "col-67932", nameJa: "笹木 大史", nameKana: "ささき だいし", position: Position.DF, currentTeamId: "team-waseda" },
    { id: "col-55704", nameJa: "谷岡 拓", nameKana: "たにおか たく", position: Position.DF, currentTeamId: "team-waseda" },
    { id: "col-55551", nameJa: "小林 佳太", nameKana: "こばやし けいた", position: Position.DF, currentTeamId: "team-waseda" },
    { id: "col-64640", nameJa: "久米 遥太", nameKana: "くめ はるた", position: Position.MF, currentTeamId: "team-waseda" },
    { id: "col-62617", nameJa: "秋山 虎之亮", nameKana: "あきやま とらのすけ", position: Position.MF, currentTeamId: "team-waseda" },
    { id: "col-60622", nameJa: "高橋 作和", nameKana: "たかはし つくわ", position: Position.MF, currentTeamId: "team-waseda" },
    { id: "col-58484", nameJa: "西井 大翔", nameKana: "にしい ひろと", position: Position.MF, currentTeamId: "team-waseda" },
    { id: "col-58414", nameJa: "青柳 龍次郎", nameKana: "あおやぎ りゅうじろう", position: Position.MF, currentTeamId: "team-waseda" },
    { id: "col-58413", nameJa: "山田 皓生", nameKana: "やまだ こうき", position: Position.MF, currentTeamId: "team-waseda" },
    { id: "col-57558", nameJa: "谷川 宗士", nameKana: "たにかわ そうし", position: Position.MF, currentTeamId: "team-waseda" },
    { id: "col-48387", nameJa: "柏木 陽良", nameKana: "かしわぎ はるよし", position: Position.MF, currentTeamId: "team-waseda" },

    // ── 明治大学 (25名) ──
    { id: "col-48061", nameJa: "高橋 楓", nameKana: "たかはし かえで", position: Position.GK, currentTeamId: "team-meiji", birthday: new Date("2003-05-23"), bio: "身長183cm・78kg。鹿島アントラーズJrユース・ユース出身。2021年鹿島アントラーズ2種登録経験。" },
    { id: "col-47893", nameJa: "桒原 陸人", nameKana: "くわはら りくと", position: Position.DF, currentTeamId: "team-meiji", birthday: new Date("2005-01-21"), bio: "身長177cm・73kg。ガンバ大阪Jrユース・U-18出身。U-16からU-20まで複数世代の日本代表に選出された逸材。" },
    { id: "col-45205", nameJa: "森田 翔", nameKana: "もりた しょう", position: Position.DF, currentTeamId: "team-meiji", birthday: new Date("2003-07-06"), bio: "身長181cm・76kg。アルビレックス新潟U-15→FC東京U-18を経て明治大へ。U-15・U-16日本代表経験者。" },
    { id: "col-56105", nameJa: "高足 善", nameKana: "たかあし ぜん", position: Position.FW, currentTeamId: "team-meiji", birthday: new Date("2004-08-12"), bio: "身長158cm・58kg。前橋育英高出身。22年全国高校総体優勝・優秀選手。23年日本高校選抜選出の明治大FW。" },
    { id: "col-48407", nameJa: "小澤 晴樹", nameKana: "おざわ はるき", position: Position.DF, currentTeamId: "team-meiji", birthday: new Date("2004-04-18"), bio: "身長183cm・81kg。大宮アルディージャU-15・U-18出身。2022年大宮2種登録経験。" },
    { id: "col-58357", nameJa: "小泉 佳絃", nameKana: "こいずみ かいと", position: Position.DF, currentTeamId: "team-meiji", birthday: new Date("2005-04-19"), bio: "身長190cm・80kg。青森山田高出身の大型DF。全国高校選手権優勝・優秀選手。U-21日本代表として2026年U-23アジア杯出場。" },
    { id: "col-49053", nameJa: "田部 健斗", nameKana: "たべ けんと", position: Position.MF, currentTeamId: "team-meiji", birthday: new Date("2003-05-17"), bio: "身長165cm・61kg。広島皆実高出身の明治大MF。" },
    { id: "col-58540", nameJa: "濱崎 知康", nameKana: "はまざき ともやす", position: Position.GK, currentTeamId: "team-meiji" },
    { id: "col-59859", nameJa: "平塚 仁", nameKana: "ひらつか じん", position: Position.GK, currentTeamId: "team-meiji" },
    { id: "col-50748", nameJa: "森脇 真一", nameKana: "もりわき しんいち", position: Position.GK, currentTeamId: "team-meiji" },
    { id: "col-50750", nameJa: "稲垣 篤志", nameKana: "いながき あつし", position: Position.DF, currentTeamId: "team-meiji" },
    { id: "col-58267", nameJa: "川合 陽", nameKana: "かわい はる", position: Position.DF, currentTeamId: "team-meiji" },
    { id: "col-50776", nameJa: "大野 海翔", nameKana: "おおの かいと", position: Position.DF, currentTeamId: "team-meiji" },
    { id: "col-51122", nameJa: "内山 開翔", nameKana: "うちやま かいと", position: Position.DF, currentTeamId: "team-meiji" },
    { id: "col-60646", nameJa: "八巻 涼真", nameKana: "やまき りょうま", position: Position.DF, currentTeamId: "team-meiji" },
    { id: "col-50808", nameJa: "伊達 由太嘉", nameKana: "だて ゆたか", position: Position.DF, currentTeamId: "team-meiji" },
    { id: "col-53277", nameJa: "柴田 翔太郎", nameKana: "しばた しょうたろう", position: Position.DF, currentTeamId: "team-meiji" },
    { id: "col-52802", nameJa: "宇水 聖凌", nameKana: "うすい しょうりょう", position: Position.MF, currentTeamId: "team-meiji" },
    { id: "col-48166", nameJa: "小林 亮太", nameKana: "こばやし りょうた", position: Position.MF, currentTeamId: "team-meiji" },
    { id: "col-52816", nameJa: "熊谷 空大", nameKana: "くまがい そらひろ", position: Position.MF, currentTeamId: "team-meiji" },
    { id: "col-58729", nameJa: "坂上 輝", nameKana: "さかがみ ひかる", position: Position.FW, currentTeamId: "team-meiji" },
    { id: "col-58530", nameJa: "近野 伸大", nameKana: "こんの のぶひろ", position: Position.FW, currentTeamId: "team-meiji" },
    { id: "col-50454", nameJa: "前澤 拓城", nameKana: "まえざわ たくき", position: Position.FW, currentTeamId: "team-meiji" },
    { id: "col-52678", nameJa: "前田 隼希", nameKana: "まえだ はやき", position: Position.FW, currentTeamId: "team-meiji" },
    { id: "col-58623", nameJa: "庄司 啓太郎", nameKana: "しょうじ けいたろう", position: Position.FW, currentTeamId: "team-meiji" },

    // ── 法政大学 (25名) ──
    { id: "col-48079", nameJa: "梅津 龍之介", nameKana: "うめつ りゅうのすけ", position: Position.DF, currentTeamId: "team-hosei", birthday: new Date("2004-06-30"), bio: "身長182cm・75kg。鹿島アントラーズJrユース・ユース出身。デンソーカップ関東A選抜（2024・2025年度）選出。" },
    { id: "col-45839", nameJa: "大迫 蒼人", nameKana: "おおさこ あおと", position: Position.DF, currentTeamId: "team-hosei", birthday: new Date("2003-05-23"), bio: "身長173cm・74kg。FC東京U-15むさし・U-18出身の法政大DF。2019・2020年FC東京2種登録経験。" },
    { id: "col-45844", nameJa: "浅野 直希", nameKana: "あさの なおき", position: Position.MF, currentTeamId: "team-hosei", birthday: new Date("2003-04-21"), bio: "身長172cm・66kg。ガンバ大阪Jrユース・U-18出身。U-15日本代表（日ASEAN U-16大会・欧州遠征）経験。" },
    { id: "col-57991", nameJa: "諏訪部 隼", nameKana: "すわべ しゅん", position: Position.GK, currentTeamId: "team-hosei", birthday: new Date("2003-04-30"), bio: "身長184cm・79kg。法政大学第二高校から法政大へ。" },
    { id: "col-50749", nameJa: "藤澤 芭琉", nameKana: "ふじさわ はる", position: Position.GK, currentTeamId: "team-hosei", birthday: new Date("2004-11-19"), bio: "身長188cm・84kg。徳島市立高出身。U-17日本高校選抜（2021・2022年）、U-16日本代表候補（2020年）選出。" },
    { id: "col-49162", nameJa: "島崎 勝也", nameKana: "しまざき かつや", position: Position.DF, currentTeamId: "team-hosei", birthday: new Date("2003-05-05"), bio: "身長188cm・82kg。矢板中央高出身の大型DF。" },
    { id: "col-52523", nameJa: "小湊 絆", nameKana: "こみなと つな", position: Position.FW, currentTeamId: "team-hosei", birthday: new Date("2004-11-18"), bio: "身長178cm・76kg。横浜FCJrユース→青森山田高出身。2026-27シーズンFC東京加入内定。25年度FC東京特別指定選手（背番号25）。" },
    { id: "col-50773", nameJa: "川崎 淳", nameKana: "かわさき じゅん", position: Position.GK, currentTeamId: "team-hosei" },
    { id: "col-53045", nameJa: "畑野 優真", nameKana: "はたの ゆうま", position: Position.DF, currentTeamId: "team-hosei" },
    { id: "col-58448", nameJa: "佐藤 凛音", nameKana: "さとう りのん", position: Position.DF, currentTeamId: "team-hosei" },
    { id: "col-58402", nameJa: "熊谷 康正", nameKana: "くまがい やすまさ", position: Position.DF, currentTeamId: "team-hosei" },
    { id: "col-58577", nameJa: "長田 涼平", nameKana: "ながた りょうへい", position: Position.DF, currentTeamId: "team-hosei" },
    { id: "col-55295", nameJa: "櫻井 稜", nameKana: "さくらい りょう", position: Position.DF, currentTeamId: "team-hosei" },
    { id: "col-54525", nameJa: "八十島 陸翔", nameKana: "やそじま りくと", position: Position.DF, currentTeamId: "team-hosei" },
    { id: "col-53119", nameJa: "保田 成琉", nameKana: "ほんだ せいる", position: Position.DF, currentTeamId: "team-hosei" },
    { id: "col-62264", nameJa: "大久保 祐希", nameKana: "おおくぼ ゆうき", position: Position.MF, currentTeamId: "team-hosei" },
    { id: "col-59298", nameJa: "峯野 倖", nameKana: "みねの こう", position: Position.MF, currentTeamId: "team-hosei" },
    { id: "col-58616", nameJa: "池間 叶", nameKana: "いけま かなう", position: Position.MF, currentTeamId: "team-hosei" },
    { id: "col-53168", nameJa: "小池 直矢", nameKana: "こいけ なおや", position: Position.MF, currentTeamId: "team-hosei" },
    { id: "col-49200", nameJa: "松村 晃助", nameKana: "まつむら こうすけ", position: Position.MF, currentTeamId: "team-hosei" },
    { id: "col-50874", nameJa: "島田 春人", nameKana: "しまだ はると", position: Position.MF, currentTeamId: "team-hosei" },
    { id: "col-60540", nameJa: "菅原 太一", nameKana: "すがわら たいち", position: Position.FW, currentTeamId: "team-hosei" },
    { id: "col-58565", nameJa: "高橋 宗杜", nameKana: "たかはし むねと", position: Position.FW, currentTeamId: "team-hosei" },
    { id: "col-48080", nameJa: "馬目 隼乃介", nameKana: "まのめ はやのすけ", position: Position.FW, currentTeamId: "team-hosei" },
    { id: "col-52705", nameJa: "黒瀬 舜", nameKana: "くろせ しゅん", position: Position.MF, currentTeamId: "team-hosei" },

    // ── 筑波大学 (25名) ──
    { id: "col-51839", nameJa: "入江 倫平", nameKana: "いりえ りんぺい", position: Position.GK, currentTeamId: "team-tsukuba", birthday: new Date("2005-02-01"), bio: "身長186cm・80kg。桐蔭学園中・高出身の筑波大GK。" },
    { id: "col-46657", nameJa: "浦部 舜", nameKana: "うらべ しゅん", position: Position.DF, currentTeamId: "team-tsukuba", birthday: new Date("2001-05-25"), bio: "身長178cm・75kg。藤枝東高出身の筑波大DF。" },
    { id: "col-51044", nameJa: "小川 遼也", nameKana: "おがわ りょうや", position: Position.DF, currentTeamId: "team-tsukuba", birthday: new Date("2004-05-21"), bio: "身長184cm・84kg。富山U-18出身。デンソーカップ関東A選抜（2024・2025年度）選出。U-16・U-17日本代表候補。" },
    { id: "col-51046", nameJa: "小林 俊瑛", nameKana: "こばやし しゅんえい", position: Position.FW, currentTeamId: "team-tsukuba", birthday: new Date("2004-06-01"), bio: "身長190cm・85kg。大津高出身の大型FW。全国高校選手権準優勝・優秀選手。" },
    { id: "col-48410", nameJa: "池田 春汰", nameKana: "いけだ しゅんた", position: Position.DF, currentTeamId: "team-tsukuba", birthday: new Date("2005-04-03"), bio: "身長170cm・67kg。横浜F・マリノスJrユース・ユース出身。2023年横浜FM2種登録（背番号42）。" },
    { id: "col-66645", nameJa: "湯浅 雅紀", nameKana: "ゆあさ まさき", position: Position.GK, currentTeamId: "team-tsukuba" },
    { id: "col-67941", nameJa: "種田 逸真", nameKana: "たねだ いつま", position: Position.GK, currentTeamId: "team-tsukuba" },
    { id: "col-58672", nameJa: "五嶋 夏生", nameKana: "ごしま なつき", position: Position.DF, currentTeamId: "team-tsukuba" },
    { id: "col-61677", nameJa: "鈴木 遼", nameKana: "すずき りょう", position: Position.DF, currentTeamId: "team-tsukuba" },
    { id: "col-51064", nameJa: "安食 優斗", nameKana: "あじき ゆうと", position: Position.DF, currentTeamId: "team-tsukuba" },
    { id: "col-60899", nameJa: "普久原 陽平", nameKana: "ふくはら ようへい", position: Position.DF, currentTeamId: "team-tsukuba" },
    { id: "col-59977", nameJa: "布施 克真", nameKana: "ふせ かつま", position: Position.DF, currentTeamId: "team-tsukuba" },
    { id: "col-59075", nameJa: "黒瀬 直弥", nameKana: "くろせ なおや", position: Position.DF, currentTeamId: "team-tsukuba" },
    { id: "col-64716", nameJa: "宮崎 将吾", nameKana: "みやざき しょうご", position: Position.DF, currentTeamId: "team-tsukuba" },
    { id: "col-64335", nameJa: "栗原 大", nameKana: "くりはら だい", position: Position.DF, currentTeamId: "team-tsukuba" },
    { id: "col-52776", nameJa: "岡 航平", nameKana: "おか こうへい", position: Position.DF, currentTeamId: "team-tsukuba" },
    { id: "col-61703", nameJa: "小松 悠太", nameKana: "こまつ ゆうた", position: Position.MF, currentTeamId: "team-tsukuba" },
    { id: "col-52860", nameJa: "清水 大翔", nameKana: "しみず ひろと", position: Position.MF, currentTeamId: "team-tsukuba" },
    { id: "col-51702", nameJa: "篠田 翼", nameKana: "しのだ つばさ", position: Position.MF, currentTeamId: "team-tsukuba" },
    { id: "col-51117", nameJa: "宮野 陽貴", nameKana: "みやの ようき", position: Position.MF, currentTeamId: "team-tsukuba" },
    { id: "col-54684", nameJa: "佐野 健友", nameKana: "さの けんゆう", position: Position.MF, currentTeamId: "team-tsukuba" },
    { id: "col-54257", nameJa: "徳永 涼", nameKana: "とくなが りょう", position: Position.MF, currentTeamId: "team-tsukuba" },
    { id: "col-53799", nameJa: "矢田 龍之介", nameKana: "やた りゅうのすけ", position: Position.MF, currentTeamId: "team-tsukuba" },
    { id: "col-59857", nameJa: "大谷 湊斗", nameKana: "おおたに みなと", position: Position.MF, currentTeamId: "team-tsukuba" },
    { id: "col-58692", nameJa: "山下 景司", nameKana: "やました けいじ", position: Position.FW, currentTeamId: "team-tsukuba" },
  ];

  for (const p of collegePlayers) {
    await prisma.player.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        nameJa: p.nameJa,
        nameKana: p.nameKana,
        nationality: "日本",
        birthday: p.birthday ?? null,
        position: p.position,
        currentTeamId: p.currentTeamId,
        bio: p.bio ?? null,
      },
    });
  }

  // 大学生選手の経歴（在籍中）
  // 入学年 = 生年 + 19（日本の学制）、不明な場合は 2022 とする
  await prisma.career.createMany({
    skipDuplicates: true,
    data: collegePlayers.map((p) => ({
      playerId: p.id,
      teamId: p.currentTeamId,
      startYear: p.birthday ? p.birthday.getFullYear() + 19 : 2022,
    })),
  });

  // 大学生選手のリビジョン
  for (const p of collegePlayers) {
    await prisma.revision.create({
      data: {
        playerId: p.id,
        editorId: adminUser.id,
        snapshot: { nameJa: p.nameJa, position: p.position, team: p.currentTeamId },
        changeNote: "gekisaka.jpより初期登録",
      },
    });
  }

  // ===== 静岡県 2026年 高校生選手（koko-soccer.com/score/4271 より） =====

  // 追加チーム（静岡県）
  await Promise.all([
    prisma.team.upsert({
      where: { id: "team-hamamatsu-kaisei" },
      update: {},
      create: { id: "team-hamamatsu-kaisei", name: "浜松開誠館", country: "日本", league: "静岡県高校サッカー", category: Category.HIGH_SCHOOL },
    }),
    prisma.team.upsert({
      where: { id: "team-jubilo-y" },
      update: {},
      create: { id: "team-jubilo-y", name: "ジュビロ磐田U-18", country: "日本", league: "Jリーグ U-18", category: Category.CLUB_YOUTH_U18 },
    }),
    prisma.team.upsert({
      where: { id: "team-fujiitsu" },
      update: {},
      create: { id: "team-fujiitsu", name: "富士市立", country: "日本", league: "静岡県高校サッカー", category: Category.HIGH_SCHOOL },
    }),
    prisma.team.upsert({
      where: { id: "team-azul-y" },
      update: {},
      create: { id: "team-azul-y", name: "アスルクラロ沼津U-18", country: "日本", league: "静岡県高校サッカー", category: Category.CLUB_YOUTH_U18 },
    }),
  ]);

  // 静岡県選手データ（24名・青木豪琉・有竹拓海は既存のためスキップ）
  const shizuokaPlayers = [
    // ── 静岡学園 (20名) ──
    { id: "shiz-4468", nameJa: "飯尾 善", nameKana: null, position: Position.DF, teamId: "team-shizuokagakuen", grade: 2, bio: "大阪東淀川FC出身の静岡学園2年DF。" },
    { id: "shiz-4481", nameJa: "石井 陽人", nameKana: "いしい はると", position: Position.MF, teamId: "team-shizuokagakuen", grade: 2, bio: "千里丘FC出身の静岡学園2年MF。" },
    { id: "shiz-4470", nameJa: "泉 新", nameKana: null, position: Position.MF, teamId: "team-shizuokagakuen", birthday: new Date("2008-07-03"), grade: 2, bio: "身長172cm・63kg。静岡学園中出身の静岡学園2年MF。" },
    { id: "shiz-4304", nameJa: "上田 悠世", nameKana: "うえだ ゆうせい", position: Position.FW, teamId: "team-shizuokagakuen", birthday: new Date("2007-04-24"), grade: 3, bio: "身長175cm・65kg。千里丘FC出身の静岡学園3年FW。" },
    { id: "shiz-4469", nameJa: "小田切 楓佑", nameKana: "おだぎり かえゆう", position: Position.DF, teamId: "team-shizuokagakuen", grade: 2, bio: "Uスポーツクラブ出身の静岡学園2年DF。" },
    { id: "shiz-4471", nameJa: "加集 啓太", nameKana: "かしゅ けいた", position: Position.MF, teamId: "team-shizuokagakuen", birthday: new Date("2008-08-15"), grade: 2, bio: "身長173cm・62kg。プルミエール徳島SC出身の静岡学園2年MF。" },
    { id: "shiz-4408", nameJa: "神吉 俊之介", nameKana: null, position: Position.MF, teamId: "team-shizuokagakuen", birthday: new Date("2007-05-15"), grade: 3, bio: "身長177cm・69kg。神野SC出身の静岡学園3年生。" },
    { id: "shiz-4305", nameJa: "北田 優心", nameKana: "きただ ゆうしん", position: Position.MF, teamId: "team-shizuokagakuen", birthday: new Date("2007-05-20"), grade: 3, bio: "身長170cm・59kg。ガンバ大阪Jrユース出身の静岡学園3年MF。" },
    { id: "shiz-4476", nameJa: "斎田 侑輝", nameKana: "さいた ゆうき", position: Position.MF, teamId: "team-shizuokagakuen", grade: 2, bio: "静岡学園中出身の静岡学園2年MF。" },
    { id: "shiz-4473", nameJa: "坂本 健悟", nameKana: "さかもと けんご", position: Position.FW, teamId: "team-shizuokagakuen", birthday: new Date("2008-07-23"), grade: 2, bio: "身長184cm・74kg。大阪市ジュネッスFC出身の静岡学園2年FW。" },
    { id: "shiz-4307", nameJa: "佐々木 雄基", nameKana: "ささき ゆうき", position: Position.MF, teamId: "team-shizuokagakuen", birthday: new Date("2007-05-23"), grade: 3, bio: "身長180cm・71kg。川崎フロンターレU-15出身の静岡学園3年MF。" },
    { id: "shiz-4477", nameJa: "佐野 泰聖", nameKana: "さの たいせい", position: Position.MF, teamId: "team-shizuokagakuen", birthday: new Date("2009-03-21"), grade: 2, bio: "身長168cm・58kg。千里丘FC出身の静岡学園2年MF。" },
    { id: "shiz-4306", nameJa: "四海 星南", nameKana: null, position: Position.MF, teamId: "team-shizuokagakuen", birthday: new Date("2007-04-30"), grade: 3, bio: "身長163cm・58kg。FC東京U-15深川出身の静岡学園3年MF。" },
    { id: "shiz-4302", nameJa: "篠塚 怜音", nameKana: "しのづか れおん", position: Position.MF, teamId: "team-shizuokagakuen", birthday: new Date("2007-07-12"), grade: 3, bio: "身長169cm・62kg。ジェフユナイテッド千葉U-15出身の静岡学園3年MF。" },
    { id: "shiz-4478", nameJa: "野坂 啓人", nameKana: null, position: Position.DF, teamId: "team-shizuokagakuen", grade: 2, bio: "サンフレッチェ広島ジュニアユース出身の静岡学園2年DF。" },
    { id: "shiz-4467", nameJa: "林 奏汰", nameKana: "はやし そうた", position: Position.DF, teamId: "team-shizuokagakuen", birthday: new Date("2009-02-19"), grade: 2, bio: "身長181cm・70kg。グランパスみよしFC出身の静岡学園2年DF。" },
    { id: "shiz-4482", nameJa: "保延 昭良", nameKana: null, position: Position.DF, teamId: "team-shizuokagakuen", grade: 2, bio: "東急Sレイエス出身の静岡学園2年DF。" },
    { id: "shiz-4479", nameJa: "満身 晋乃介", nameKana: "まんみ しんのすけ", position: Position.GK, teamId: "team-shizuokagakuen", grade: 2, bio: "サンフレッチェ広島ジュニアユース出身の静岡学園2年GK。" },
    { id: "shiz-4475", nameJa: "村松 亮", nameKana: "むらまつ りょう", position: Position.MF, teamId: "team-shizuokagakuen", grade: 2, bio: "清水エスパルスジュニアユース出身の静岡学園2年MF。" },
    { id: "shiz-4474", nameJa: "安永 龍生", nameKana: null, position: Position.MF, teamId: "team-shizuokagakuen", grade: 2, bio: "FC東京むさし出身の静岡学園2年MF。" },
    // ── 他チーム ──
    { id: "shiz-3903", nameJa: "川合 亜門", nameKana: "かわあい あもん", position: Position.MF, teamId: "team-hamamatsu-kaisei", birthday: new Date("2007-05-25"), grade: 3, bio: "身長172cm・60kg。浜松開誠館中出身の浜松開誠館3年MF。" },
    { id: "shiz-4229", nameJa: "西岡 健斗", nameKana: "にしおか けんと", position: Position.MF, teamId: "team-jubilo-y", birthday: new Date("2008-07-14"), grade: 2, bio: "身長169cm・63kg。ジュビロ磐田U-18の2年MF。" },
    { id: "shiz-4327", nameJa: "山崎 絢心", nameKana: "やまざき あやこ", position: Position.FW, teamId: "team-fujiitsu", birthday: new Date("2007-06-25"), grade: 3, bio: "身長172cm・60kg。FC Fujiジュニアユース出身の富士市立3年。2025年U-17日本高校選抜選出。ドリブルと得点力が武器。" },
    { id: "shiz-4411", nameJa: "中野 遥翔", nameKana: null, position: Position.MF, teamId: "team-azul-y", birthday: new Date("2007-11-30"), grade: 3, bio: "身長179cm・68kg。アスルクラロ沼津U-15出身のU-18 3年MF。" },
  ];

  for (const p of shizuokaPlayers) {
    await prisma.player.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        nameJa: p.nameJa,
        nameKana: p.nameKana ?? null,
        nationality: "日本",
        birthday: p.birthday ?? null,
        position: p.position,
        currentTeamId: p.teamId,
        bio: p.bio ?? null,
      },
    });
  }

  // 経歴（高校在籍）
  await prisma.career.createMany({
    skipDuplicates: true,
    data: shizuokaPlayers.map((p) => ({
      playerId: p.id,
      teamId: p.teamId,
      startYear: p.grade === 3 ? 2023 : 2024,
    })),
  });

  // リビジョン
  for (const p of shizuokaPlayers) {
    await prisma.revision.create({
      data: {
        playerId: p.id,
        editorId: adminUser.id,
        snapshot: { nameJa: p.nameJa, position: p.position, team: p.teamId },
        changeNote: "koko-soccer.com/score/4271（静岡2026）より登録",
      },
    });
  }

  console.log("シードデータの投入が完了しました");
  console.log(`  - チーム: ${await prisma.team.count()}件`);
  console.log(`  - 選手: ${await prisma.player.count()}件`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
