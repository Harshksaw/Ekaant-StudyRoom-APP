import { StyleSheet, Text } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content';

export default function Placeholder() {
    return (
      <SkeletonContent
        containerStyle={{ flex: 1, width: 300 }}
        isLoading={false}
        layout={[
          { key: 'someId', width: 220, height: 20, marginBottom: 6 },
          { key: 'someOtherId', width: 180, height: 20, marginBottom: 6 }
        ]}
      >
        
        <Text style={styles.normalText}>Your content</Text>
        <Text style={styles.bigText}>Other content</Text>
      </SkeletonContent>
    );
  }
  const styles = StyleSheet.create({
    normalText: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'black',
        marginBottom: 10
    },
    bigText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10
    }
});