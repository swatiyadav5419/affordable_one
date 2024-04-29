import { all } from "redux-saga/effects"

import maincategorySagas from "./MaincategorySagas"
import subcategorySagas from "./SubcategorySagas"
import brandSagas from "./BrandSagas"
import productSagas from "./ProductSagas"

export default function* RootSaga() {
    yield all([
        maincategorySagas(),
        subcategorySagas(),
        brandSagas(),
        productSagas(),
    ])
}