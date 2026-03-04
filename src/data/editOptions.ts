export interface EditOption {
  id: string;
  name: string;
  prompt: string;
}

export const EDIT_OPTIONS: EditOption[] = [
  {
    id: 'tang-chi-tiet-soi-toc',
    name: 'Tăng chi tiết sợi tóc',
    prompt: 'Enhance realism: add realistic skin pores and fine texture, reduce overly smooth skin, add subtle natural blemishes. Improve hair detail with individual strands and a few stray hairs. Keep the face identity unchanged and preserve the exact outfit and pose.'
  },
  {
    id: 'giu-nguyen-1',
    name: 'Giữ nguyên (Natural Beauty)',
    prompt: 'Enhance photorealism and natural beauty. Keep the same person, face identity, pose, outfit, and background. Reduce age spots, freckles, dark spots, and uneven pigmentation while keeping realistic skin texture and visible pores. Make the skin look naturally fair with a soft pink undertone (healthy white-pink tone), not pale and not over-smoothed. Add natural makeup: even base foundation, soft blush on cheeks, subtle contour, natural eyebrow shaping, light brown eyeliner, soft mascara, and a natural glossy pink lips. Keep lighting realistic, add subtle camera grain, and avoid any plastic or CGI look. Do not change body shape, clothing, or composition.'
  },
  {
    id: 'tang-soi-toc',
    name: 'Tăng sợi tóc (DSLR Portrait)',
    prompt: 'Make the photo look like a real high-quality DSLR portrait. Keep the same subject identity, pose, outfit, and background. Remove skin age spots and discoloration, reduce blemishes and uneven tone, but keep realistic skin pores and fine texture. Improve the natural healthy white-pink skin tone with soft warm highlights. Apply professional natural makeup: smooth foundation, soft peach-pink blush, subtle nose and jaw contour, clean eyebrows, soft eyeliner, natural eyelashes, and pink gradient lips with slight gloss. Enhance hair realism with individual strands and a few flyaway hairs. Add subtle film grain and realistic shadows. Avoid over-smoothing and avoid beauty-filter look.'
  },
  {
    id: 'giu-nguyen-2',
    name: 'Giữ nguyên (Korean Beauty)',
    prompt: 'Enhance photorealism and apply natural Korean beauty makeup. Keep the same person identity, face structure, pose, outfit, and background. Reduce age spots, freckles, and uneven pigmentation while keeping realistic skin texture and visible pores. Make the skin naturally fair with a healthy white-pink tone, slightly dewy glow (glass skin effect), not over-smoothed and not pale. Apply Korean-style makeup: soft straight eyebrows, light brown eyeliner close to the lash line, subtle aegyo-sal under-eye highlight, natural curled lashes, warm peach-pink blush, very light contour, and soft pink gradient lips with a slight glossy finish. Keep lighting realistic, add subtle camera grain, and avoid any CGI or beauty-filter look. Do not change body shape, clothing, or composition.'
  },
  {
    id: 'xoan-song-dai',
    name: 'Xoăn sóng dài',
    prompt: 'Enhance photorealism and apply elegant western glam makeup. Keep the same person identity, pose, outfit, and background. Reduce age spots and uneven skin tone while keeping realistic pores and natural texture. Make skin smooth with a healthy warm tone, not over-whitened. Apply makeup: defined eyebrows, soft brown smoky eyes, eyeliner with a small wing, volumized lashes, subtle contour and highlight, and nude-pink lipstick with satin finish. Change hairstyle to long loose wavy hair with natural volume and a few flyaway strands. Add subtle film grain and realistic lighting, avoid CGI or over-smoothing.'
  },
  {
    id: 'bob-ngan-cup',
    name: 'Bob ngắn cụp',
    prompt: 'Make the image look like a real Japanese beauty portrait. Keep the same person identity and background. Remove age spots and discoloration while preserving realistic skin texture. Create a clean, fresh, natural fair skin tone with soft pink cheeks. Apply Japanese-style makeup: soft straight brows, minimal eyeliner, natural lashes, gentle rosy blush, and soft coral lips. Change hairstyle to a natural short bob with slightly inward curls at the ends, realistic hair strands and shine. Keep lighting soft and realistic, add subtle camera grain, no plastic skin.'
  },
  {
    id: 'duoi-ngua-cao-sleek',
    name: 'Đuôi ngựa cao sleek',
    prompt: 'Increase photorealism and create a modern clean-girl look. Keep the same person identity, pose, outfit, and background. Reduce dark spots and age spots while keeping pores and skin texture. Make the skin naturally bright with a healthy white-pink undertone, slightly dewy. Apply minimal makeup: fluffy brows, light concealer, subtle bronzer, soft peach blush, natural mascara, and glossy pink lips. Change hairstyle to a sleek high ponytail with a few loose strands around the face. Add subtle film grain and realistic shadows, avoid over-smoothing and avoid CGI.'
  },
  {
    id: '2-ben-twin-tails-mai',
    name: '2 bên (twin tails) + mái',
    prompt: 'Enhance photorealism while creating a soft cute look. Keep the same person identity and background. Reduce age spots and uneven pigmentation but keep realistic pores and fine skin texture. Make skin fair with a gentle pink tone, not pale. Apply soft cute makeup: light pink blush across cheeks, subtle shimmer on eyelids, thin eyeliner, natural lashes, slightly fuller lips with soft pink gradient and gloss. Change hairstyle to twin tails (two low ponytails) with soft face-framing bangs, realistic hair texture and flyaway hairs. Keep lighting realistic, add subtle grain, avoid doll-like CGI.'
  },
  {
    id: 'thang-dai-re-ngoi-giua-1',
    name: 'Thẳng dài rẽ ngôi giữa (Night-out)',
    prompt: 'Turn this into a realistic night-out portrait. Keep the same person identity, pose, outfit, and background. Remove age spots and uneven skin tone while preserving realistic skin pores and texture. Apply sexy but realistic makeup: sharper eyebrows, defined eyeliner, darker lashes, soft contour, subtle highlight, and deep rose/red lips with satin finish. Change hairstyle to long straight hair with a center part, natural shine, and a few flyaway strands. Add realistic contrast, subtle film grain, and natural shadows. Avoid plastic skin and avoid changing the face.'
  },
  {
    id: 'layer-dai',
    name: 'Layer dài',
    prompt: 'Enhance photorealism and create a Vietnamese everyday coffee-date look. Keep the same person identity, pose, outfit, and background. Reduce age spots and uneven pigmentation while preserving realistic pores and skin texture. Make the skin naturally fair with a healthy white-pink tone, not pale. Apply light natural makeup: soft brows, light concealer, subtle peach blush, thin eyeliner, natural mascara, and soft coral-pink lips with slight gloss. Change hairstyle to long layered hair with natural volume and light face-framing strands. Add subtle camera grain and realistic lighting, avoid over-smoothing and CGI.'
  },
  {
    id: 'thang-dai-re-ngoi-giua-2',
    name: 'Thẳng dài rẽ ngôi giữa (Saigon Hot-girl)',
    prompt: 'Increase photorealism and apply a modern Saigon hot-girl makeup style. Keep the same identity, pose, outfit, and background. Remove age spots and uneven tone while keeping realistic skin pores and texture. Make skin smooth and bright with a natural warm-pink undertone. Apply makeup: defined brows, clean eyeliner, slightly fuller lashes, soft contour, subtle highlight, and nude-pink lips with glossy finish. Change hairstyle to long straight hair with a center part, sleek but natural, with a few flyaway hairs. Add subtle film grain and natural shadows, avoid plastic skin.'
  },
  {
    id: 'bui-thap-mai-bay',
    name: 'Búi thấp + mái bay',
    prompt: 'Enhance photorealism and create an elegant Hanoi feminine look. Keep the same person identity, pose, outfit, and background. Reduce age spots and discoloration while preserving natural skin texture and pores. Make skin naturally fair with a gentle white-pink undertone. Apply elegant soft makeup: straight natural brows, soft brown eyeshadow, thin eyeliner, natural lashes, rosy blush, and muted rose lips with satin finish. Change hairstyle to a low bun with soft curtain bangs and a few loose strands. Keep lighting realistic, add subtle camera grain, avoid CGI and over-smoothing.'
  },
  {
    id: 'mai-thua-uon-nhe-duoi',
    name: 'Mái thưa + uốn nhẹ đuôi',
    prompt: 'Increase photorealism while creating a cute Vietnamese girl look. Keep the same identity, pose, outfit, and background. Remove age spots and uneven pigmentation but keep realistic pores and fine skin texture. Make skin fair with a soft pink tone, slightly dewy. Apply cute makeup: light pink blush, soft shimmer eyelids, thin eyeliner, natural lashes, and baby pink gradient lips with a little gloss. Change hairstyle to long hair with Korean-style thin bangs (see-through bangs) and soft curls at the ends. Add subtle film grain, realistic lighting, avoid doll-like CGI.'
  },
  {
    id: 'uon-song-lon-kieu-salon',
    name: 'Uốn sóng lớn kiểu salon',
    prompt: 'Enhance photorealism and create a classy Vietnamese party look. Keep the same person identity, pose, outfit, and background. Reduce age spots and uneven skin tone while preserving realistic skin pores and texture. Make the skin naturally bright with a healthy warm-pink undertone. Apply party makeup: clean shaped brows, slightly deeper eyeliner, fuller lashes, soft contour and highlight, and glossy rose-red lips. Change hairstyle to salon-style big loose waves with natural volume and a few flyaway hairs. Add subtle camera grain and realistic shadows, avoid over-smoothing and CGI.'
  },
  {
    id: 'toc-thang-kep-cang-cua-nua-dau',
    name: 'Tóc thẳng kẹp càng cua nửa đầu',
    prompt: 'Enhance photorealism and create a trendy Gen Z Y2K beauty look. Keep the same person identity, pose, outfit, and background. Reduce age spots and uneven pigmentation while preserving realistic pores and natural skin texture. Make the skin naturally bright with a healthy white-pink undertone and a subtle glossy glow (not plastic). Apply Y2K makeup: soft defined brows, thin eyeliner, light shimmer on eyelids, natural curled lashes, pink blush, and glossy candy-pink lips. Change hairstyle to straight hair with a half-up claw clip style, with a few face-framing strands and natural flyaway hairs. Add subtle film grain and realistic lighting, avoid CGI or over-smoothing.'
  },
  {
    id: 'xoan-loi-mai-bay',
    name: 'Xoăn lơi + mái bay',
    prompt: 'Increase photorealism while applying a soft Vietnamese Gen Z Douyin-inspired makeup (realistic, not exaggerated). Keep the same person identity, pose, outfit, and background. Reduce age spots and discoloration while keeping realistic skin texture and pores. Create a naturally fair white-pink skin tone with a soft dewy finish. Apply makeup: soft straight brows, subtle eyeliner, slightly brighter eye sparkle, light shimmer under eyes, rosy blush, and soft pink gradient lips with gloss. Change hairstyle to loose soft waves with curtain bangs, realistic hair strands and shine. Add subtle camera grain, avoid doll-like CGI.'
  },
  {
    id: 'toc-bui-2-cuc',
    name: 'Tóc búi 2 cục (space buns)',
    prompt: 'Enhance photorealism and create a cute strawberry makeup look. Keep the same person identity, pose, outfit, and background. Remove age spots and uneven pigmentation while preserving realistic pores and skin texture. Make skin naturally fair with a healthy pink tone. Apply strawberry makeup: rosy blush across cheeks and nose, soft pink eyeshadow, thin eyeliner, natural lashes, and strawberry-pink glossy lips. Change hairstyle to playful space buns with a few loose strands and natural flyaway hairs. Keep lighting realistic, add subtle film grain, avoid CGI or over-smoothing.'
  },
  {
    id: 'toc-dai-uon-chu-c-mai-thua',
    name: 'Tóc dài uốn chữ C + mái thưa',
    prompt: 'Increase photorealism and create a fresh ulzzang-style cute look. Keep the same person identity, pose, outfit, and background. Reduce age spots and discoloration while keeping realistic pores and fine skin texture. Make the skin naturally fair with a white-pink undertone and soft dewy glow. Apply ulzzang makeup: soft straight brows, light peach eyeshadow, thin brown eyeliner, natural curled lashes, peach blush, and soft pink tinted lips. Change hairstyle to long hair with C-curl ends and see-through bangs, with natural shine and a few flyaway hairs. Add subtle camera grain and realistic shadows, avoid plastic skin.'
  },
  {
    id: 'sleek-bun-cao-mai-bay',
    name: 'Sleek bun cao + mái bay',
    prompt: 'Enhance photorealism and apply a trendy TikTok clean-glam makeup look. Keep the same person identity, pose, outfit, and background. Remove age spots and uneven tone while preserving realistic pores and natural texture. Make skin bright and smooth with a healthy warm-pink undertone, slightly dewy. Apply makeup: lifted brows, clean eyeliner, wispy lashes, soft contour, subtle highlight on cheekbones, and glossy nude-pink lips. Change hairstyle to a sleek high bun with soft curtain bangs and a few loose strands. Add subtle film grain and realistic shadows, avoid over-smoothing and CGI.'
  },
  {
    id: 'toc-ngan-lob-uon-song',
    name: 'Tóc ngắn lob uốn sóng',
    prompt: 'Increase photorealism while creating a cute kawaii pastel look (realistic). Keep the same person identity, pose, outfit, and background. Reduce age spots and uneven pigmentation but keep realistic pores and skin texture. Make skin fair with a soft pink undertone. Apply pastel makeup: light pink/lavender eyeshadow, thin eyeliner, natural lashes, round rosy blush, and baby pink glossy lips. Change hairstyle to a short lob haircut with soft waves, realistic hair strands and shine. Add subtle film grain and realistic lighting, avoid CGI.'
  },
  {
    id: 'toc-xoan-song-kep-no-nho',
    name: 'Tóc xoăn sóng + kẹp nơ nhỏ',
    prompt: 'Enhance photorealism and create a soft-girl aesthetic look. Keep the same person identity, pose, outfit, and background. Reduce age spots and discoloration while preserving realistic pores and skin texture. Make skin naturally fair with a healthy white-pink tone and subtle dewy glow. Apply soft-girl makeup: fluffy brows, light shimmer eyelids, thin eyeliner, natural lashes, rosy blush, and glossy pink lips. Change hairstyle to loose wavy hair with a small cute bow clip on one side, with realistic strands and flyaway hairs. Add subtle camera grain, avoid plastic skin.'
  },
  {
    id: 'toc-tet-2-ben',
    name: 'Tóc tết 2 bên',
    prompt: 'Increase photorealism and create a trendy coquette Gen Z look. Keep the same person identity, pose, outfit, and background. Remove age spots and uneven tone while keeping realistic pores and skin texture. Make skin naturally fair with a soft pink undertone. Apply coquette makeup: soft brows, subtle eyeliner, light shimmer around eyes, rosy blush, and soft pink lips with slight gloss. Change hairstyle to two braids (twin braids) with face-framing strands, realistic hair texture and flyaway hairs. Add subtle film grain and realistic lighting, avoid CGI.'
  },
  {
    id: 'duoi-ngua-thap-mai-thua',
    name: 'Đuôi ngựa thấp + mái thưa',
    prompt: 'Enhance photorealism and create a youthful Vietnamese campus-girl look. Keep the same person identity, pose, outfit, and background. Reduce age spots and discoloration while preserving realistic pores and fine skin texture. Make skin naturally bright with a healthy white-pink undertone. Apply fresh makeup: natural brows, minimal eyeliner, soft peach blush, natural mascara, and coral-pink lips with a slight glossy finish. Change hairstyle to a low ponytail with see-through bangs and a few loose strands. Add subtle camera grain and realistic shadows, avoid CGI.'
  },
  {
    id: 'buoc-2-chum-thap-mai',
    name: 'Buộc 2 chùm thấp + mái',
    prompt: 'Increase photorealism and create a cute bunny-inspired look (realistic). Keep the same person identity, pose, outfit, and background. Remove age spots and uneven pigmentation while keeping realistic pores and skin texture. Make skin naturally fair with a soft pink undertone, slightly dewy. Apply cute makeup: doll-like blush concentrated on cheeks (subtle, not exaggerated), thin eyeliner, natural lashes, and baby pink glossy lips. Change hairstyle to two low pigtails with soft bangs and face-framing strands. Add subtle film grain and realistic lighting, avoid plastic skin.'
  }
];
