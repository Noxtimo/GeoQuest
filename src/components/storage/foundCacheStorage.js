import AsyncStorage from '@react-native-async-storage/async-storage';

const FOUND_CACHE_IDS_KEY = 'geoquest_found_cache_ids';

const normaliseCacheIds = (ids) => {
  return ids
    .map((id) => Number(id))
    .filter((id) => Number.isFinite(id));
};

export const getFoundCacheIds = async () => {
  try {
    const storedValue = await AsyncStorage.getItem(FOUND_CACHE_IDS_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return normaliseCacheIds(parsedValue);
  } catch (error) {
    return [];
  }
};

export const saveFoundCacheId = async (cacheId) => {
  const numericCacheId = Number(cacheId);

  if (!Number.isFinite(numericCacheId)) {
    return getFoundCacheIds();
  }

  const existingIds = await getFoundCacheIds();

  if (existingIds.includes(numericCacheId)) {
    return existingIds;
  }

  const updatedIds = [...existingIds, numericCacheId];
  await AsyncStorage.setItem(FOUND_CACHE_IDS_KEY, JSON.stringify(updatedIds));

  return updatedIds;
};
