import { reactive, watch } from '@nuxtjs/composition-api'

const fetcher = (url) => fetch(url).then(response => response.json())

/**
 * Cache store
 *
 * Each key of cache has these params.
 *
 * data {any} : Data from remote
 * loading {bool} : is data fetching from remote set true. Set false after fetching
 * ttl {number}: Time to Leave
 */
const store = reactive({})

const defaultPrefetchOption = {
  ttl: 1000 * 10,
  resetCache: false,
}

/**
 * @typedef PrefetchStoreOption
 * @param {Object} options
 * @param {String} options.ttl - Time to live
 */

 /**
  * @typedef PrefetchResult
  * @param {any} data
  * @param {Boolean} loading
  * @param {Error} error
  */

/**
 *
 * @param {*} key
 * @param {*} url
 * @param {PrefetchStoreOption} options
 * @returns {PrefetchResult}
 */
async function usePrefetchStore(key, url, options = {}) {
  const prefetchOptions = Object.assign({}, defaultPrefetchOption, options)


  if (prefetchOptions.resetCache) {
    console.log(`[🚮][${key}][PREFETCH_STORE] INVALIDATE CACHE`, prefetchOptions)
    clearCache(key)
  }

  // Check cache store
  if (store[key] && store[key].data) {
    console.log(`[📤][${key}][PREFETCH_STORE] HIT CACHE`)
    const cache = store[key]
    return { data: cache.data, error: null }
  }

  try {
    console.log(`[🚀][${key}][PREFETCH_STORE] START FETCH FROM REMOTE`)
    const data = await fetcher(url)
    store[key] = { data, loading: false, error: null }
    console.log(`[🚀][${key}][PREFETCH_STORE] DONE FETCH FROM REMOTE`)
    setTimeout(() => {
      console.log(`[🗑][${key}][PREFETCH_STORE] CLEAR by TTL`)
      clearCache(key)
    }, prefetchOptions.ttl);
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

// Private Methods
// If key is Nullish, clear all.
function clearCache(key) {
  if (store.hasOwnProperty(key)) {
    delete store[key]
  }

  if (!key) {
    store = {}
  }
}

export default usePrefetchStore