/* config-overrides.js */

const override = require('customize-cra').override;
const useEslintRc = require('customize-cra').useEslintRc;
const addDecoratorsLegacy = require('customize-cra').addDecoratorsLegacy;

// export default override(addDecoratorsLegacy(), disableEsLint());
module.exports = override(
    useEslintRc(),
    addDecoratorsLegacy()
);
