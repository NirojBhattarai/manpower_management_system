export const APP_ROOT = "/app";

const AUTH_PATH = {
  login: "/login",
  forgotPassword: "/forgot-password",
  changePassword: "/change-password",
  resetPassword: "/reset-password",
  verifyOtp: "/verify-otp",
};

const DASHBOARD_PATH = {
  dashboard: `${APP_ROOT}/dashboard`,
  language: `${APP_ROOT}/language`,
  addLanguage: `${APP_ROOT}/add-language`,
  updateLanguage: `${APP_ROOT}/update-language`,
};

export const PATH = {
  auth: AUTH_PATH,

  dashboard: DASHBOARD_PATH,

  preApprovalDofe: {
    index: `${APP_ROOT}/pre-approval-dofe`,
    create: `${APP_ROOT}/pre-approval-dofe/create`,
    update: `${APP_ROOT}/pre-approval-dofe/update/:id`,
  },

  company: {
    index: `${APP_ROOT}/company`,
    create: `${APP_ROOT}/company/create`,
    update: `${APP_ROOT}/company/update/:id`,
  },

  country: {
    index: `${APP_ROOT}/country`,
  },

  candidate: {
    index: `${APP_ROOT}/candidate`,
    create: `${APP_ROOT}/candidate/create`,
    update: `${APP_ROOT}/candidate/update/:id`,
  },

  interview: {
    index: `${APP_ROOT}/interview`,
  },

  jobOffer: {
    index: `${APP_ROOT}/job-offer`,
  },

  medical: {
    index: `${APP_ROOT}/medical`,
  },

  visa: {
    index: `${APP_ROOT}/visa`,
  },

  orientation: {
    index: `${APP_ROOT}/orientation`,
  },

  mySubscription: {
    index: `${APP_ROOT}/my-subscription`,
  },

  myMembership: {
    index: `${APP_ROOT}/my-membership`,
  },

  account: {
    index: `${APP_ROOT}/account`,
  },

  insurance: {
    index: `${APP_ROOT}/insurance`,
  },

  shram: {
    index: `${APP_ROOT}/shram`,
  },

  ticket: {
    index: `${APP_ROOT}/ticket`,
  },

  jobVacancy: {
    index: `${APP_ROOT}/job-vacancy`,
    create: `${APP_ROOT}/job-vacancy/create`,
    update: `${APP_ROOT}/job-vacancy/update/:id`,
  },

  invoice: {
    index: `${APP_ROOT}/invoice`,
    create: `${APP_ROOT}/invoice/create`,
    update: `${APP_ROOT}/invoice/update/:id`,
  },

  chartOfAccount: {
    account: {
      index: `${APP_ROOT}/chart-of-account/account`,
    },
    group: {
      index: `${APP_ROOT}/chart-of-account/group`,
    },
  },

  quickPayment: {
    index: `${APP_ROOT}/quick-payment`,
    create: `${APP_ROOT}/quick-payment/create`,
    update: `${APP_ROOT}/quick-payment/update/:id`,
  },

  accounting: {
    purchase: {
      expense: {
        index: `${APP_ROOT}/accounting/purchase/expense`,
        create: `${APP_ROOT}/accounting/purchase/expense/create`,
        update: `${APP_ROOT}/accounting/purchase/expense/update/:id`,
      },
      supplier: {
        index: `${APP_ROOT}/accounting/purchase/supplier`,
      },
    },
    sales: {},
    quickPayment: {},
    chartOfAccount: {},
    chequeRegister: {
      index: `${APP_ROOT}/cheque-register`,
      chequeReceived: {
        index: `${APP_ROOT}/cheque-register/received`,
      },
      chequeIssued: {
        index: `${APP_ROOT}/cheque-register/issued`,
      },
    },
  },

  setting: {
    index: `${APP_ROOT}/setting`,
    jobSetting: {
      industry: `${APP_ROOT}/setting/job-setting/industry`,
      category: `${APP_ROOT}/setting/job-setting/category`,
      subCategory: `${APP_ROOT}/setting/job-setting/sub-category`,
      jobTitle: `${APP_ROOT}/setting/job-setting/job-title`,
    },
    bankSetting: `${APP_ROOT}/setting/bank-setting`,
    documentSetting: `${APP_ROOT}/setting/document-setting`,
    medicalInstitute: `${APP_ROOT}/setting/medical-institute`,
    orientationInstitute: `${APP_ROOT}/setting/orientation-institute`,
    insuranceCompany: `${APP_ROOT}/setting/insurance-company`,
  },

  user: {
    index: `${APP_ROOT}/user`,
  },

  roleAndPermission: {
    role: `${APP_ROOT}/role-and-permission/role`,
    permission: `${APP_ROOT}/role-and-permission/permission`,
  },
};
