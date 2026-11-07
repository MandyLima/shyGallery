import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Artwork } from '../context/ArtworkContext';

type ArtworkCardProps = {
  artwork: Artwork;
  onPress: () => void;
};

// Cartão reutilizável que resume uma obra na FlatList da tela inicial.
export function ArtworkCard({ artwork, onPress }: ArtworkCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Ver detalhes de ${artwork.title}`}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {artwork.imageUri ? (
        <Image source={artwork.imageUri} style={styles.image}   resizeMode="cover"
/>
      ) : (
        <View style={[styles.image, styles.noImage]}>
          <Text style={styles.noImageText}>Sem imagem</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>{artwork.title}</Text>
        <Text numberOfLines={1} style={styles.technique}>{artwork.technique}</Text>
        <Text style={styles.year}>{artwork.year}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginBottom: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEE7E0',
  },
  image: { width: '100%', height: 200,
  borderRadius: 12,aspectRatio: 0.86, backgroundColor: '#E9E0D7' },
  noImage: { alignItems: 'center', justifyContent: 'center' },
  noImageText: { color: '#6D5748', fontSize: 13 },
  info: { padding: 12 },
  title: { color: '#342D28', fontSize: 15, fontWeight: '700' },
  technique: { color: '#7B7068', fontSize: 12, marginTop: 5 },
  year: { color: '#A08E7E', fontSize: 11, marginTop: 8 },
  pressed: { opacity: 0.82 },
});
