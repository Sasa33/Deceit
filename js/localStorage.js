import React, {
  Component,
  AsyncStorage,
} from 'react-native'

const STORAGE_KEY = 'cacheList'

const loadInitialCacheList = async (loadCacheList) => {
  console.log(loadCacheList)
  try {
    const cacheList = await AsyncStorage.getItem(STORAGE_KEY)
    if (cacheList !== null){
      console.log('loadCacheList')
      console.log(cacheList)
      const list = JSON.parse(cacheList)
      console.log(list)
      loadCacheList(list)
    } else {
      console.log('Cannot find cacheList!')
    }
  } catch (error) {
    console.log(error)
  }
}

const saveCacheList = async (cacheList) => {
  console.log(cacheList);
  try {
    const serilizedCacheList = JSON.stringify(cacheList)
    console.log(serilizedCacheList)
    await AsyncStorage.setItem(STORAGE_KEY, serilizedCacheList)
    console.log('cacheList is successfully saved');
  } catch (error) {
    console.log(erroe)
  }
}

const removeCacheList = async () => {
  console.log('remove cacheList...');
  try {
    await AsyncStorage.removeItem(STORAGE_KEY)
    console.log('cacheList is successfully removed');
  } catch (error) {
    console.log(erroe)
  }
}

export {
  loadInitialCacheList,
  saveCacheList,
  removeCacheList
}
