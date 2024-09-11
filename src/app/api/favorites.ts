import { NextApiRequest, NextApiResponse } from 'next';

class InMemoryFavoriteStore {
    private favoritesStore: { [key: string]: string[] } = {}; 
    
    public getFavoritesByUserId(userId: string): string[] | undefined {
      return this.favoritesStore[userId];
    }
    
    public addFavorite(userId: string, favoriteId: string): void {
      if (!this.favoritesStore[userId]) {
        this.favoritesStore[userId] = [];
      }
      if (!this.favoritesStore[userId].includes(favoriteId)) {
        this.favoritesStore[userId].push(favoriteId);
      }
    }
    
    public removeFavorite(userId: string, favoriteId: string): void {
      if (this.favoritesStore[userId]) {
        this.favoritesStore[userId] = this.favoritesStore[userId].filter(id => id !== favoriteId);
      }
    }
}

const inMemoryStore = new InMemoryFavoriteStore();


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uuid, productId } = req.body;

  switch(req.method) {
    case 'POST': {
        inMemoryStore.addFavorite(uuid, productId);
        res.status(200).json({ message: 'Added to favorites' });
        break;
    };
    case 'DELETE': {
        inMemoryStore.removeFavorite(uuid, productId);
        res.status(200).json({ message: 'Removed from favorites' });
        break;
    };
    case 'GET': {
        const favorites = inMemoryStore.getFavoritesByUserId(uuid);
        res.status(200).json({ favorites });
        break;
    };
    default: {
        res.status(405).json({ message: 'Method not allowed' });
    }
  }
}
