export default {
  API: {
    GetDomain: 'https://api.olbius.com/token',
    // baseURL: 'https://testchth.olbius.com/mobilemcs/control',
    baseImgURL: 'https://testchth.olbius.com',
    Login: '/loginMobilemcs',
    Logout: '/logoutMobilemcs',
    // Login: '/mLogin',
    // Logout: '/mLogout',
    GetListProductStoreMobileMcs: '/getListProductStoreMobileMcs',
    GetAllProductStores: '/mGetAllProductStores',
    GetListPOMobilemcs: '/getListPOMobilemcs',
    GetListSupplierMobilemcs: '/getListSupplierMobilemcs',
    FindProductInfoMobilemcs: '/findProductInfoMobilemcs',
    FindProducts: '/mFindProducts',
    GetProductInfoMobilemcs: '/getProductInfoMobilemcs',
    GetListPriceChangeMobilemcs: '/getListPriceChangeMobilemcs',
    GetListQuotationsMobilemcs: '/getListQuotationsMobilemcs',
    GetQuotationInfoMobilemcs: '/getQuotationInfoMobilemcs',
    GetListSalesTrackMobilemcs: '/getListSalesTrackMobilemcs',
    GetListLoginPosHistoryMobilemcs: '/getListLoginPosHistoryMobilemcs',
    FindSupplierInfoMobilemcs: '/findSupplierInfoMobilemcs',
    GetListProductsMobilemcs: '/getListProductsMobilemcs',
    FindProductMobilemcs: '/findProductMobilemcs',
    GetProductBySupplierMobilemcs: '/getProductBySupplierMobilemcs',
    CalculatePOMobilemcs: '/calculatePOMobilemcs',
    CreateOrderPurchaseMobilemcs: '/createOrderPurchaseMobilemcs',
    GetDetailPOMobilemcs: '/getDetailPOMobilemcs',
    GetOrderItemEditableMobilemcs: '/getOrderItemEditableMobilemcs',
    UpdatePOMobilemcs: '/updatePOMobilemcs',
    GetStockingEventsMobilemcs: '/getStockingEventsMobilemcs',
    GetDetailStockingEventsMobilemcs: '/getDetailStockingEventsMobilemcs',
    GetStockingEventItemsMobilemcs: '/getStockingEventItemsMobilemcs',
    GetLocationsMobilemcs: '/getLocationsMobilemcs',
    ApprovePOMobilemcs: '/approvePOMobilemcs',
    CancelPOMobilemcs: '/cancelPOMobilemcs',
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

  ORDER_STATUS: {
    APPROVED: 'ORDER_APPROVED',
    CANCELLED: 'ORDER_CANCELLED',
    COMPLETED: 'ORDER_COMPLETED',
    CREATED: 'ORDER_CREATED',
    HOLD: 'ORDER_HOLD',
    IN_TRANSIT: 'ORDER_IN_TRANSIT',
    PROCESSING: 'ORDER_PROCESSING',
    REJECTED: 'ORDER_REJECTED',
    SADAPPROVED: 'ORDER_SADAPPROVED',
    DELIVERED: 'ORDER_DELIVERED',
  },
};
