import { BASEURL } from "@/lib/utils";

export default function Image({ src, ...rest }) {
  src =
    src && src.includes("https://")
      ? src
      : `${BASEURL}/uploads/` + src;
  return <img {...rest} src={src} alt={""} />;
}
