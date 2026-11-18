import React, { useState, useEffect, useRef, useCallback } from 'react';

// ==========================================
// 1. 全100種類の食品メニューデータ
// ==========================================
interface FoodItem {
  id: number;
  name: string;
  kana: string;
  emoji: string;
  category: string;
}

const FOOD_MENU: FoodItem[] = [
  // 必須指定メニュー（5品）
  { id: 1, name: 'チーズカレー', kana: 'ちーずかれー', emoji: '🍛', category: 'カレー' },
  { id: 2, name: '牛丼', kana: 'ぎゅうどん', emoji: '🥩', category: '丼もの' },
  { id: 3, name: 'カルボナーラ', kana: 'かるぼなーら', emoji: '🍝', category: '麺類' },
  { id: 4, name: 'トマトシチュー', kana: 'とまとしちゅー', emoji: '🍲', category: '洋食' },
  { id: 5, name: '生姜焼き肉定食', kana: 'しょうがやきにくていしょく', emoji: '🍱', category: '定食' },

  // カレー・ライス系（10品）
  { id: 6, name: 'カツカレー', kana: 'かつかれー', emoji: '🍛', category: 'カレー' },
  { id: 7, name: 'バターチキンカレー', kana: 'ばたーちきんかれー', emoji: '🍛', category: 'カレー' },
  { id: 8, name: 'ドライカレー', kana: 'どらいかれー', emoji: '🍛', category: 'カレー' },
  { id: 9, name: 'グリーンカレー', kana: 'ぐりーんかれー', emoji: '🍛', category: 'カレー' },
  { id: 10, name: 'ハヤシライス', kana: 'はやしらいす', emoji: '🍛', category: '洋食' },
  { id: 11, name: 'オムライス', kana: 'おむらいす', emoji: '🍳', category: '洋食' },
  { id: 12, name: 'タコライス', kana: 'たこらいす', emoji: '🥗', category: '洋食' },
  { id: 13, name: 'チキンライス', kana: 'ちきんらいす', emoji: '🍚', category: '洋食' },
  { id: 14, name: 'エビピラフ', kana: 'えびぴらふ', emoji: '🍤', category: '洋食' },
  { id: 15, name: 'チャーハン', kana: 'ちゃーはん', emoji: '🍚', category: '中華' },

  // 丼もの（10品）
  { id: 16, name: '親子丼', kana: 'おやこどん', emoji: '🐔', category: '丼もの' },
  { id: 17, name: 'カツ丼', kana: 'かつどん', emoji: '🐷', category: '丼もの' },
  { id: 18, name: '天丼', kana: 'てんどん', emoji: '🍤', category: '丼もの' },
  { id: 19, name: '海鮮丼', kana: 'かいせんどん', emoji: '🐟', category: '丼もの' },
  { id: 20, name: 'うな丼', kana: 'うなどん', emoji: '🍱', category: '丼もの' },
  { id: 21, name: '豚丼', kana: 'ぶたどん', emoji: '🐷', category: '丼もの' },
  { id: 22, name: '中華丼', kana: 'ちゅうかどん', emoji: '🥬', category: '丼もの' },
  { id: 23, name: '鉄火丼', kana: 'てっかどん', emoji: '🍣', category: '丼もの' },
  { id: 24, name: 'ねぎとろ丼', kana: 'ねぎとろどん', emoji: '🐟', category: '丼もの' },
  { id: 25, name: 'ロコモコ丼', kana: 'ろこもこどん', emoji: '🍔', category: '丼もの' },

  // 麺類（18品）
  { id: 26, name: '醤油ラーメン', kana: 'しょうゆらーめん', emoji: '🍜', category: '麺類' },
  { id: 27, name: '味噌ラーメン', kana: 'みそらーめん', emoji: '🍜', category: '麺類' },
  { id: 28, name: 'とんこつラーメン', kana: 'とんこつらーめん', emoji: '🍜', category: '麺類' },
  { id: 29, name: '塩ラーメン', kana: 'しおらーめん', emoji: '🍜', category: '麺類' },
  { id: 30, name: 'つけ麺', kana: 'つけめん', emoji: '🍜', category: '麺類' },
  { id: 31, name: '担々麺', kana: 'たんたんめん', emoji: '🌶️', category: '麺類' },
  { id: 32, name: 'きつねうどん', kana: 'きつねうどん', emoji: '🍲', category: '麺類' },
  { id: 33, name: 'カレーうどん', kana: 'かれーうどん', emoji: '🍲', category: '麺類' },
  { id: 34, name: '鍋焼きうどん', kana: 'なべやきうどん', emoji: '🍲', category: '麺類' },
  { id: 35, name: 'ざるそば', kana: 'ざるそば', emoji: '🥢', category: '麺類' },
  { id: 36, name: '天ぷらそば', kana: 'てんぷらそば', emoji: '🍤', category: '麺類' },
  { id: 37, name: 'ナポリタン', kana: 'なぽりたん', emoji: '🍝', category: '麺類' },
  { id: 38, name: 'ペペロンチーノ', kana: 'ぺぺろんちーの', emoji: '🍝', category: '麺類' },
  { id: 39, name: 'ミートソース', kana: 'みーとそーす', emoji: '🍝', category: '麺類' },
  { id: 40, name: 'たらこスパゲッティ', kana: 'たらこすぱげってぃ', emoji: '🍝', category: '麺類' },
  { id: 41, name: 'ソース焼きそば', kana: 'そーすやきそば', emoji: '🥢', category: '麺類' },
  { id: 42, name: '冷やし中華', kana: 'ひやしちゅうか', emoji: '🥒', category: '麺類' },
  { id: 43, name: 'ちゃんぽん', kana: 'ちゃんぽん', emoji: '🍜', category: '麺類' },

  // 定食・和食（17品）
  { id: 44, name: '唐揚げ定食', kana: 'からあげていしょく', emoji: '🍗', category: '定食' },
  { id: 45, name: 'とんかつ定食', kana: 'とんかつていしょく', emoji: '🐷', category: '定食' },
  { id: 46, name: 'さばの味噌煮定食', kana: 'さばのみそにていしょく', emoji: '🐟', category: '定食' },
  { id: 47, name: '焼き魚定食', kana: 'やきざかなていしょく', emoji: '🐟', category: '定食' },
  { id: 48, name: 'チキン南蛮定食', kana: 'ちきんなんばんていしょく', emoji: '🍗', category: '定食' },
  { id: 49, name: '肉野菜炒め定食', kana: 'にくやさいいためっていしょく', emoji: '🥬', category: '定食' },
  { id: 50, name: 'アジフライ定食', kana: 'あじふらいていしょく', emoji: '🐟', category: '定食' },
  { id: 51, name: 'お寿司', kana: 'おすし', emoji: '🍣', category: '和食' },
  { id: 52, name: 'おにぎり', kana: 'おにぎり', emoji: '🍙', category: '和食' },
  { id: 53, name: 'お茶漬け', kana: 'おちゃづけ', emoji: '🍵', category: '和食' },
  { id: 54, name: 'すき焼き', kana: 'すきやき', emoji: '🍲', category: '和食' },
  { id: 55, name: 'しゃぶしゃぶ', kana: 'しゃぶしゃぶ', emoji: '🥩', category: '和食' },
  { id: 56, name: 'おでん', kana: 'おでん', emoji: '🍢', category: '和食' },
  { id: 57, name: '肉じゃが', kana: 'にくじゃが', emoji: '🥔', category: '和食' },
  { id: 58, name: '茶碗蒸し', kana: 'ちゃわんむし', emoji: '🥚', category: '和食' },
  { id: 59, name: 'だし巻き卵', kana: 'だしまきたまご', emoji: '🥚', category: '和食' },
  { id: 60, name: 'たこ焼き', kana: 'たこやき', emoji: '🐙', category: '和食' },

  // 洋食・中華・アジア（18品）
  { id: 61, name: 'ハンバーグ', kana: 'はんばーぐ', emoji: '🍖', category: '洋食' },
  { id: 62, name: 'チーズハンバーグ', kana: 'ちーずはんばーぐ', emoji: '🧀', category: '洋食' },
  { id: 63, name: 'ビーフシチュー', kana: 'びーふしちゅー', emoji: '🍲', category: '洋食' },
  { id: 64, name: 'クリームシチュー', kana: 'くりーむしちゅー', emoji: '🥣', category: '洋食' },
  { id: 65, name: 'マカロニグラタン', kana: 'まかろにぐらたん', emoji: '🧀', category: '洋食' },
  { id: 66, name: 'ドリア', kana: 'どりあ', emoji: '🥘', category: '洋食' },
  { id: 67, name: 'ロールキャベツ', kana: 'ろーるきゃべつ', emoji: '🥬', category: '洋食' },
  { id: 68, name: 'エビフライ', kana: 'えびふらい', emoji: '🍤', category: '洋食' },
  { id: 69, name: 'コロッケ', kana: 'ころっけ', emoji: '🥔', category: '洋食' },
  { id: 70, name: 'メンチカツ', kana: 'めんちかつ', emoji: '🍖', category: '洋食' },
  { id: 71, name: 'ポトフ', kana: 'ぽとふ', emoji: '🥕', category: '洋食' },
  { id: 72, name: '焼き餃子', kana: 'やきぎょうざ', emoji: '🥟', category: '中華' },
  { id: 73, name: '水餃子', kana: 'すいぎょうざ', emoji: '🥟', category: '中華' },
  { id: 74, name: '麻婆豆腐', kana: 'まーぼーどうふ', emoji: '🌶️', category: '中華' },
  { id: 75, name: 'エビチリ', kana: 'えびちり', emoji: '🦐', category: '中華' },
  { id: 76, name: '酢豚', kana: 'すぶた', emoji: '🍖', category: '中華' },
  { id: 77, name: '春巻き', kana: 'はるまき', emoji: '🥢', category: '中華' },
  { id: 78, name: '小籠包', kana: 'しょうろんぽう', emoji: '🥟', category: '中華' },

  // パン・軽食（10品）
  { id: 79, name: 'ハンバーガー', kana: 'はんばーがー', emoji: '🍔', category: '軽食' },
  { id: 80, name: 'チーズバーガー', kana: 'ちーずばーがー', emoji: '🍔', category: '軽食' },
  { id: 81, name: 'ホットドッグ', kana: 'ほっとどっぐ', emoji: '🌭', category: '軽食' },
  { id: 82, name: 'サンドイッチ', kana: 'さんどいっち', emoji: '🥪', category: 'パン' },
  { id: 83, name: 'たまごサンド', kana: 'たまごさんど', emoji: '🥪', category: 'パン' },
  { id: 84, name: 'カツサンド', kana: 'かつさんど', emoji: '🥪', category: 'パン' },
  { id: 85, name: 'クロワッサン', kana: 'くろわっさん', emoji: '🥐', category: 'パン' },
  { id: 86, name: 'メロンパン', kana: 'めろんぱん', emoji: '🍈', category: 'パン' },
  { id: 87, name: 'カレーパン', kana: 'かれーぱん', emoji: '🥖', category: 'パン' },
  { id: 88, name: 'マルゲリータピザ', kana: 'まるげりーたぴざ', emoji: '🍕', category: '軽食' },

  // スイーツ（12品）
  { id: 89, name: 'ショートケーキ', kana: 'しょーとけーき', emoji: '🍰', category: 'スイーツ' },
  { id: 90, name: 'チーズケーキ', kana: 'ちーずけーき', emoji: '🧀', category: 'スイーツ' },
  { id: 91, name: 'チョコレートケーキ', kana: 'ちょこれーとけーき', emoji: '🍫', category: 'スイーツ' },
  { id: 92, name: 'モンブラン', kana: 'もんぶらん', emoji: '🌰', category: 'スイーツ' },
  { id: 93, name: 'パンケーキ', kana: 'ぱんけーき', emoji: '🥞', category: 'スイーツ' },
  { id: 94, name: 'シュークリーム', kana: 'しゅーくりーむ', emoji: '🥯', category: 'スイーツ' },
  { id: 95, name: 'カスタードプリン', kana: 'かすたーどぷりん', emoji: '🍮', category: 'スイーツ' },
  { id: 96, name: 'いちごパフェ', kana: 'いちごぱふぇ', emoji: '🍨', category: 'スイーツ' },
  { id: 97, name: 'ティラミス', kana: 'てぃらみす', emoji: '☕', category: 'スイーツ' },
  { id: 98, name: 'アップルパイ', kana: 'あっぷるぱい', emoji: '🥧', category: 'スイーツ' },
  { id: 99, name: 'フルーツタルト', kana: 'ふるーつたると', emoji: '🍓', category: 'スイーツ' },
  { id: 100, name: 'みたらし団子', kana: 'みたらしだんご', emoji: '🍡', category: 'スイーツ' },
];

