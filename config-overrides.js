// module.exports = (config)=>{

//     //如果没有是用 customize - cra 就在治理可以对config 进行配置
//     return config
// }

/*
 * @file config-overrides.js
 * @author Leo Zhou(zhouyong@1000phone.com)
 * 基于customzie和react-app-rewired的定制化配置文件
 *
*/

// 从customize-cra引入一些相关的方法
const {
    override,
    addLessLoader,
    fixBabelImports,
    addDecoratorsLegacy
  } = require('customize-cra')

  const modifyVars = require('./theme.js')

  module.exports = override(
    addLessLoader({
      javascriptEnabled: true,
      modifyVars
    }),
    addDecoratorsLegacy(),
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
  )
