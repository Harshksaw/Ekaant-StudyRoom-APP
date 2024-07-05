import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Star = ({ isFilled, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={{ color: isFilled ? '#FFCB45' : 'gray' , fontSize: 18}}>★</Text>
  </TouchableOpacity>
);

const StarRating = ({ rating, onRatingChange }:any) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      isFilled={index < rating}
      onPress={() => onRatingChange(index + 1)}
    />
  ));

  return <View style={{ flexDirection: 'row' }}>{stars}</View>;
};

export default StarRating;