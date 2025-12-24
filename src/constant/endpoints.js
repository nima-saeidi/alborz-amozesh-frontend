export const endpoints = {
  conversations: {
    messages: (username) => `/conversations/${username}/messages/`,
    bookmark: (username) => `/conversations/${username}/bookmark/`,

    searchUsers: (query) => `/conversations/users/?search=${query}`,

    searchContracts: (query) => `/conversations/contracts/?search=${query}`,
    websocket: (token) =>
      `wss://backend.cadsynergy.com/ws/conversations/?token=${token}`,
    singleConversation: (token, user_id) =>
      `wss://backend.cadsynergy.com/ws/conversations/${user_id}/?token=${token}`,
  },
  product: {
    productList: () => `/public/product/list/`,
    categoryList: () => `/public/category/list/`,
    detail: (slug) => `/public/product/${slug}/`,
    related: (slug) => `/public/product/${slug}/related/`,
    order: (slug) => `/public/product/${slug}/order/`,
    purchasedList: (limit, offset) =>
      `/product/list/purchased/?limit=${limit}&offset=${offset}`,
    purchase: (slug) => `/public/product/${slug}/purchase/`,
    purchaseVerify: () => `/public/product/purchase/verify/`,
  },
};
