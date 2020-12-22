import req from '../interceptors/request'

export const getProduct = (params) => {
    return req("get", "/api/products/query", params)
}

export const insertProduct = (insertData) => {
    return req("post", "/api/products/insert", insertData)
}

export const updateProduct = (updateData) => {
    return req("put", "/api/products/update", updateData)
}

export const deleteProduct = (deleteData) => {
    return req("delete", "/api/products/delete", deleteData)
}