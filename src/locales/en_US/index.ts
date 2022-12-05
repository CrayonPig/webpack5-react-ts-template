import { addLang } from '@/utils/lang';

const langs = require.context("./lang", true, /.ts$/);

const enUS: Record<string, string> = {
  locale: 'en-US',
  lang: 'English（EN）',
  success: 'Success',
  invalidFormat: 'Invalid format',
  confirmRight: 'Confirm',
  confirmCancel: 'Cancel',
  signIn: 'Sign in',
  ok: 'Ok',
  pleaseEnter: 'Enter',
  optionItem: 'Option item',
  noOptions: 'No options',
  maxLength: 'The value contains a maximum of {max} characters',
  minLength: 'The value contains a maximum of {min} characters',
  minOnlyOne: 'Keep at least one',
  isRequire: 'This item is required',
  length50: 'length：1~50 characters',
  noSpecial: 'Special characters are not allowed',
  deleteModalTitle: 'Delete',
  deleteBtn: 'Delete',
  sortBtn: 'Sort',
  createBtn: 'Create',
  createBtnProject: 'Create a new project',
  uploadBtn: 'Upload',
  downloadBtn: 'Download',
  editBtn: 'Edit',
  viewAll: 'View all',
  addBtn: 'Add',
  loadingResources: 'Loading resources',
  createdTime: 'Creation Time',
  description: 'Description',
  console: 'Console',
  noResourcesTitle: 'No resources',
  noResources: 'No resources to display',
  optional: 'Optional',
  viewAllSolution: 'View all solutions',
  noData: 'Not found data',
  all: 'All',
  comingSoon: 'Coming soon',
  calculatePercentage: 'Calculate percentage',
  Configuration: 'Configuration',
  updateConfirm: 'Update confirm',
  copyRight: 'Copyright © 2008-2022 Thunder Software Technology Co., Ltd. All rights reserved.'
};

langs.keys().forEach(key => {
  addLang(enUS, langs(key).default);
})

export default enUS;
