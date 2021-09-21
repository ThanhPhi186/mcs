export default {
  API: {
    GetDomain: 'https://api.olbius.com/token',
    // baseURL: 'https://demold.olbius.com/mobileservices/control',
    baseURL: 'https://testldmarket.olbius.com/mobileservices/control',
    baseImgURL: 'https://demold.olbius.com',
    urlGetDomain: 'https://api.olbius.com/token',
    Login: '/mLogin',
    Logout: '/logoutMobilemcs',
    GetListProductStoreMobileMcs: '/getListProductStoreMobileMcs',
    GetAllProductStores: '/mGetAllProductStores',
  },
  RESPONSE_CODES: {
    SUCCESS: {
      SUCCESS: 200,
    },
    ERROR: {
      INTERNAL_SERVER: 500,
      NOT_FOUND: 404,
    },
  },
  GOOGLE_MAP_API: 'AIzaSyCHu4vQUKFsMnqpjk_HHjIIAU_yejvT5cs',
};
