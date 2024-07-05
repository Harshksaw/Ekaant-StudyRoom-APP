import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { StarIcon } from "../assets/index";

const Star = ({ isFilled, onPress }) => <StarIcon isFilled={isFilled} />;

const StarRating = ({ rating, onRatingChange }: any) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      isFilled={index < rating}
      onPress={() => onRatingChange(index + 1)}
    />
  ));

  return <View style={{ flexDirection: "row" }}>{stars}</View>;
};

export default StarRating;