// ==========================================
// 2. 日本語ローマ字柔軟判定エンジン
// ==========================================
const ROMAJI_TABLE: Record<string, string[]> = {
  'あ': ['a'], 'い': ['i', 'yi'], 'う': ['u', 'wu', 'whu'], 'え': ['e'], 'お': ['o'],
  'か': ['ka', 'ca'], 'き': ['ki'], 'く': ['ku', 'cu', 'qu'], 'け': ['ke'], 'こ': ['ko', 'co'],
  'さ': ['sa'], 'し': ['si', 'shi', 'ci'], 'す': ['su'], 'せ': ['se', 'ce'], 'そ': ['so'],
  'た': ['ta'], 'ち': ['ti', 'chi'], 'つ': ['tu', 'tsu'], 'て': ['te'], 'と': ['to'],
  'な': ['na'], 'に': ['ni'], 'ぬ': ['nu'], 'ね': ['ne'], 'の': ['no'],
  'は': ['ha'], 'ひ': ['hi'], 'ふ': ['hu', 'fu'], 'へ': ['he'], 'ほ': ['ho'],
  'ま': ['ma'], 'み': ['mi'], 'む': ['mu'], 'め': ['me'], 'も': ['mo'],
  'や': ['ya'], 'ゆ': ['yu'], 'よ': ['yo'],
  'ら': ['ra'], 'り': ['ri'], 'る': ['ru'], 'れ': ['re'], 'ろ': ['ro'],
  'わ': ['wa'], 'を': ['wo'], 'ん': ['nn', 'n\'', 'xn'],
  'ー': ['-'],
  'が': ['ga'], 'ぎ': ['gi'], 'ぐ': ['gu'], 'げ': ['ge'], 'ご': ['go'],
  'ざ': ['za'], 'じ': ['zi', 'ji'], 'ず': ['zu'], 'ぜ': ['ze'], 'ぞ': ['zo'],
  'だ': ['da'], 'ぢ': ['di'], 'づ': ['du'], 'で': ['de'], 'ど': ['do'],
  'ば': ['ba'], 'び': ['bi'], 'ぶ': ['bu'], 'べ': ['be'], 'ぼ': ['bo'],
  'ぱ': ['pa'], 'ぴ': ['pi'], 'ぷ': ['pu'], 'ぺ': ['pe'], 'ぽ': ['po'],
  'ぁ': ['la', 'xa'], 'ぃ': ['li', 'xi', 'lyi', 'xyi'], 'ぅ': ['lu', 'xu'], 'ぇ': ['le', 'xe', 'lye', 'xye'], 'ぉ': ['lo', 'xo'],
  'ゃ': ['lya', 'xya'], 'ゅ': ['lyu', 'xyu'], 'ょ': ['lyo', 'xyo'],
  'っ': ['ltu', 'xtu', 'ltsu'], 'ゎ': ['lwa', 'xwa'],
  'きゃ': ['kya'], 'きぃ': ['kyi'], 'きゅ': ['kyu'], 'きぇ': ['kye'], 'きょ': ['kyo'],
  'しゃ': ['sya', 'sha'], 'しぃ': ['syi'], 'しゅ': ['syu', 'shu'], 'しぇ': ['sye', 'she'], 'しょ': ['syo', 'sho'],
  'ちゃ': ['tya', 'cha', 'cya'], 'ちぃ': ['tyi', 'cyi'], 'ちゅ': ['tyu', 'chu', 'cyu'], 'ちょ': ['tyo', 'cho', 'cyo'],
  'にゃ': ['nya'], 'にぃ': ['nyi'], 'にゅ': ['nyu'], 'にぇ': ['nye'], 'にょ': ['nyo'],
  'ひゃ': ['hya'], 'ひぃ': ['hyi'], 'ひゅ': ['hyu'], 'ひぇ': ['hye'], 'ひょ': ['hyo'],
  'みゃ': ['mya'], 'みぃ': ['myi'], 'みゅ': ['myu'], 'みぇ': ['mye'], 'みょ': ['myo'],
  'りゃ': ['rya'], 'りぃ': ['ryi'], 'りゅ': ['ryu'], 'りぇ': ['rye'], 'りょ': ['ryo'],
  'ぎゃ': ['gya'], 'ぎぃ': ['gyi'], 'ぎゅ': ['gyu'], 'ぎぇ': ['gye'], 'ぎょ': ['gyo'],
  'じゃ': ['zya', 'ja', 'jya'], 'じぃ': ['zyi', 'jyi'], 'じゅ': ['zyu', 'ju', 'jyu'], 'じょ': ['zyo', 'jo', 'jyo'],
  'ぢゃ': ['dya'], 'ぢぃ': ['dyi'], 'ぢゅ': ['dyu'], 'ぢぇ': ['dye'], 'ぢょ': ['dyo'],
  'びゃ': ['bya'], 'びぃ': ['byi'], 'びゅ': ['byu'], 'びぇ': ['bye'], 'びょ': ['byo'],
  'ぴゃ': ['pya'], 'ぴぃ': ['pyi'], 'ぴゅ': ['pyu'], 'ぴぇ': ['pye'], 'ぴょ': ['pyo'],
  'ふぁ': ['fa', 'fwa'], 'ふぃ': ['fi', 'fwi', 'fyi'], 'ふぇ': ['fe', 'fwe', 'fye'], 'ふぉ': ['fo', 'fwo'], 'ふゅ': ['fyu'],
  'てぃ': ['thi', 't\'i'], 'てゅ': ['thu'], 'でぃ': ['dhi', 'd\'i'], 'でゅ': ['dhu'],
  'とぅ': ['twu'], 'どぅ': ['dwu'],
  'うぃ': ['wi', 'whi'], 'うぇ': ['we', 'whe'], 'うぉ': ['who'],
  'ヴ': ['vu'], 'ヴぁ': ['va'], 'ヴぃ': ['vi'], 'ヴぇ': ['ve'], 'ヴぉ': ['vo'],
  'くぁ': ['qa', 'kwa'], 'くぃ': ['qi', 'kwi'], 'くぇ': ['qe', 'kwe'], 'くぉ': ['qo', 'kwo'],
};

