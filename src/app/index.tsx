import { router } from 'expo-router';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ArtworkCard } from '../components/ArtworkCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { useArtworks } from '../context/ArtworkContext';

// Tela inicial: apresenta o portfólio em uma grade de cartões.
export default function GalleryScreen() {
  const { artworks } = useArtworks();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>PORTFÓLIO AUTORAL</Text>
        <Text style={styles.heading}>ShyGallery</Text>
        <Text style={styles.subtitle}>Cada desenho guarda um pouco da minha essência.</Text>
        <View style={styles.headerBottom}>
          <Text style={styles.counter}>{artworks.length} {artworks.length === 1 ? 'obra' : 'obras'}</Text>
          <View style={styles.buttonWrap}>
            <PrimaryButton title="+ Nova obra" onPress={() => router.push('/new')} />
          </View>
        </View>
      </View>

      {/* FlatList renderiza a coleção com rolagem eficiente e duas colunas. */}
      <FlatList
        data={artworks}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columns}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ArtworkCard
            artwork={item}
            // O id é enviado na URL para a rota dinâmica de detalhes.
            onPress={() => router.push({ pathname: '/artwork/[id]', params: { id: item.id } })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Sua galeria está esperando por você.</Text>
            <Text style={styles.emptyText}>Cadastre seu primeiro desenho e comece a montar seu portfólio.</Text>
            <PrimaryButton title="Cadastrar primeiro desenho" onPress={() => router.push('/new')} />
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F3EE' },
  header: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 18 },
  eyebrow: { color: '#9B7B62', fontSize: 10, fontWeight: '800', letterSpacing: 2.2 },
  heading: { color: '#342D28', fontSize: 36, fontWeight: '800', marginTop: 7 },
  subtitle: { color: '#7B7068', fontSize: 14, marginTop: 5 },
  headerBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 22 },
  counter: { color: '#6D5748', fontSize: 14, fontWeight: '700' },
  buttonWrap: { width: 142 },
  listContent: { paddingHorizontal: 20, paddingBottom: 28, flexGrow: 1 },
  columns: { justifyContent: 'space-between' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, paddingVertical: 50, gap: 14 },
  emptyTitle: { color: '#342D28', fontSize: 20, fontWeight: '700', textAlign: 'center' },
  emptyText: { color: '#7B7068', fontSize: 14, lineHeight: 21, textAlign: 'center', marginBottom: 8 },
});
