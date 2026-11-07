import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FormField } from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { useArtworks } from '../context/ArtworkContext';

// Formulário responsável por coletar e validar os dados de uma nova obra.
export default function NewArtworkScreen() {
  const { addArtwork } = useArtworks();

  // Cada estado guarda o valor atual de um campo controlado do formulário.
  const [title, setTitle] = useState('');
  const [technique, setTechnique] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [software, setSoftware] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');

  // Solicita acesso às fotos e abre o seletor nativo do celular.
  async function chooseImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permissão necessária', 'Autorize o acesso às fotos para selecionar a imagem do desenho.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.85,
    });

    // O usuário pode fechar o seletor sem escolher uma imagem; nesse caso nada muda.
    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  }

  function saveArtwork() {
    // trim() impede que espaços em branco sejam aceitos como conteúdo.
    if (!title.trim() || !technique.trim() || !year.trim() || !description.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha título, técnica, ano e descrição.');
      return;
    }

    if (!imageUri) {
      Alert.alert('Adicione uma imagem', 'Escolha uma foto do desenho para publicar na galeria.');
      return;
    }

    // Envia os valores controlados pelo useState ao contexto compartilhado.
    addArtwork({
      title: title.trim(),
      technique: technique.trim(),
      year: year.trim(),
      software: software.trim() || 'Não informado',
      description: description.trim(),
      imageUri: { uri: imageUri },
    });

    Alert.alert('Obra cadastrada!', 'Seu desenho foi adicionado à galeria.', [
      { text: 'Ver minha galeria', onPress: () => router.replace('/') },
    ]);
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.intro}>Apresente uma nova criação ao seu portfólio.</Text>

      <Text style={styles.label}>Imagem do desenho</Text>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.preview} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderIcon}>＋</Text>
          <Text style={styles.placeholderText}>Selecione uma foto da sua galeria</Text>
        </View>
      )}
      <PrimaryButton title={imageUri ? 'Trocar imagem' : 'Escolher imagem'} onPress={chooseImage} outline />

      {/* FormField é reutilizado; cada value/onChangeText conecta o campo ao useState. */}
      <FormField label="Título da obra *" value={title} onChangeText={setTitle} placeholder="Ex.: Um dia de verão" />
      <FormField label="Técnica artística *" value={technique} onChangeText={setTechnique} placeholder="Ex.: Aquarela, grafite, pintura digital..." />
      <FormField label="Ano de criação *" value={year} onChangeText={setYear} placeholder="2026" keyboardType="numeric" />
      <FormField label="Software utilizado" value={software} onChangeText={setSoftware} placeholder="Ex.: Adobe Photoshop, CorelDRAW" />
      <FormField label="Sobre a obra *" value={description} onChangeText={setDescription} placeholder="Conte a inspiração, o processo ou a história deste desenho..." multiline />

      <Text style={styles.required}>* Campos obrigatórios</Text>
      <PrimaryButton title="Cadastrar desenho" onPress={saveArtwork} />
      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F3EE' },
  content: { padding: 20, paddingBottom: 36 },
  intro: { color: '#7B7068', fontSize: 14, lineHeight: 21, marginBottom: 12 },
  label: { color: '#4B4038', fontSize: 14, fontWeight: '700', marginBottom: 9, marginTop: 12 },
  preview: { width: '100%', height: 250, borderRadius: 14, marginBottom: 12, backgroundColor: '#E9E0D7' },
  placeholder: { height: 170, borderRadius: 14, backgroundColor: '#EDE5DC', alignItems: 'center', justifyContent: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#DED2C6', borderStyle: 'dashed' },
  placeholderIcon: { color: '#8A705D', fontSize: 34 },
  placeholderText: { color: '#7B7068', fontSize: 13, marginTop: 6 },
  required: { color: '#9B9188', fontSize: 12, marginTop: 15, marginBottom: 16 },
  bottomSpace: { height: 20 },
});
