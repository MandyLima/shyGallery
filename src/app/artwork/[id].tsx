import { router, useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../../components/PrimaryButton';
import { useArtworks } from '../../context/ArtworkContext';

// Rota dinâmica: o trecho [id] recebe o identificador enviado pela tela da galeria.
export default function ArtworkDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { artworks } = useArtworks();

  // Busca a obra cujo id corresponde ao parâmetro da URL, por exemplo /artwork/1.
  const artwork = artworks.find((item) => item.id === id);

  if (!artwork) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.title}>Obra não encontrada</Text>
        <Text style={styles.paragraph}>Ela pode não estar mais disponível nesta sessão.</Text>
        <PrimaryButton title="Voltar para a galeria" onPress={() => router.replace('/')} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Image source={artwork.imageUri} style={styles.image} />
      <Text style={styles.eyebrow}>OBRA DO PORTFÓLIO</Text>
      <Text style={styles.title}>{artwork.title}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.tag}>{artwork.technique}</Text>
        <Text style={styles.year}>{artwork.year}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre a criação</Text>
        <Text style={styles.paragraph}>{artwork.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Software utilizado</Text>
        <Text style={styles.paragraph}>{artwork.software}</Text>
      </View>

      <PrimaryButton title="Voltar para a galeria" onPress={() => router.back()} outline />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F3EE' },
  content: { padding: 20, paddingBottom: 34 },
  image: { width: '100%', height: 360, borderRadius: 18, backgroundColor: '#E9E0D7' },
  eyebrow: { color: '#9B7B62', fontSize: 10, fontWeight: '800', letterSpacing: 2, marginTop: 25 },
  title: { color: '#342D28', fontSize: 29, fontWeight: '800', marginTop: 8 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 13 },
  tag: { color: '#6D5748', backgroundColor: '#EDE5DC', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, overflow: 'hidden', fontSize: 12, fontWeight: '700' },
  year: { color: '#7B7068', fontSize: 13 },
  section: { marginTop: 25 },
  sectionTitle: { color: '#342D28', fontSize: 16, fontWeight: '800', marginBottom: 8 },
  paragraph: { color: '#746960', fontSize: 15, lineHeight: 24 },
  notFound: { flex: 1, backgroundColor: '#F7F3EE', justifyContent: 'center', padding: 24, gap: 16 },
});
