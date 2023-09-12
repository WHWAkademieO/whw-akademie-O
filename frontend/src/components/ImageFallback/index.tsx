import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface IIMageWithFallback extends ImageProps {}

const ImageWithFallback: React.FC<IIMageWithFallback> = (props) => {
  const fallbackSrc = "/images/fallback-thumbnail.jpeg";
  const { src, ...rest } = props || {};

  if (src) {
    return <Image {...rest} alt={props.alt} src={src} />;
  }

  return <Image {...rest} alt={props.alt} src={fallbackSrc} />;
};

export default ImageWithFallback;
