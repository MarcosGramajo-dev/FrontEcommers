
export type ConfBasic = {
    type:string,
    direccion: string,
    eslogan: string,
    logo: FileList,
    tel: number,
    titulo: string,
    nameLogo: string,
    fileName: string,
    urlImg: string,
}

export type ConfColors = {
    type:string,
    colorP: string,
    colorS: string
}

export type ConfLinks = {
    type:string,
    facebook: string,
    instagram: string,
    linkGoogle: string,
    twiter: string,
}

export type AddNewProduct = {
    modelo: string,
    age: number,
    km: number,
    combustible: string,
    motor: string,
    idProduct: string,
    esUnSlide: boolean,
    photos:FileList,
    arrayPhotos: [public_id: string, secure_url:string]
}

export type EditProduct = {
    modelo: string,
    age: number,
    km: number,
    combustible: string,
    motor: string,
    idProduct: string,
    esUnSlide: boolean,
    arrayPhotos:[public_id: string, secure_url:string],
    photos:FileList
}

export type UserInfo = {
    _id: string,
    user: string,
    pass: string,
    token: string,
    role: string
}

export type CreateUser = {
    user: string,
    pass: string,
    role: string
}

export type LoginUser = {
    user: string,
    pass: string
}