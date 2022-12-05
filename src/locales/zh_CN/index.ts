import { addLang } from '@/utils/lang';
const langs = require.context("./lang", true, /.ts$/);

const zhCN: Record<string, string > = {
  locale: 'zh-CN',
  lang: '中文（CN）',
  success: '操作成功',
  invalidFormat: '格式错误',
  confirmRight: '确定',
  ok: '好的',
  signIn: '登录',
  confirmCancel: '取消',
  pleaseEnter: '请输入',
  optionItem: '选择',
  maxLength: '最长为{max}个字符',
  minLength: '最小为{min}个字符',
  min: '最小值{value}',
  max: '最大值{value}',
  minOnlyOne: '至少保留一个',
  isRequire: '该项为必填',
  length50: '长度:1 ~ 50个字符',
  noSpecial: '不允许输入特殊字符',
  deleteModalTitle: '删除',
  deleteBtn: '删除',
  createBtn: '新建',
  createBtnProject: '新建项目',
  editBtn: '编辑',
  addBtn: '添加',
  uploadBtn: '上传',
  downloadBtn: '下载',
  viewAll: '查看全部',
  loadingResources: '资源加载中',
  createdTime: '创建时间',
  description: '描述',
  console: '控制台',
  noResources: '暂无数据展示',
  noResourcesTitle: '没有数据',
  optional: '可选',
  viewAllSolution: '查看所有方案',
  noData: '暂无数据',
  all: '全部',
  comingSoon: '敬请期待',
  sortBtn: '排序',
  calculatePercentage: '计算百分比',
  Configuration: '配置',
  updateConfirm: '更新确认',
  copyRight: 'Copyright © 2008-2022 Thunder Software Technology Co., Ltd 保留所有版权 ',
};

langs.keys().forEach(key => {
  addLang(zhCN, langs(key).default);
})

export default zhCN;
