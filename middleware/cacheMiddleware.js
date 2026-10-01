// In-memory cache store
let cache = {};
const TTL = 60 * 1000; // Time To Live: 1 minute (60 seconds)

// Middleware for GET request caching
function cacheMiddleware(req, res, next) {
  const key = req.originalUrl;
  const cachedItem = cache[key];

  // If item exists in cache, check if it's expired
  if (cachedItem) {
    const isExpired = Date.now() - cachedItem.createdAt > TTL;

    if (!isExpired) {
      res.setHeader('X-Cache', 'HIT');
      return res.json(cachedItem.data);
    } else {
      // Delete expired entry
      delete cache[key];
    }
  }

  // Cache MISS or Expired: Set header and save response when sent
  res.setHeader('X-Cache', 'MISS');

  const originalJson = res.json.bind(res);
  res.json = (data) => {
    cache[key] = {
      data: data,
      createdAt: Date.now(), // Store creation timestamp
    };
    return originalJson(data);
  };

  next();
}

// Invalidate cache (works both as standalone function or middleware)
function invalidateCache(req, res, next) {
  cache = {}; // Clear all cache entries
  if (typeof next === 'function') {
    next();
  }
}

module.exports = {
  cacheMiddleware,
  invalidateCache,
};
