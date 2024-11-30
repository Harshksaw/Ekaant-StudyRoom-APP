import { Dimensions, PixelRatio } from "react-native";

const { width: vw, height: vh } = Dimensions.get("screen");

export const DesignHeight = 812;
export const DesignWidth = 375;
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 375;
export const width = vw;
export const height = vh;
export function normalize(size: number) {
  return PixelRatio.roundToNearestPixel(size * scale);
}
export const w = (width: number) => {
  let percent = (width / DesignWidth) * 100;
  const elemWidth = parseFloat(percent + "%");
  return PixelRatio.roundToNearestPixel((vw * elemWidth) / 100);
};
export const h = (height: number) => {
  let percent = (height / DesignHeight) * 100;
  const elemHeight = parseFloat(percent + "%");
  return PixelRatio.roundToNearestPixel((vh * elemHeight) / 100);
};

export { vw, vh };