interface KanaChunk {
  kana: string;
  patterns: string[];
  activePattern: string;
  typedInChunk: string;
}

function parseKanaToChunks(kanaStr: string): KanaChunk[] {
  const chunks: KanaChunk[] = [];
  let i = 0;

  while (i < kanaStr.length) {
    const current = kanaStr[i];
    const next = kanaStr[i + 1] || '';
    const twoChars = current + next;

    if (current === 'っ') {
      if (next) {
        const afterNext = kanaStr[i + 2] || '';
        const nextTwo = next + afterNext;
        let nextPatterns: string[] = [];
        let consumed = 1;

        if (ROMAJI_TABLE[nextTwo]) {
          nextPatterns = ROMAJI_TABLE[nextTwo];
          consumed = 2;
        } else if (ROMAJI_TABLE[next]) {
          nextPatterns = ROMAJI_TABLE[next];
          consumed = 1;
        }

        const doubledPatterns: string[] = [];
        nextPatterns.forEach((pat) => {
          const firstChar = pat[0];
          if (firstChar && !['a', 'i', 'u', 'e', 'o', 'n', '-'].includes(firstChar)) {
            doubledPatterns.push(firstChar + pat);
          }
        });

        const ltuPatterns: string[] = [];
        ['ltu', 'xtu'].forEach((prefix) => {
          nextPatterns.forEach((pat) => ltuPatterns.push(prefix + pat));
        });

        const allPatterns = Array.from(new Set([...doubledPatterns, ...ltuPatterns]));
        if (allPatterns.length > 0) {
          chunks.push({
            kana: current + (consumed === 2 ? nextTwo : next),
            patterns: allPatterns,
            activePattern: allPatterns[0],
            typedInChunk: '',
          });
          i += 1 + consumed;
          continue;
        }
      }
      const fallback = ['ltu', 'xtu'];
      chunks.push({
        kana: current,
        patterns: fallback,
        activePattern: fallback[0],
        typedInChunk: '',
      });
      i += 1;
      continue;
    }

    if (current === 'ん') {
      const nextPatterns = next
        ? ROMAJI_TABLE[next + (kanaStr[i + 2] || '')] || ROMAJI_TABLE[next] || []
        : [];
      const canUseSingleN =
        next !== '' &&
        nextPatterns.length > 0 &&
        nextPatterns.every((p) => !['a', 'i', 'u', 'e', 'o', 'y', 'n'].includes(p[0]));

      const patterns = canUseSingleN ? ['n', 'nn', "n'", 'xn'] : ['nn', "n'", 'xn'];
      chunks.push({
        kana: current,
        patterns,
        activePattern: patterns[0],
        typedInChunk: '',
      });
      i += 1;
      continue;
    }

    if (next && ROMAJI_TABLE[twoChars]) {
      const patterns = ROMAJI_TABLE[twoChars];
      chunks.push({
        kana: twoChars,
        patterns,
        activePattern: patterns[0],
        typedInChunk: '',
      });
      i += 2;
      continue;
    }

    const patterns = ROMAJI_TABLE[current] || [current];
    chunks.push({
      kana: current,
      patterns,
      activePattern: patterns[0],
      typedInChunk: '',
    });
    i += 1;
  }

  return chunks;
}

