import React, { createContext, useContext, useState, type PropsWithChildren } from 'react';
import type { ImageSourcePropType } from 'react-native';
// Representa os dados que cada desenho precisa ter para aparecer na galeria.
export type Artwork = {
  id: string;
  title: string;
  technique: string;
  year: string;
  software: string;
  description: string;
  imageUri: ImageSourcePropType;
};

// O formulário não informa o id: ele é criado no momento do cadastro.
type NewArtwork = Omit<Artwork, 'id'>;

type ArtworkContextValue = {
  artworks: Artwork[];
  addArtwork: (artwork: NewArtwork) => void;
};

//dados mockados
const EXAMPLE_ARTWORKS: Artwork[] = [
  {
    id: '1',
    title: 'Ocean Girl',
    technique: 'Arte Digital',
    year: '2026',
    software: 'ClipStudio',
    description: 'Um estudo de luz e sombra feito para explorar a composição.',
    imageUri: require('../arts/OceanGirl.png'),
  },
  {
    id: '2',
    title: 'Big Duo',
    technique: 'Arte Digital',
    year: '2026',
    software: 'ClipStudio',
    description: 'Experimento artístico com referências, cores, texturas.',
    imageUri: require('../arts/BigDuo.png'),
  },
];

// O contexto compartilha a mesma lista entre a galeria, o cadastro e os detalhes.
const ArtworkContext = createContext<ArtworkContextValue | undefined>(undefined);

export function ArtworkProvider({ children }: PropsWithChildren) {
  const [artworks, setArtworks] = useState<Artwork[]>(EXAMPLE_ARTWORKS);

  // Adiciona a obra no início da lista para que ela apareça primeiro na galeria.
  function addArtwork(artworkData: NewArtwork) {
    const newArtwork: Artwork = {
      ...artworkData,
      id: Date.now().toString(),
    };

    setArtworks((currentArtworks) => [newArtwork, ...currentArtworks]);
  }

  return (
    <ArtworkContext.Provider value={{ artworks, addArtwork }}>
      {children}
    </ArtworkContext.Provider>
  );
}

// Hook próprio: evita repetir useContext e garante que o Provider foi configurado.
export function useArtworks() {
  const context = useContext(ArtworkContext);

  if (!context) {
    throw new Error('useArtworks precisa ser usado dentro de ArtworkProvider.');
  }

  return context;
}
