import * as React from "react";
import { unstable_getImgProps as getImgProps } from "next/image";

export function Logo() {
  const common = { alt: "NextJS Logo", width: 72, height: 16 };

  const {
    props: { srcSet: light, ...rest },
  } = getImgProps({ ...common, src: "/nextjs.svg" });

  return (
    <picture>
      <source media="(prefers-color-scheme: dark)" srcSet="/nextjs-dark.svg" />
      <source media="(prefers-color-scheme: light)" srcSet="/nextjs.svg" />
      <img {...rest} />
    </picture>
  );
}
