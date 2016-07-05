import React, {
  Component,
  AsyncStorage,
} from 'react-native'

import RNFetchBlob from 'react-native-fetch-blob'


const STORAGE_KEY = 'cacheList'
const SESSION_NAME = 'cachedFiles'

const loadInitialCacheList = async () => {
  try {
    const cacheList = await AsyncStorage.getItem(STORAGE_KEY)
    if (cacheList !== null){
      const list = JSON.parse(cacheList)
      return list
    } else {
      console.log('Cannot find cacheList!')
      return []
    }
  } catch (error) {
    console.log(error)
    return []
  }
}

const saveCacheList = async (cacheList) => {
  try {
    const serilizedCacheList = JSON.stringify(cacheList)
    await AsyncStorage.setItem(STORAGE_KEY, serilizedCacheList)
    console.log('cacheList is successfully saved');
  } catch (error) {
    console.log(erroe)
  }
}

const removeAllCaches = async () => {

  removeFiles()

  try {
    await AsyncStorage.removeItem(STORAGE_KEY)
    console.log('cacheList is successfully removed');
  } catch (error) {
    console.log(error)
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
  RNFetchBlob.fs.unlink(filePath)
  .then(() => {
    console.log('successfully deleted a file ')
  })
  .catch((err) => {
    console.log('deleting file error: ')
    console.log(err)
  })
}

export {
  loadInitialCacheList,
  saveCacheList,
  removeAllCaches,
  removeOneCache
}
