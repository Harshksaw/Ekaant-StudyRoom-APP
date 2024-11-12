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
    handleRating: (rating: number) => void;
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

    const [avgRating , setAvgRating] = useState<number>(0);

    const handleRating = (rating: number) => {
        setRating(rating);
    };
    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                console.log("Library ID", libraryId);
                const response = await axios.post(
                    `${BACKEND}/api/v1/library/getReviews/${libraryId}`
                );

                console.log("🚀 ~ fetchReviews ~ response.data:", response.data);

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
        const u = JSON.parse(user);
        console.log(libraryId, reviewMessage, rating, u.data.user_id._id);
        try {
            const response = await axios.post(
                `${BACKEND}/api/v1/library/createReview/${libraryId}`,
                {
                    user: u.data.user_id._id,
                    review: reviewMessage,
                    stars: Number(rating),
                }
            );

            console.log("🚀 ~ createReview ~ response.data", response.data);
            if (response.status === 200) {
                Toast.show("Review added successfully", {
                    type: "success",

                })
            }
        } catch (err) {
            console.log("Error", err.message);
            setError(err.message);

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
                Error: {error}
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
                    margin: 20,
                    // fontFamily: "Roboto",
                    fontSize: 20,
                    fontStyle: "normal",
                    fontWeight: "800",

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
                    backgroundColor: "#F0F0F0",
                    elevation: 6,
                    borderRadius: 12,
                    flexDirection: "row",
                    paddingHorizontal: 38,
                    paddingVertical: 8,
                    justifyContent: "center",
                    alignSelf: "",
                    gap: 10,
                }}
            >
                {/* <Text>4.5</Text> */}
                <StarRating rating={avgRating.toFixed(0) || 0} />
                <Text style={{ padding: 0, fontSize: 13 }}>{avgRating} </Text>
            </View>
            <Text style={styles.header}>User Reviews</Text>
            <ScrollView style={styles.reviewContainer}
            horizontal={true}
            scrollEnabled={true} 
            
            showsHorizontalScrollIndicator={false}>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <View style={styles.review} key={review.id}>
                            <Image source={review.user.image} style={styles.reviewImage} />
                            <View style={styles.reviewContent}>
                                <StarRating rating={review.stars} />
                                <Text>{review.review}</Text>
                                <Text>By: {review.user.username}</Text>
                            </View>
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
                        paddingHorizontal: 20,
                    }}
                >
                    <StarRat onRatingChange={handleRating} />

                    <TextInput
                        placeholder="Enter your review"
                        style={{
                            borderWidth: 2,
                            borderColor: "#eaeaea",
                            borderRadius: 20,
                            padding: 10,
                            textAlign: "center",
                            margin: 10,
                        }}
                        onChangeText={(text) => setReviewMessage(text)}
                        onEndEditing={createReview}
                    />
                </KeyboardAvoidingView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontWeight: "bold",
        fontSize: 20,
        margin: 10,
    },
    reviewContainer: {
        maxHeight: 300, // Limit the height here to make it scrollable
        backgroundColor: "#F0F0F0",
    },
    review: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        borderTopWidth: 2,
        padding: 10,
        paddingHorizontal: 40,
        borderColor: "#eaeaea",
        gap: 10,
    },
    reviewImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        resizeMode: "cover",
    },
    reviewContent: {
        flexDirection: "column",
        justifyContent: "space-around",
        marginTop: 10,
        borderRadius: 20,
        padding: 10,
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
        fontSize: 20,
        textAlign: "center",
        margin: 20,
    },
});

export default ReviewList;
