import { Box } from "@chakra-ui/layout";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

import { Img } from "@chakra-ui/image";
import getIcons from "../../utils/getIcons";

import "swiper/swiper-bundle.min.css";
import "swiper/components/navigation/navigation.min.css";
import "./pickerStyles.css";
import { useEffect, useState } from "react";

const iconsSVGS = getIcons(require.context("../../assets", true, /\.svg$/));

SwiperCore.use([Navigation]);

interface IIconPicker {
  setPickedIcon: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const IconPicker = (props: IIconPicker) => {
  const [iconIndex, setIconIndex] = useState(0);

  useEffect(() => {
    const iconName = iconsSVGS[iconIndex];
    props.setPickedIcon(iconName);
  }, [iconIndex, props]);

  return (
    <Box w="xs" m="1">
      <Swiper
        spaceBetween={25}
        slidesPerView={3}
        navigation
        centeredSlides={true}
        loop={true}
        onSlideChange={(swiper) => setIconIndex(swiper.realIndex)}
      >
        {iconsSVGS.map((icon) => (
          <SwiperSlide key={icon}>
            <Img src={icon} alt={icon} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default IconPicker;
