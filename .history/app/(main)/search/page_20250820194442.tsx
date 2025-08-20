/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect, Suspense } from 'react';
import { searchProductsAction } from '@/actions/catalog/searchProducts';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/productCard';
import { IProductsEntity } from 'oneentry/dist/products/productsInterfaces';
import { IProduct } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Clock,
  TrendingUp,
  Pizza,
} from 'lucide-react';

interface FilterState {
  priceRange: [number, number];
  availability: string;
  sortBy: string;
  showFilters: boolean;
}

function SearchComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const params = useSearchParams();
  const urlSearchTerm = params.get('searchTerm');
  const [products, setProducts] = useState<IProductsEntity[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProductsEntity[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState(urlSearchTerm || '');

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 30],
    availability: 'all',
    sortBy: 'relevance',
    showFilters: false,
  });

  useEffect(() => {
    const searchProducts = async () => {
      if (urlSearchTerm) {
        setIsLoading(true);
        const data = await searchProductsAction({ query: urlSearchTerm });
        console.log('data', data);
        if (Array.isArray(data)) {
          setProducts(data as IProductsEntity[]);
          setFilteredProducts(data as IProductsEntity[]);
        } else {
          console.error('Erreur lors de la récupération des produits:', data);
        }
        setIsLoading(false);
      }
    };

    searchProducts();
  }, [urlSearchTerm]);

  useEffect(() => {
    setSearchTerm(urlSearchTerm || '');
  }, [urlSearchTerm]);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const applyFilters = () => {
    let filtered = [...products];

    // Filtrer par plage de prix
    filtered = filtered.filter((product) => {
      const price =
        product.price || product.attributeValues?.p_price?.value || 0;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Filtrer par disponibilité
    if (filters.availability !== 'all') {
      filtered = filtered.filter((product) => {
        const available =
          product.attributeValues?.p_available?.value?.[0]?.title ||
          'Available';
        return filters.availability === 'available'
          ? available.toLowerCase().includes('available')
          : !available.toLowerCase().includes('available');
      });
    }

    // Trier les produits
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = a.price || a.attributeValues?.p_price?.value || 0;
          const priceB = b.price || b.attributeValues?.p_price?.value || 0;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = a.price || a.attributeValues?.p_price?.value || 0;
          const priceB = b.price || b.attributeValues?.p_price?.value || 0;
          return priceB - priceA;
        });
        break;
      case 'name':
        filtered.sort((a, b) => {
          const nameA =
            a.attributeValues?.p_title?.value ||
            a.localizeInfos?.title?.en_US ||
            '';
          const nameB =
            b.attributeValues?.p_title?.value ||
            b.localizeInfos?.title?.en_US ||
            '';
          return nameA.localeCompare(nameB);
        });
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Garder l'ordre original pour la pertinence
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleNewSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    const data = await searchProductsAction({ query: searchTerm });
    if (Array.isArray(data)) {
      setProducts(data as IProductsEntity[]);
      setFilteredProducts(data as IProductsEntity[]);
    }
    setIsLoading(false);
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 30],
      availability: 'all',
      sortBy: 'relevance',
      showFilters: filters.showFilters,
    });
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50/30 via-orange-50/20 to-yellow-50/30 dark:from-red-950/10 dark:via-orange-950/10 dark:to-yellow-950/10'>
      {/* Motif d'arrière-plan */}
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f59e0b" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>

      <div className='relative max-w-7xl mx-auto p-4 sm:p-8'>
        {/* En-tête */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight'>
            <span className='bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
              Recherche de Pizzas 🔍
            </span>
          </h1>
          <p className='text-xl text-gray-600 dark:text-gray-300 mb-6'>
            Trouvez votre part parfaite
          </p>

          {/* Barre de recherche */}
          <div className='max-w-2xl mx-auto mb-6'>
            <div className='flex gap-3'>
              <div className='flex-1 relative'>
                <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                <Input
                  type='text'
                  placeholder='Recherchez des délicieuses pizzas...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleNewSearch()}
                  className='pl-12 h-14 rounded-2xl border-orange-200 dark:border-orange-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-lg'
                />
              </div>
              <Button
                onClick={handleNewSearch}
                className='h-14 px-6 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-bold rounded-2xl'
              >
                <Search className='h-5 w-5' />
              </Button>
            </div>
          </div>

          {/* Bouton de filtre */}
          <div className='flex justify-center gap-4 mb-6'>
            <Button
              variant='outline'
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  showFilters: !prev.showFilters,
                }))
              }
              className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-orange-200 dark:border-orange-700 hover:border-orange-300 dark:hover:border-orange-600 rounded-2xl'
            >
              <SlidersHorizontal className='mr-2 h-4 w-4' />
              Filtres
              <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform ${
                  filters.showFilters ? 'rotate-180' : ''
                }`}
              />
            </Button>
            {(filters.priceRange[0] > 0 ||
              filters.priceRange[1] < 30 ||
              filters.availability !== 'all' ||
              filters.sortBy !== 'relevance') && (
              <Button
                variant='outline'
                onClick={clearFilters}
                className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-orange-200 dark:border-orange-700 hover:border-orange-300 dark:hover:border-orange-600 rounded-2xl'
              >
                <X className='mr-2 h-4 w-4' />
                Effacer les filtres
              </Button>
            )}
          </div>

          {/* Panneau de filtres */}
          {filters.showFilters && (
            <div className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-lg border border-orange-200/50 dark:border-orange-800/50 p-6 mb-8 max-w-4xl mx-auto'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {/* Plage de prix */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
                    <Pizza className='inline mr-2 h-4 w-4' />
                    Plage de prix
                  </label>
                  <div className='space-y-3'>
                    <div className='flex gap-2'>
                      <Input
                        type='number'
                        placeholder='Min'
                        value={filters.priceRange[0]}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: [
                              Number(e.target.value),
                              prev.priceRange[1],
                            ],
                          }))
                        }
                        className='rounded-xl border-orange-200 dark:border-orange-700'
                      />
                      <Input
                        type='number'
                        placeholder='Max'
                        value={filters.priceRange[1]}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: [
                              prev.priceRange[0],
                              Number(e.target.value),
                            ],
                          }))
                        }
                        className='rounded-xl border-orange-200 dark:border-orange-700'
                      />
                    </div>
                    <div className='text-sm text-gray-600 dark:text-gray-400'>
                      ${filters.priceRange[0]} - ${filters.priceRange[1]}
                    </div>
                  </div>
                </div>

                {/* Disponibilité */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
                    <Clock className='inline mr-2 h-4 w-4' />
                    Disponibilité
                  </label>
                  <select
                    value={filters.availability}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        availability: e.target.value,
                      }))
                    }
                    className='w-full rounded-xl border border-orange-200 dark:border-orange-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3'
                  >
                    <option value='all'>Tous les articles</option>
                    <option value='available'>Disponibles seulement</option>
                    <option value='unavailable'>En rupture de stock</option>
                  </select>
                </div>

                {/* Trier par */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3'>
                    <TrendingUp className='inline mr-2 h-4 w-4' />
                    Trier par
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        sortBy: e.target.value,
                      }))
                    }
                    className='w-full rounded-xl border border-orange-200 dark:border-orange-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3'
                  >
                    <option value='relevance'>Pertinence</option>
                    <option value='price-low'>Prix: Croissant</option>
                    <option value='price-high'>Prix: Décroissant</option>
                    <option value='name'>Nom A-Z</option>
                    <option value='newest'>Plus récent d'abord</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Nombre de résultats */}
        {!isLoading && (
          <div className='mb-6 text-center'>
            <p className='text-lg text-gray-600 dark:text-gray-300'>
              Trouvé{' '}
              <span className='font-bold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                {filteredProducts.length}
              </span>{' '}
              délicieux résultats {urlSearchTerm && `pour "${urlSearchTerm}"`}
            </p>
          </div>
        )}

        {/* Grille de produits */}
        <div className='flex flex-col lg:flex-row gap-8'>
          {isLoading ? (
            <div className='flex justify-center items-center h-64 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-lg border border-orange-200/50 dark:border-orange-800/50'>
              <div className='text-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-500 mx-auto mb-4'></div>
                <p className='text-lg font-semibold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                  Recherche de délicieuses pizzas...
                </p>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div
              key='products'
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full`}
            >
              {filteredProducts?.map((product) => {
                const transformedProduct: IProduct = {
                  id: product.id,
                  localizeInfos: {
                    title: product.localizeInfos?.title || {},
                  },
                  price: product.price,
                  attributeValues: {
                    p_description: product.attributeValues?.p_description || {
                      value: [],
                    },
                    p_price: product.attributeValues?.p_price || { value: 0 },
                    p_image: product.attributeValues?.p_image || {
                      value: { downloadLink: '' },
                    },
                    p_title: product.attributeValues?.p_title || { value: '' },
                    p_available: (() => {
                      const availableAttr =
                        product.attributeValues?.p_available.value[0]?.title;

                      // Gérer la structure simple {value}
                      return availableAttr || 'Available';
                    })(),
                  },
                };
                return (
                  <ProductCard product={transformedProduct} key={product.id} />
                );
              })}
            </div>
          ) : (
            <div className='text-center py-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-lg border border-orange-200/50 dark:border-orange-800/50 p-8 w-full'>
              <div className='mb-6'>
                <Search className='mx-auto h-20 w-20 text-orange-400 mb-4' />
                <div className='text-6xl mb-4'>🍕</div>
              </div>
              <h2 className='text-3xl font-black mb-4'>
                <span className='bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'>
                  Aucune pizza trouvée !
                </span>
              </h2>
              <p className='text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto'>
                Nous n'avons trouvé aucune pizza correspondant à votre recherche. Essayez
                d'ajuster vos filtres ou votre terme de recherche.
              </p>
              <Button
                onClick={clearFilters}
                className='bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105'
              >
                Effacer tous les filtres 🍕
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Component() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <SearchComponent />
    </Suspense>
  );
}