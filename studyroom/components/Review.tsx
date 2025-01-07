import { BACKEND } from "@/utils/config";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import StarRating from "./Ratinstar";
import { StarIcon } from "@/assets";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-notifications";
import { Image } from "expo-image";
import ff from "@/constants/fonts";
import { h, w } from "@/constants/size";

interface Review {
  id: string;
  content: string;
  rating: number;
  user: string;
}

interface ReviewListProps {
  libraryId: string;
}

interface StarProps {
  isFilled: boolean;
  onPress: () => void;
}

const Star: React.FC<StarProps> = ({ isFilled, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <StarIcon isFilled={isFilled} fontSize={18} />
  </TouchableOpacity>
);

interface StarRatingProps {
  initialRating?: number;
  onRatingChange: (rating: number) => void;
  handleRating?: (rating: number) => void;
}

const StarRat: React.FC<StarRatingProps> = ({
  initialRating = 0,
  onRatingChange,
}) => {
  const [rating, setRating] = useState<number>(initialRating);
  const handleRatingChange = (newRating: number) => {
    // handleRating(newRating);
    setRating(newRating);
    onRatingChange(newRating);
  };

  const stars = Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      isFilled={index < rating}
      onPress={() => handleRatingChange(index + 1)}
    />
  ));

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        padding: 10,
        marginTop: 10,
      }}
    >
      {stars}
    </View>
  );
};
const ReviewList: React.FC<ReviewListProps> = ({ libraryId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [reviewMessage, setReviewMessage] = useState<string>("");

  const [avgRating, setAvgRating] = useState<number>(0);

  const handleRating = (rating: number) => {
    setRating(rating);
  };
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${BACKEND}/api/v1/library/getReviews/${libraryId}`
        );

        setReviews(response.data.data);
        setAvgRating(response.data.avgRating);
        setLoading(false);
      } catch (err) {
        console.log("Error", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [libraryId]);

  const createReview = async () => {
    const user = await AsyncStorage.getItem("userData");
    // console.log("🚀 ~ createReview ~ user:", user)
    const u = JSON.parse(user);
    // console.log("🚀 ~ createReview ~ u:", u)
    // console.log( "_---",libraryId, reviewMessage, rating, u.data);

    try {
      const response = await axios.post(
        `${BACKEND}/api/v1/library/createReview/${libraryId}`,
        {
          user: u.data?.user_id?.id || u.data?.id,
          review: reviewMessage,
          stars: Number(rating),
        }
      );

      // console.log("🚀 ~ createReview ~ response.data", response.data);
      if (response.status === 200) {
        Toast.show("Review added successfully", {
          type: "success",
        });
      }
      if (response.status === 400) {
        Toast.show("Review already exists", {
          type: "error",
          duration: 3000,
        });
      }
    } catch (err) {
      console.log("Error", err.message);
      setError(err.message);
      Toast.show("Review already exists", {
        type: "error",
        duration: 3000,
      });

      setTimeout(() => {
        setError(null);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <Text
        style={{
          color: "red",
          fontSize: 20,
          textAlign: "center",
          margin: 20,
        }}
      >
        Retry
        <ActivityIndicator size="small" color="red" />
        {/* Error: {error} */}
      </Text>
    );
  }

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Text
        style={{
          marginTop: 30,
          marginBottom: 20,
          fontSize: 20,
          fontStyle: "normal",
          fontFamily: ff.deckBold,
          textAlign: "center",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Reviews
      </Text>

      <View
        style={{
          marginHorizontal: "auto",
          flexWrap: "wrap",
          backgroundColor: "#fff",
          borderRadius: 12,
          flexDirection: "row",
          paddingHorizontal: 50,
          paddingVertical: 12,
          justifyContent: "center",
          alignSelf: "center",
          gap: 30,
          borderWidth: 0.3,
          borderColor: "#dad9d9",
          elevation: 1,
        }}
      >
        {/* <Text>4.5</Text> */}
        <StarRating rating={avgRating?.toFixed(0) || 0} />
        <Text
          style={{
            padding: 0,
            fontSize: 15,
            fontFamily: ff.deckRegular,
            color: "#7A7A7A",
          }}
        >
          {avgRating} reviews{" "}
        </Text>
      </View>
      <Text style={styles.header}>User Reviews</Text>
      <ScrollView
        style={styles.reviewContainer}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
      >
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <View style={styles.review} key={review.id}>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Image source={review.user.image} style={styles.reviewImage} />
                <View style={styles.reviewContent}>
                  <Text
                    style={{
                      fontFamily: ff.deckSemiBold,
                      fontSize: w(18),
                      color: "#414042",
                    }}
                  >
                    {review.user.username}
                  </Text>
                  <Text
                    style={{
                      fontFamily: ff.textRegular,
                      fontSize: w(13),
                      color: "#7A7A7A",
                    }}
                  >
                    {review.review}
                  </Text>
                </View>
              </View>
              <StarRating rating={review.stars} />
            </View>
          ))
        ) : (
          <Text style={styles.noReviewsText}>No reviews available</Text>
        )}
      </ScrollView>

      <View>
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            // paddingRight: 20,
          }}
        >
          <StarRat onRatingChange={handleRating} />

          <TextInput
            placeholder="Enter your review"
            style={{
              borderWidth: 1,
              borderColor: "#bebcbc",
              borderRadius: 7,
              padding: 10,
              textAlign: "center",
              width: "80%",
              alignSelf: "center",
            }}
            onChangeText={(text) => setReviewMessage(text)}
            // onEndEditing={createReview}
          />
          {reviewMessage.length > 0 && rating > 0 ? (
            <TouchableOpacity
              onPress={createReview}
              style={{
                backgroundColor: "#F0F0F0",
                padding: 10,
                borderRadius: 20,
                margin: 10,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderWidth: 0.3,
                borderColor: "#dad9d9",
                elevation: 1,
              }}
            >
              <Text>Submit Review</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.errorText}>Fill the review and rating</Text>
          )}
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    margin: 10,
    fontFamily: ff.deckBold,
    color: "black",
    marginTop: 30,
  },
  reviewContainer: {
    maxHeight: 300, // Limit the height here to make it scrollable
    backgroundColor: "#fff",
  },
  review: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    paddingVertical: h(10),
    marginLeft: 10,
    paddingLeft: 5,
    borderColor: "#F3F3F3",
    justifyContent: "space-between",
  },
  reviewImage: {
    width: w(45),
    height: w(45),
    borderRadius: 50,
    resizeMode: "cover",
  },
  reviewContent: {
    flexDirection: "column",
    justifyContent: "space-around",
    borderRadius: 20,
  },
  noReviewsText: {
    color: "red",
    fontSize: 20,
    textAlign: "center",
    margin: 20,
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: "#eaeaea",
    borderRadius: 20,
    padding: 10,
    textAlign: "center",
    margin: 10,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    margin: 20,
  },
});

export default ReviewList;
