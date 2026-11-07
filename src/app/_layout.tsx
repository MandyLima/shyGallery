import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArtworkProvider } from '../context/ArtworkContext';

// Layout raiz: envolve todas as rotas com o contexto e define a navegação em pilha.
export default function RootLayout() {
  return (
    <ArtworkProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#F7F3EE' },
          headerTintColor: '#342D28',
          headerTitleStyle: { fontWeight: '700' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: '#F7F3EE' },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="new" options={{ title: 'Nova obra' }} />
        <Stack.Screen name="artwork/[id]" options={{ title: 'Detalhes da obra' }} />
      </Stack>
    </ArtworkProvider>
  );
}