// ==========================================
// 3. メインコンポーネント (App)
// ==========================================
type GameScreen = 'start' | 'countdown' | 'playing' | 'result';
const GAME_DURATION = 60;
const POINTS_PER_WORD = 10;

export default function App() {
  const [screen, setScreen] = useState<GameScreen>('start');
  const [countdown, setCountdown] = useState<number>(3);
  const [timeLeft, setTimeLeft] = useState<number>(GAME_DURATION);
  const [score, setScore] = useState<number>(0);
  const [clearedCount, setClearedCount] = useState<number>(0);
  const [missCount, setMissCount] = useState<number>(0);
  const [totalValidKeystrokes, setTotalValidKeystrokes] = useState<number>(0);

  const [currentFood, setCurrentFood] = useState<FoodItem>(FOOD_MENU[0]);
  const [chunks, setChunks] = useState<KanaChunk[]>([]);
  const [chunkIndex, setChunkIndex] = useState<number>(0);

  const [isMissShake, setIsMissShake] = useState<boolean>(false);
  const [lastClearFlash, setLastClearFlash] = useState<boolean>(false);
  const [lastTypedChar, setLastTypedChar] = useState<string | null>(null);

  const lastFoodIdRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  const pickNextFood = useCallback(() => {
    let candidates = FOOD_MENU;
    if (lastFoodIdRef.current !== null && FOOD_MENU.length > 1) {
      candidates = FOOD_MENU.filter((item) => item.id !== lastFoodIdRef.current);
    }
    const nextItem = candidates[Math.floor(Math.random() * candidates.length)];
    lastFoodIdRef.current = nextItem.id;

    setCurrentFood(nextItem);
    setChunks(parseKanaToChunks(nextItem.kana));
    setChunkIndex(0);
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setClearedCount(0);
    setMissCount(0);
    setTotalValidKeystrokes(0);
    setTimeLeft(GAME_DURATION);
    setIsMissShake(false);
    setLastClearFlash(false);
    setLastTypedChar(null);
    setCountdown(3);
    pickNextFood();
    setScreen('countdown');
  }, [pickNextFood]);

  useEffect(() => {
    if (screen !== 'countdown') return;

    const cdTimer = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(cdTimer);
          setScreen('playing');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(cdTimer);
  }, [screen]);

  useEffect(() => {
    if (screen !== 'playing') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setScreen('result');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [screen]);

  const processKeyInput = useCallback(
    (rawKey: string) => {
      if (screen !== 'playing') return;
      if (rawKey.length !== 1) return;
      const char = rawKey.toLowerCase();
      if (!/^[a-z0-9\-']$/.test(char)) return;

      setLastTypedChar(char.toUpperCase());

      const currentChunk = chunks[chunkIndex];
      if (!currentChunk) return;

      const candidateTyped = currentChunk.typedInChunk + char;
      const matchedPattern = currentChunk.patterns.find((p) => p.startsWith(candidateTyped));

      if (matchedPattern) {
        setTotalValidKeystrokes((prev) => prev + 1);
        const updatedChunks = [...chunks];
        updatedChunks[chunkIndex] = {
          ...currentChunk,
          activePattern: matchedPattern,
          typedInChunk: candidateTyped,
        };

        if (candidateTyped === matchedPattern) {
          if (chunkIndex + 1 >= chunks.length) {
            setScore((prev) => prev + POINTS_PER_WORD);
            setClearedCount((prev) => prev + 1);
            setLastClearFlash(true);
            setTimeout(() => setLastClearFlash(false), 300);
            pickNextFood();
            return;
          } else {
            setChunks(updatedChunks);
            setChunkIndex(chunkIndex + 1);
          }
        } else {
          setChunks(updatedChunks);
        }
      } else {
        if (
          currentChunk.kana === 'ん' &&
          currentChunk.typedInChunk === 'n' &&
          currentChunk.patterns.includes('n') &&
          chunkIndex + 1 < chunks.length
        ) {
          const nextChunk = chunks[chunkIndex + 1];
          const nextMatched = nextChunk.patterns.find((p) => p.startsWith(char));
          if (nextMatched) {
            setTotalValidKeystrokes((prev) => prev + 1);
            const updatedChunks = [...chunks];
            updatedChunks[chunkIndex] = { ...currentChunk, activePattern: 'n', typedInChunk: 'n' };
            updatedChunks[chunkIndex + 1] = { ...nextChunk, activePattern: nextMatched, typedInChunk: char };

            if (char === nextMatched) {
              if (chunkIndex + 2 >= chunks.length) {
                setScore((prev) => prev + POINTS_PER_WORD);
                setClearedCount((prev) => prev + 1);
                setLastClearFlash(true);
                setTimeout(() => setLastClearFlash(false), 300);
                pickNextFood();
                return;
              } else {
                setChunks(updatedChunks);
                setChunkIndex(chunkIndex + 2);
                return;
              }
            } else {
              setChunks(updatedChunks);
              setChunkIndex(chunkIndex + 1);
              return;
            }
          }
        }

        setMissCount((prev) => prev + 1);
        setIsMissShake(false);
        requestAnimationFrame(() => {
          setIsMissShake(true);
        });
      }
    },
    [screen, chunks, chunkIndex, pickNextFood]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        startGame();
        return;
      }

      if (screen === 'start' || screen === 'result') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          startGame();
        }
        return;
      }

      if (screen === 'countdown') {
        return;
      }

      if (screen === 'playing') {
        if (e.key === ' ') {
          e.preventDefault();
        }
        if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key.length === 1) {
          processKeyInput(e.key);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen, startGame, processKeyInput]);

  const renderRomajiDisplay = () => {
    let typedAll = '';
    let remainingAll = '';

    chunks.forEach((chunk, idx) => {
      if (idx < chunkIndex) {
        typedAll += chunk.activePattern;
      } else if (idx === chunkIndex) {
        typedAll += chunk.typedInChunk;
        remainingAll += chunk.activePattern.slice(chunk.typedInChunk.length);
      } else {
        remainingAll += chunk.activePattern;
      }
    });

    return (
      <div className="font-mono tracking-wider select-none flex flex-wrap justify-center items-center min-h-[2.75rem] px-3 py-2 rounded-2xl bg-[#FFFDF7] border-2 border-[#EED9C4] shadow-inner">
        <span className="text-[#2E8B6E] bg-[#D4F1E8] px-2 py-0.5 rounded-lg font-bold text-[clamp(1.2rem,3.5vw,1.8rem)]">
          {typedAll}
        </span>
        {remainingAll.length > 0 && (
          <span className="text-[clamp(1.2rem,3.5vw,1.8rem)] font-semibold text-[#4A3F35] ml-1">
            <span className="underline decoration-[#F4A2B8] decoration-4 underline-offset-4 text-[#C84B6E] font-bold">
              {remainingAll[0]}
            </span>
            <span className="opacity-75">{remainingAll.slice(1)}</span>
          </span>
        )}
      </div>
    );
  };

  const keysPerSecond = (totalValidKeystrokes / GAME_DURATION).toFixed(2);
  const accuracy =
    totalValidKeystrokes + missCount > 0
      ? Math.round((totalValidKeystrokes / (totalValidKeystrokes + missCount)) * 100)
      : 100;

  return (
    <div
      className="min-h-screen w-full bg-[#FFFDF7] text-[#4A3F35] flex flex-col items-center justify-between p-3 sm:p-6 selection:bg-[#FADADD] selection:text-[#4A3F35]"
      style={{
        backgroundImage:
          'radial-gradient(#F3E5D0 1.2px, transparent 1.2px), radial-gradient(#FADADD 1.2px, #FFFDF7 1.2px)',
        backgroundSize: '36px 36px',
        backgroundPosition: '0 0, 18px 18px',
        fontFamily:
          '"Hiragino Maru Gothic ProN", "Rounded Mplus 1c", "Yu Gothic", "Meiryo", sans-serif',
      }}
    >
      <style>{`
        @keyframes gentleShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-7px); }
          40% { transform: translateX(7px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        .animate-miss-shake {
          animation: gentleShake 0.28s ease-in-out;
        }
        @keyframes popSuccess {
          0% { transform: scale(0.97); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        .animate-pop-success {
          animation: popSuccess 0.28s ease-out;
        }
        @keyframes countPop {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-count-pop {
          animation: countPop 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>

      {/* ヘッダー */}
      <header className="w-full max-w-3xl flex items-center justify-between py-2.5 px-4 rounded-full bg-[#FAF4E6]/90 backdrop-blur-sm border-2 border-[#EED9C4] shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍽️</span>
          <h1 className="text-lg sm:text-2xl font-extrabold text-[#4A3F35]">もぐもぐタイピング</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex text-xs font-bold px-3 py-1 rounded-full bg-[#FFF3B0] text-[#6B5636] border border-[#E8D58E]">
            全100メニュー
          </span>
          {(screen === 'playing' || screen === 'countdown') && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                startGame();
              }}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full bg-[#FADADD] hover:bg-[#F6C4CA] text-[#5C3A3E] border border-[#EAB5BC] transition-all cursor-pointer shadow-xs"
            >
              🔄 リセット
            </button>
          )}
        </div>
      </header>

      {/* メイン */}
      <main className="w-full max-w-3xl flex-1 flex flex-col items-center justify-center my-4">
        {screen === 'start' && (
          <div className="w-full bg-[#FAF4E6] border-4 border-[#EED9C4] rounded-[2rem] p-6 sm:p-10 shadow-lg text-center flex flex-col items-center">
            <div className="flex items-center justify-center gap-3 text-3xl sm:text-5xl mb-4">
              <span className="bg-[#FADADD] p-3 rounded-2xl">🍛</span>
              <span className="bg-[#FFF3B0] p-3 rounded-2xl">🍝</span>
              <span className="bg-[#D4F1E8] p-3 rounded-2xl">🍱</span>
            </div>

            <h2 className="text-[clamp(1.5rem,4vw,2.3rem)] font-extrabold text-[#4A3F35] mb-2">
              おいしいメニューを早打ちしよう！
            </h2>
            <p className="text-sm sm:text-base text-[#7A6A58] mb-6 max-w-lg leading-relaxed">
              制限時間60秒！チーズカレーや牛丼など全100種類の美味しい料理がランダムに出題されます。
              <br />
              正解するごとに10点加点！
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl mb-8">
              <div className="bg-[#FFFDF7] border-2 border-[#FADADD] rounded-2xl p-3.5 flex flex-col items-center">
                <span className="text-xl mb-1">⏱️</span>
                <span className="text-xs font-bold text-[#8C7A6B]">制限時間</span>
                <span className="text-xl font-extrabold text-[#4A3F35]">60秒</span>
              </div>
              <div className="bg-[#FFFDF7] border-2 border-[#D4F1E8] rounded-2xl p-3.5 flex flex-col items-center">
                <span className="text-xl mb-1">✨</span>
                <span className="text-xs font-bold text-[#8C7A6B]">スコア</span>
                <span className="text-xl font-extrabold text-[#4A3F35]">1品 +10点</span>
              </div>
              <div className="bg-[#FFFDF7] border-2 border-[#E6E0F8] rounded-2xl p-3.5 flex flex-col items-center">
                <span className="text-xl mb-1">🍱</span>
                <span className="text-xs font-bold text-[#8C7A6B]">出題テーマ</span>
                <span className="text-xl font-extrabold text-[#4A3F35]">食品 100種</span>
              </div>
            </div>

            <button
              type="button"
              onClick={startGame}
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[#D4F1E8] hover:bg-[#BFE8DB] active:scale-95 text-[#255C4B] font-extrabold text-lg sm:text-xl border-2 border-[#9AD6C3] shadow-md transition-all cursor-pointer"
            >
              ▶ スタートする
            </button>
            <p className="mt-3 text-xs font-bold text-[#8C7A6B]">※ Enterキー または Spaceキー でも開始できます</p>
          </div>
        )}

        {screen === 'countdown' && (
          <div className="w-full bg-[#FAF4E6] border-4 border-[#EED9C4] rounded-[2rem] p-8 sm:p-14 shadow-lg text-center flex flex-col items-center justify-center min-h-[320px]">
            <span className="px-4 py-1.5 rounded-full bg-[#FFF3B0] border border-[#E8D58E] text-[#6B5636] text-sm font-extrabold mb-6">
              ⌨️ ホームポジションに指を置いてね！
            </span>
            <div
              key={countdown}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#FFFDF7] border-4 border-[#FADADD] shadow-md flex items-center justify-center animate-count-pop mb-6"
            >
              <span className="text-6xl sm:text-7xl font-extrabold text-[#D9657B]">{countdown}</span>
            </div>
            <p className="text-base sm:text-lg font-extrabold text-[#4A3F35]">まもなくスタート…</p>
          </div>
        )}

        {screen === 'playing' && (
          <div className="w-full flex flex-col gap-4">
            <div className="w-full bg-[#FAF4E6] border-2 border-[#EED9C4] rounded-3xl p-4 shadow-sm">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-3">
                <div className="bg-[#FFFDF7] border border-[#FADADD] rounded-2xl p-2.5 sm:p-3 flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-[#8C7A6B]">⏳ 残り時間</span>
                  <span className={`text-xl sm:text-3xl font-extrabold ${timeLeft <= 10 ? 'text-[#D6455D] animate-pulse' : 'text-[#4A3F35]'}`}>
                    {timeLeft}<span className="text-xs sm:text-sm ml-0.5">秒</span>
                  </span>
                </div>
                <div className="bg-[#FFFDF7] border border-[#FFF3B0] rounded-2xl p-2.5 sm:p-3 flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-[#8C7A6B]">🏆 スコア</span>
                  <span className="text-xl sm:text-3xl font-extrabold text-[#4A3F35]">
                    {score}<span className="text-xs sm:text-sm ml-0.5">点</span>
                  </span>
                </div>
                <div className="bg-[#FFFDF7] border border-[#D4F1E8] rounded-2xl p-2.5 sm:p-3 flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-[#8C7A6B]">🍣 クリア品数</span>
                  <span className="text-xl sm:text-3xl font-extrabold text-[#4A3F35]">
                    {clearedCount}<span className="text-xs sm:text-sm ml-0.5">品</span>
                  </span>
                </div>
              </div>

              <div className="w-full h-3 bg-[#EFE6D5] rounded-full overflow-hidden p-0.5 border border-[#E2D3BC]">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-linear ${
                    timeLeft <= 10 ? 'bg-[#F497A7]' : timeLeft <= 25 ? 'bg-[#FFE07D]' : 'bg-[#8FD8C0]'
                  }`}
                  style={{ width: `${(timeLeft / GAME_DURATION) * 100}%` }}
                />
              </div>
            </div>

            <div
              onAnimationEnd={() => setIsMissShake(false)}
              className={`w-full bg-[#FAF4E6] border-4 rounded-[2rem] p-6 sm:p-10 shadow-md flex flex-col items-center justify-center text-center transition-colors duration-200 ${
                isMissShake
                  ? 'animate-miss-shake border-[#F497A7] bg-[#FFF5F6]'
                  : lastClearFlash
                  ? 'animate-pop-success border-[#8FD8C0] bg-[#F2FBF8]'
                  : 'border-[#EED9C4]'
              }`}
            >
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#E6E0F8] text-[#584A82] mb-3">
                {currentFood.category}
              </span>

              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#FFFDF7] border-2 border-[#EED9C4] flex items-center justify-center text-5xl sm:text-6xl shadow-xs mb-4 select-none">
                {currentFood.emoji}
              </div>

              <p className="text-sm sm:text-lg font-bold text-[#7A6A58] tracking-widest mb-1">{currentFood.kana}</p>
              <h2 className="text-[clamp(1.75rem,5vw,2.8rem)] font-extrabold text-[#4A3F35] tracking-wide mb-6 leading-tight">
                {currentFood.name}
              </h2>

              <div className="w-full max-w-xl">{renderRomajiDisplay()}</div>

              <div className="mt-5 flex items-center justify-center gap-4 text-xs font-bold text-[#8C7A6B]">
                <span>ミス: {missCount}回</span>
                {lastTypedChar && <span className="px-2.5 py-0.5 rounded-md bg-[#FFFDF7] border border-[#E2D3BC]">直前: {lastTypedChar}</span>}
              </div>
            </div>
          </div>
        )}

        {screen === 'result' && (
          <div className="w-full bg-[#FAF4E6] border-4 border-[#EED9C4] rounded-[2rem] p-6 sm:p-10 shadow-lg text-center flex flex-col items-center">
            <span className="px-4 py-1.5 rounded-full bg-[#FFF3B0] border border-[#E8D58E] text-[#6B5636] font-extrabold text-sm mb-3">
              🎉 タイムアップ！お疲れさまでした
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4A3F35] mb-6">今回のタイピング結果</h2>

            <div className="w-full max-w-md bg-[#FFFDF7] border-4 border-[#FADADD] rounded-3xl p-5 mb-6 shadow-xs">
              <span className="text-sm font-bold text-[#8C7A6B] block mb-1">最終スコア</span>
              <div className="text-5xl sm:text-6xl font-extrabold text-[#D9657B]">
                {score}<span className="text-xl sm:text-2xl ml-1 text-[#4A3F35]">点</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl mb-8">
              <div className="bg-[#FFFDF7] border-2 border-[#D4F1E8] rounded-2xl p-3.5 flex flex-col items-center">
                <span className="text-lg mb-1">🍱</span>
                <span className="text-xs font-bold text-[#8C7A6B]">クリア品数</span>
                <span className="text-xl font-extrabold text-[#4A3F35]">{clearedCount}品</span>
              </div>
              <div className="bg-[#FFFDF7] border-2 border-[#E6E0F8] rounded-2xl p-3.5 flex flex-col items-center">
                <span className="text-lg mb-1">⚡</span>
                <span className="text-xs font-bold text-[#8C7A6B]">平均速度</span>
                <span className="text-xl font-extrabold text-[#4A3F35]">{keysPerSecond}打/秒</span>
              </div>
              <div className="bg-[#FFFDF7] border-2 border-[#FADADD] rounded-2xl p-3.5 flex flex-col items-center">
                <span className="text-lg mb-1">💦</span>
                <span className="text-xs font-bold text-[#8C7A6B]">ミスタイプ</span>
                <span className="text-xl font-extrabold text-[#4A3F35]">{missCount}回</span>
              </div>
              <div className="bg-[#FFFDF7] border-2 border-[#FFF3B0] rounded-2xl p-3.5 flex flex-col items-center">
                <span className="text-lg mb-1">🎯</span>
                <span className="text-xs font-bold text-[#8C7A6B]">正確率</span>
                <span className="text-xl font-extrabold text-[#4A3F35]">{accuracy}%</span>
              </div>
            </div>

            <button
              type="button"
              onClick={startGame}
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[#FADADD] hover:bg-[#F5C2C8] active:scale-95 text-[#5C3A3E] font-extrabold text-lg sm:text-xl border-2 border-[#E8ACB3] shadow-md transition-all cursor-pointer"
            >
              🔄 もう一度遊ぶ
            </button>
            <p className="mt-3 text-xs font-bold text-[#8C7A6B]">※ Enterキー または Spaceキー でもリトライできます</p>
          </div>
        )}
      </main>

      <footer className="w-full max-w-3xl text-center py-2 text-xs font-bold text-[#9C8A78]">
        キーボードでローマ字を入力してください（やり直し：Escキー）
      </footer>
    </div>
  );
}