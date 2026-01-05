import { Choice, FortuneResult } from './types';

export const CHOICES: Choice[] = [
  { id: 'c1', label: '全力投球', description: '目標に向かって走り抜けた一年', icon: '🏃' },
  { id: 'c2', label: '充実多忙', description: '忙しいけれど充実していた一年', icon: '✨' },
  { id: 'c3', label: '山あり谷あり', description: '良いことも大変なこともあった一年', icon: '🏔️' },
  { id: 'c4', label: '忍耐の年', description: 'じっと耐えて頑張り抜いた一年', icon: '🛡️' },
  { id: 'c5', label: '準備期間', description: '次への種まきをしていた一年', icon: '🌱' },
  { id: 'c6', label: '自分探し', description: '悩みながらも向き合い続けた一年', icon: '🤔' },
];

// In a real app, this would be fetched from Firestore.
// We mock the structure provided in the prompt.
export const FORTUNE_DATA: Record<string, FortuneResult[]> = {
  c1: [
    {
      fortune: "大吉",
      message: "今年は本当に頑張りましたね。その努力は、見えないところでしっかりと根を張り、やがて大きな花を咲かせる準備が整っています。",
      advice: "今日は自分自身に、最高のご褒美をあげてください。",
      lucky: "橙色 (オレンジ)",
      luckyColorCode: "#fb923c",
      action: "一番好きなお風呂入浴剤を使う",
      artKey: "happy_rabbit",
      music: "bright"
    },
    {
      fortune: "中吉",
      message: "走り抜けたあなたへ。そのスピード感と行動力が、周りの景色を変えてきました。素晴らしい推進力でした。",
      advice: "一度立ち止まって、深呼吸してみましょう。",
      lucky: "青緑 (ターコイズ)",
      luckyColorCode: "#2dd4bf",
      action: "空を見上げて雲を眺める",
      artKey: "running_horse",
      music: "bright"
    }
  ],
  c2: [
    {
      fortune: "労い吉",
      message: "目が回るような忙しさの中で、よくぞここまでやり切りました。あなたの責任感に、心からの拍手を。",
      advice: "「何もしない時間」をスケジュールに入れましょう。",
      lucky: "薄橙 (アプリコット)",
      luckyColorCode: "#fdba74",
      action: "温かい飲み物を両手で包んで飲む",
      artKey: "tired_bear",
      music: "relax"
    }
  ],
  c3: [
    {
      fortune: "希望吉",
      message: "楽しいことも、少し辛いこともあったでしょう。その全てが、今のあなたの「深み」を作っています。",
      advice: "良かったことだけを、一つ日記に書いてみて。",
      lucky: "水色 (アクア)",
      luckyColorCode: "#7dd3fc",
      action: "好きな音楽を一曲フルで聴く",
      artKey: "balance_fox",
      music: "gentle"
    }
  ],
  c4: [
    {
      fortune: "癒し吉",
      message: "本当によく耐えましたね。嵐の中を歩き続けるような強さが、あなたにはありました。今は羽を休めて。",
      advice: "無理をしない勇気を持ってください。",
      lucky: "乳白色 (ミルク)",
      luckyColorCode: "#f3f4f6",
      action: "肌触りの良い毛布にくるまる",
      artKey: "sleep_rabbit",
      music: "healing"
    }
  ],
  c5: [
    {
      fortune: "吉兆",
      message: "思うようにいかないと感じたかも知れませんが、それは冬の間に土の中で栄養を蓄える種と同じです。",
      advice: "春は必ず来ます。焦らなくて大丈夫。",
      lucky: "若草色 (ライトグリーン)",
      luckyColorCode: "#bef264",
      action: "新しい手帳やノートを開く",
      artKey: "seed_bird",
      music: "hope"
    }
  ],
  c6: [
    {
      fortune: "整い吉",
      message: "答えが出ない時間を過ごすことも、人生には大切です。悩みながら進んだ足跡は、決して無駄ではありません。",
      advice: "自分の心の声を、否定せずに聞いてあげて。",
      lucky: "藤色 (ラベンダー)",
      luckyColorCode: "#c084fc",
      action: "部屋の換気をして新しい空気を入れる",
      artKey: "thinking_cat",
      music: "calm"
    }
  ]
};

// Fallback fortune if random selection fails or array is empty
export const DEFAULT_FORTUNE: FortuneResult = {
  fortune: "小吉",
  message: "お疲れ様でした。今日はゆっくり休みましょう。",
  advice: "温かいものを食べてください。",
  lucky: "白",
  luckyColorCode: "#ffffff",
  action: "深呼吸",
  artKey: "default",
  music: "relax"
};
