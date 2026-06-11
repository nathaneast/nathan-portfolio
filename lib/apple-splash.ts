type AppleSplashImage = {
  url: string;
  media: string;
};

// (CSS width, CSS height, DPR) — 주요 아이폰 기기
const DEVICES: Array<[number, number, number]> = [
  [375, 667, 2], // SE 2/3
  [414, 896, 2], // XR, 11
  [375, 812, 3], // X, XS, 11 Pro, 12/13 mini
  [414, 896, 3], // XS Max, 11 Pro Max
  [390, 844, 3], // 12, 13, 14
  [428, 926, 3], // 12/13 Pro Max, 14 Plus
  [393, 852, 3], // 14 Pro, 15, 15 Pro, 16
  [430, 932, 3], // 14 Pro Max, 15 Plus/Pro Max, 16 Plus
  [402, 874, 3], // 16 Pro
  [440, 956, 3], // 16 Pro Max
];

export const appleSplashImages: AppleSplashImage[] = DEVICES.map(
  ([width, height, dpr]) => ({
    url: `/splash/iphone-${width * dpr}x${height * dpr}.png`,
    media: `screen and (device-width: ${width}px) and (device-height: ${height}px) and (-webkit-device-pixel-ratio: ${dpr}) and (orientation: portrait)`,
  })
);
