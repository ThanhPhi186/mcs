export default {
  API: {
    GetDomain: 'https://api.olbius.com/token',
    // baseURL: 'https://testchth.olbius.com/mobilemcs/control',
    baseImgURL: 'https://testchth.olbius.com',
    Login: '/loginMobilemcs',
    Logout: '/logoutMobilemcs',
    GetListProductStoreMobileMcs: '/getListProductStoreMobileMcs',
    GetAllProductStores: '/mGetAllProductStores',
    GetListPOMobilemcs: '/getListPOMobilemcs',
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
