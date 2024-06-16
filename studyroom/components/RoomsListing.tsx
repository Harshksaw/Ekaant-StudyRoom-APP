import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

interface ListingCardProps {
    title: string;
    description: string;
    imageSource: string;
}
 const data = [
    {
      id: 1,
      title: "Card 1",
      about: "About Card 1",
      ratings: 4.5,
      distance: "2 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 2,
      title: "Card 2",
      about: "About Card 2",
      ratings: 3.8,
      distance: "5 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 3,
      title: "Card 3",
      about: "About Card 3",
      ratings: 4.2,
      distance: "3 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 4,
      title: "Card 4",
      about: "About Card 4",
      ratings: 4.0,
      distance: "1 mile",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 5,
      title: "Card 5",
      about: "About Card 5",
      ratings: 4.7,
      distance: "10 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 6,
      title: "Card 6",
      about: "About Card 6",
      ratings: 3.5,
      distance: "7 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 7,
      title: "Card 7",
      about: "About Card 7",
      ratings: 4.9,
      distance: "3 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 8,
      title: "Card 8",
      about: "About Card 8",
      ratings: 4.3,
      distance: "5 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
  ];
const RoomsListing: React.FC<ListingCardProps> = ({ title, description, imageSource }) => {
    return (
        <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#888',
    },
});

export default RoomsListing;