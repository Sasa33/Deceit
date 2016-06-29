import React, {
  Component,
  AsyncStorage,
} from 'react-native'

import RNFetchBlob from 'react-native-fetch-blob'


const STORAGE_KEY = 'cacheList'
const SESSION_NAME = 'cachedFiles'

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

const removeAllCaches = async (removeCacheList) => {
  console.log('clear cacheList from store...');
  removeCacheList()

  console.log('deleting cached files...');
  removeFiles()

  try {
    console.log('remove cacheList...');
    await AsyncStorage.removeItem(STORAGE_KEY)
    console.log('cacheList is successfully removed');
  } catch (error) {
    console.log(erroe)
  }
}

const removeFiles = () => {
  RNFetchBlob.session(SESSION_NAME).dispose()
}

const removeOneCache = async (removeCache, episode) => {
  console.log('clear one cache from store...');
  removeCache(episode)

  console.log('remove the path from session...')
  let dirs = RNFetchBlob.fs.dirs
  let filePath = dirs.CacheDir + '/' + episode.uuid + '.mp3'
  RNFetchBlob.session(SESSION_NAME).remove(filePath)

  removeOneFile(filePath)


}

const removeOneFile = (filePath) => {
  RNFetchBlob.fs.unlink(filePath).then(() => {
    // ...
  })
}

export {
  loadInitialCacheList,
  saveCacheList,
  removeAllCaches,
  removeOneCache
}
